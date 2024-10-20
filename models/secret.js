const mongoose = require('mongoose');

const secretVersionSchema = new mongoose.Schema({
    version: { type: Number, required: true },
    secretData: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }, 
});



const secretSchema = new mongoose.Schema({
    clientId: { type: String, required: true },
    secretName: { type: String, required: true, unique: true },
    versions: [secretVersionSchema],
});

const Secret = mongoose.model('Secret', secretSchema);

module.exports = Secret;

