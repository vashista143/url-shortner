const express = require("express");
const path = require("path");
const cors = require('cors');
const URLRoute = require("./routes/url");
require('dotenv').config();
const { connectDB } = require("./routes/connect");

// Ensure MONGO_URI is defined
if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI is not set in environment variables");
    process.exit(1);
}

const mongoURI = process.env.MONGO_URI;
connectDB(mongoURI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(error => console.error('❌ MongoDB connection error:', error));

const app = express();
const PORT = process.env.PORT || 8006; 

app.use(cors());
app.use(express.json());
const baseUrl = process.env.BASE_URL || ''; 

app.use("/url", URLRoute);
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'shorty.html'));
});

app.listen(PORT, () => console.log(`🚀 Server Started on port ${PORT}`));

// Handle uncaught errors
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1);
});

process.on("unhandledRejection", (err) => {
    console.error("Unhandled Promise Rejection:", err);
});
