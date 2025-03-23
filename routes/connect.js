const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

async function connectDB(url) {
    try {
        await mongoose.connect(url);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
}

module.exports = { connectDB };
