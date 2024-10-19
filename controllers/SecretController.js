const Secret = require('../models/secret');
const { decryptData } = require('../utils/crypt');

exports.keepSecret = async (req, res) => {
    const { secretName, encryptedData } = req.body;
    const clientId = req.clientId;

    

    try {
        console.log(encryptedData);
        const decryptedData = decryptData(encryptedData);

        const data = await Secret.findOne({secretName});

        if (data) {
            return res.status(401).json({error: "Secret already exixts"});
        }

        const secret = new Secret({
            clientId,
            secretName,
            secretData: decryptedData
        });
        await secret.save();

        res.json({ message: 'Secret stored successfully' });
    } catch (error) {
        console.error("Error occurred:", {
            message: error.message,        // Error message
            stack: error.stack,            // Stack trace
            name: error.name,              // Error name
            code: error.code || null,      // Error code, if available
            original: error.original || null // Original error, if exists (useful for database errors)
        });
        res.status(500).json({ error: 'Server error: storing secret' });
    }
};

exports.getSecret = async (req, res) => {
    const clientId = req.clientId;
    const secretName = req.body.secretName
    try {
        const secret = await Secret.findOne({clientId, secretName});

        if (!secret) {
            return res.status(401).json({ error: `Secret(${req.body.secretName}) for ${clientId} not found`});
        }
        return res.status(200).json({ secretName, secret: secret.secretData });
    } catch (error) {
        console.log(error.toString());
        res.status(200).json({error: "Server error"});
    }
}

exports.deleteSecret = async (req, res) => {
    const clientId = req.clientId;
    const { secretName, appId } = req.body;

    
    if (!clientId || !secretName || !appId) {
        return res.status(400).json({ error: "Required parameters: clientId, secretName, appId" });
    }

    try {
        
        const result = await Secret.deleteOne({ clientId, secretName });

        
        if (result.deletedCount === 0) {
            console.log(result);
            return res.status(404).json({ error: `No secret with name "${secretName}" found for clientId ${clientId} and appId ${appId}` });
        }

        
        return res.status(200).json({ message: "Secret deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error occurred while deleting secret" });
    }
};

