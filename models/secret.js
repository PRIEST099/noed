const mongoose = require('mongoose');

    const secretSchema = new mongoose.Schema({
        clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
        secretName: String,
        secretData: String
    });

module.exports = mongoose.model('Secret', secretSchema);
