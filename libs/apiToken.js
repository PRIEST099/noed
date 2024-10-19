const crypto = require('crypto');

exports.generateApiToken = () => {
    return crypto.randomBytes(32).toString('hex');
};
