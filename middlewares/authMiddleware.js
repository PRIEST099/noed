const bcrypt = require('bcryptjs');

const { decryptWithPrivateKey } = require('../libs/rsaKeys')
const Client = require('../models/client');

exports.authenticateToken = async (req, res, next) => {
    const { apitoken } = req.headers;

    if (!apitoken) {
        console.log(req.headers);
        return res.status(401).json({ error: 'API token required' });
    }

    try {

        
        const client = await Client.findOne({ appId: req.body.appId });

        if (!client || !(apitoken === client.hashedApiToken)) {
            return res.status(401).json({ error: 'Invalid API token' });
        }

        req.clientId = client._id;
        next();
    } catch (error) {
        console.log(error.toString());
        return res.status(500).json({ error: 'Server error' });
    }
};
