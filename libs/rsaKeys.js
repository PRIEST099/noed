const crypto = require('crypto');
const fs = require('fs');
const path = require('path')

const keyFormatter = require('../utils/keyFormater');


const serverPrivateKey = fs.readFileSync(path.join(__dirname, 'devUtils', 'private_key.pem'), 'utf8');
const serverPublicKey = fs.readFileSync(path.join(__dirname, 'devUtils', 'public_key.pem'), 'utf8');


exports.getPublicKey = () => {
    formattedKey = keyFormatter(serverPublicKey, 'PUBLIC KEY');
    return formattedKey;
};

exports.getPrivateKey = () => {
    formattedKey = keyFormatter(serverPrivateKey, 'PRIVATE KEY');
    console.log(`\n\n formatted PRVATE KEY: \n${formattedKey}`)
    return formattedKey;
}


exports.encryptWithPublicKey = (clientKey, data) => {
    clientPublicKey = keyFormatter(clientKey);
    return crypto.publicEncrypt(clientPublicKey, Buffer.from(data)).toString('base64');
};


exports.decryptWithPrivateKey = (encryptedData) => {
    return crypto.privateDecrypt(serverPrivateKey, Buffer.from(encryptedData, 'base64')).toString('utf8');
};
