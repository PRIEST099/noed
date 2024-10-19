const crypto = require('crypto');
const Client = require('../models/client');
const { generateApiToken } = require('../libs/apiToken');

exports.initialize = async (_, res) => {
    try {
        
        const appId = crypto.randomBytes(16).toString('hex');

        
        const initialApiToken = generateApiToken();

        
        const client = new Client({
            appId,
            hashedApiToken: initialApiToken,
            confirmed: false,
            createdAt: new Date(),
        });
        await client.save();

        
        return res.json({
            message: 'Application initialized. Use appId and token to confirm.'
        });
    } catch (error) {
        return res.status(500).json({ error: 'Error during initialization' });
    }
};
