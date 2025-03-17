const shortid = require("shortid");
const { URL } = require('../models/url'); 
async function genurl(req, res) {
    const short = shortid.generate(); 
    try {
        await URL.create({  
            shortyy: short,  
            redirectURL: req.body.url,  
            Clicks: [],  
        });

        const baseUrl = process.env.BASE_URL || `http://localhost:8006/url`;; 
        const shortUrl = `${baseUrl}/${short}`;  

        return res.json({ shortUrl });  
    } catch (error) {
        console.error("Error creating shortened URL:", error);
        return res.status(500).send("Failed to generate URL");
    }
}

module.exports = {
    genurl,
};
