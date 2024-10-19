const fs = require('fs');

// Function to check if the input string is a valid PEM format
const isPemFormat = (text) => {
    // Regular expression to match PEM format
    const pemRegex = /-----BEGIN (.*)-----([A-Za-z0-9+/=\n]+)-----END (.*)-----/;
    return pemRegex.test(text);
};

// Function to format a base64 string into a valid PEM format
const formatPem = (key, keyType = 'PUBLIC KEY') => {
    // Split the key into lines of 64 characters
    const formattedKey = key.match(/.{1,64}/g).join('\n');
    // Construct the PEM formatted key
    return `-----BEGIN ${keyType}-----\n${formattedKey}\n-----END ${keyType}-----`;
};

// Example test cases
const testPemKeys = [
    `-----BEGIN PUBLIC KEY-----
MIIBITANBgkqhkiG9w0BAQEFAAOCAQ4AMIIBCQKCAQBm89uj/wp/aYPk4R1gDDbY
qYbxTsenyuvjSkMRtiwzNcoXjg0AppqBdYDHCoR1VYAwVqRLCYVh0s8bxpZoUkkj
G8MP/SHj6+4jcR+BsfcMF5ZTG63yrXnpGTe2gRUeG8yRFN3KhTfD4cL3FZB8ic6Z
7jcUqNw8xBkf1iFhxGv8jt2eN453lfGdQ6rL82jTqS/efUgtKhxIGNEoG2tWwtWC
5/t6q9agUzUta7L5/FZUBo2kMZc4RH+Edd7rwvfjWaubpuR46tJxVGMNCxQUm9Dt
mpf24+mP8Jnl8zYhdxyNxTHdRaVfepyUlUUoS0ZqdEhsJFrweluTAHIkctg/gWBf
AgMBAAE=
-----END PUBLIC KEY-----`
];

// Check each test case
testPemKeys.forEach((key) => {
    const result = isPemFormat(key);
    console.log(`Testing key:\n${key}\nIs valid PEM format? ${result}\n`);
    
    // If the key is not in PEM format, format it
    if (!result) {
        const formattedKey = formatPem(key);
        console.log(`Formatted key:\n${formattedKey}\n`);
    }
});
