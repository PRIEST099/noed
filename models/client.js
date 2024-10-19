const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    appId: { type: String, required: true, unique: true },
    hashedApiToken: { type: String, required: true },
    clientPublicKey: { type: String },
    confirmed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Client', clientSchema);
