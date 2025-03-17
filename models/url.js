const mongoose = require("mongoose");

const URLSchema = new mongoose.Schema({
    shortyy: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    Clicks: [{
        timestamp: { type: Number }
    }] 
}, 
{ timestamps: true });

const URL = mongoose.model('URL', URLSchema);
module.exports = { URL };
