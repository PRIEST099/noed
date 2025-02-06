const Secret = require('../models/secret');
const { decryptData, encryptData } = require('../utils/crypt');

const MAX_VERSIONS = 10;

exports.keepSecret = async (req, res) => {
    const { secretName, encryptedData } = req.body;
    const clientId = req.clientId;

    

    try {
        

        const data = await Secret.findOne({secretName});

        if (data) {
            return res.status(401).json({error: "Secret already exixts"});
        }

        const decryptedData = decryptData(encryptedData);
        console.log('secret decrypted');
        const secureData = await encryptData(decryptedData, clientId);
        console.log('secret encrypted');

        const newSecret = new Secret({
            clientId,
            secretName,
            versions: [
                { version: 1, secretData: secureData }
            ]
        });
        await newSecret.save();

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
    const { secretName } = req.body
    try {
        const secret = await Secret.findOne({clientId, secretName});

        if (!secret | secret.versions.length === 0) {
            return res.status(401).json({ error: `Secret(${req.body.secretName}) for ${clientId} not found`});
        }
        const latestSecret = secret.versions[secret.versions.length - 1];
        return res.status(200).json({ secretName, secret: latestSecret });
    } catch (error) {
        console.log(error.toString());
        res.status(200).json({error: "Server error"});
    }
}

exports.getSecretVersion = async (req, res) => {
    const clientId = req.clientId;
    const { secretName, version } = req.body;

    if (!secretName || !version) {
        res.status(404).json({ error: "No secret found for this version" });
    }

    try {
        const secret = await Secret.findOne({ clientId, secretName });

        if (!secret) {
            return res.status(404).json({ error: "Secret Not found" });
        }
        const specificVersion = secret.versions.find(f => v.version === parseInt(version));
        if (!specificVersion) {
            return res.status(404).json({ error: "Version not found" });
        }
        res.status(200).json({ secret: specificVersion });
    } catch (error) {
        res.status(500).json({ error: "Error fetching secret version" });
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


exports.updateSecret = async (req, res) => {
    const clientId = req.clientId;
    const { secretName, updatedSecret } = req.body;

    try {
        const secret = await Secret.findOne({ clientId, secretName });
        
        if (!secret) {
            return res.status(404).json({ error: "Secret Not found" });
        }

        const newVersion = secret.versions.length + 1;

        secret.versions.push({
            versions: newVersion,
            secretData: updatedSecret
        });

        if (secret.versions.length > MAX_VERSIONS) {
            secret.versions.shift();
        }

        await secret.save();
        return res.status(200).json({ message: `Secret updated to version ${newVersion}` });
    }catch (error) {
        res.status(500).json({ error: "error updating secret" });
    }
}

