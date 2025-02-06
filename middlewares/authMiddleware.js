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

        // Check if client exists and token matches
        if (!client || !client.hashedApiToken || !(apitoken === client.hashedApiToken)) {
            return res.status(401).json({
                error: 'Invalid API token',
                apitoken: apitoken, // You might consider not exposing the token here,
                tok: client.hashedApiToken
            });
        }

        // If valid, set clientId and pass to the next middleware
        req.clientId = client._id;
        next();
    } catch (error) {
        console.log(error.toString());
        return res.status(500).json({ error: 'Server error' });
    }
};

