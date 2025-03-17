const express = require("express");
const path = require("path");
const cors = require('cors');
const URLRoute = require("./routes/url");
require('dotenv').config();
const { connectDB } = require("./routes/connect");

const mongoURI = process.env.MONGO_URI;
connectDB(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(error => console.error('MongoDB connection error:', error));

const app = express();
const PORT = process.env.PORT || 8006; // Default to 8006 for local development, or use Render's assigned port

app.use(cors());
app.use(express.json());

// Use environment variable for baseUrl, set it in Render's environment settings
const baseUrl = process.env.BASE_URL || `http://localhost:${PORT}/url`; // Fallback to localhost if not defined

app.use("/url", URLRoute);

app.use(express.static(path.join(__dirname, 'shorty frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'shorty frontend', 'shorty.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`Something broke! Error: ${err.message}`);
});

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
