const crypto = require('crypto');
const { getPrivateKey } = require('../libs/rsaKeys');

exports.decryptData = (encryptedData) => {
    const privateKey = getPrivateKey();
    return crypto.privateDecrypt(
        {
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256'
        }, Buffer.from(encryptedData, 'base64')).toString('utf8');
};
