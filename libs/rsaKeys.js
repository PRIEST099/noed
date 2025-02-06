const crypto = require('crypto');
const fs = require('fs');
const path = require('path')
const ensurePemFormat = require('../utils/keyFormater');

const serverPrivateKey = fs.readFileSync(path.join(__dirname, 'devUtils', 'private_key.pem'), 'utf8');
const serverPublicKey = fs.readFileSync(path.join(__dirname, 'devUtils', 'public_key.pem'), 'utf8');


exports.getPublicKey = () => {
    formattedKey = ensurePemFormat(serverPublicKey, 'PUBLIC KEY');
    return formattedKey;
};

exports.getPrivateKey = () => {
    formattedKey = ensurePemFormat(serverPrivateKey, 'PRIVATE KEY');
    console.log(`\n\n formatted PRVATE KEY: \n${formattedKey}`)
    return formattedKey;
}


exports.encryptWithPublicKey = (clientKey, data) => {
    clientPublicKey = ensurePemFormat(clientKey);
    console.log(`\nFormatted Client Public Key:\n${clientPublicKey}`); // Debugging

    const keyBuffer = Buffer.from(clientPublicKey, 'utf8');  // Change encoding
    return crypto.publicEncrypt(
        {
            key: keyBuffer,
            padding: crypto.constants.RSA_PKCS1_PADDING,
        },
        Buffer.from(data)
    ).toString('base64');
};



exports.decryptWithPrivateKey = (encryptedData) => {
    return crypto.privateDecrypt(serverPrivateKey, Buffer.from(encryptedData, 'base64')).toString('utf8');
};
