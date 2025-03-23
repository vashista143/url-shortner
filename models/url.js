const mongoose = require("mongoose");
const shortid = require("shortid");

const URLSchema = new mongoose.Schema({
    shortyy: {  
        type: String,
        required: true,
        unique: true,
        default: shortid.generate  // ✅ Auto-generate short ID
    },
    redirectURL: {
        type: String,
        required: true,
    },
    Clicks: [{
        timestamp: { type: Number }
    }]
}, { timestamps: true });

const URL = mongoose.model('URL', URLSchema);
module.exports = { URL };
