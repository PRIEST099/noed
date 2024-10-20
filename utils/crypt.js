const crypto = require('crypto');

const { getPrivateKey } = require('../libs/rsaKeys');
const Client = require('../models/client');

exports.decryptData = (encryptedData) => {
    const privateKey = getPrivateKey();
    return crypto.privateDecrypt(
        {
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256'
        }, Buffer.from(encryptedData, 'base64')).toString('utf8');
};

exports.encryptData = async (decryptedData, clientId) => {
    const client = await Client.findById(clientId);
    if (!client) {
        return res.status(401).json({ error: "applicaton not found" });
    }

    const clientKey = client.clientPublicKey;
    return crypto.publicEncrypt(
        {
            key: clientKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256'
        }, Buffer.from(decryptedData)
    ).toString('base64');
}
