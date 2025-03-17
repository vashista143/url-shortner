const express = require("express");
const router = express.Router();
const { genurl } = require("../controllers/url");
const { URL } = require('../models/url');  // Ensure this is the correct model

// Route to handle URL shortening
router.post("/", genurl);

// Route to handle redirection
router.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    try {
        const urlEntry = await URL.findOne({ shortyy: shortId });  // Ensure 'shortyy' matches the schema
        if (urlEntry) {
            urlEntry.Clicks.push({ timestamp: Date.now() }); // Track clicks
            await urlEntry.save();
            return res.redirect(urlEntry.redirectURL);
        } else {
            return res.status(404).json({ error: "URL not found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;    