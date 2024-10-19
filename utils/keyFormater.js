// Function to check if the input string is a valid PEM format
const isPemFormat = (key) => {
    // Regular expression to match PEM format
    const pemRegex = /-----BEGIN (.*)-----([A-Za-z0-9+/=\n]+)-----END (.*)-----/;
    return pemRegex.test(key);
};


const formatPem = (key, keyType = 'PUBLIC KEY') => {
    
    const formattedKey = key.match(/.{1,64}/g).join('\n');

    return `-----BEGIN ${keyType}-----\n${formattedKey}\n-----END ${keyType}-----`;
};


const ensurePemFormat = (key, keyType = 'PUBLIC KEY') => {
    if (isPemFormat(key)) {
        return key;
    } else {
        return formatPem(key, keyType);
    }
};


module.exports = ensurePemFormat;
