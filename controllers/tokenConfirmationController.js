const bcrypt = require('bcryptjs');
const Client = require('../models/client');
const { generateApiToken } = require('../libs/apiToken');
const { encryptWithPublicKey } = require('../libs/rsaKeys');

exports.confirmToken = async (req, res) => {
    const { appId, apiToken, clientPublicKey } = req.body;

    if (!appId || !apiToken || !clientPublicKey) {
        console.log(`${appId}\n${apiToken}\n${clientPublicKey}`);
        return res.status(400).json({ error: 'Application ID, API token, and public key are required.' });
    }

    try {
        
        const client = await Client.findOne({ appId, confirmed: false });

        if (!client) {
            return res.status(404).json({ error: 'Application not found or already confirmed.' });
        }

        
        const isTokenValid = (apiToken === client.hashedApiToken);

        if (!isTokenValid) {
            return res.status(401).json({ error: 'Invalid API token or application ID.' });
        }

        
        const newApiToken = generateApiToken();
        const hashedNewApiToken = await bcrypt.hash(newApiToken, 10);

        
        const encryptedToken = encryptWithPublicKey(clientPublicKey, newApiToken);

        
        client.hashedApiToken = hashedNewApiToken;
        client.confirmed = true;
        client.clientPublicKey = clientPublicKey;
        client.lastUpdated = new Date();
        await client.save();

        
        return res.json({
            message: 'Token confirmed and rotated successfully.',
            encryptedToken,
        });
    } catch (error) {
        console.log(error.toString());
        return res.status(500).json({ "error": 'Server error during token confirmation.' });
    }
};
