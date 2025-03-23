const shortid = require("shortid");
const { URL } = require('../models/url');

async function genurl(req, res) {
    try {
        const short = shortid.generate(); // ✅ Generate a unique ID

        const newUrl = await URL.create({
            shortyy: short,  // ✅ Use correct field name
            redirectURL: req.body.url,
            Clicks: []
        });

        const baseUrl = process.env.BASE_URL || "http://localhost:8006";
        const shortUrl = `${baseUrl}/url/${short}`;

        return res.json({ shortUrl });
    } catch (error) {
        console.error("Error creating shortened URL:", error);
        return res.status(500).send("Failed to generate URL");
    }
}

module.exports = { genurl };
