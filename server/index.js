const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Proxy endpoint for TextRazor API
app.post('/api/textrazor', async (req, res) => {
    const API_KEY = '029671cbed842a33d0349cda8c7d7562da5dc944345465f1c4a75249'; // Your TextRazor API key
    const textRazorUrl = 'https://api.textrazor.com/';

    try {
        const response = await axios.post(textRazorUrl, req.body, {
            headers: {
                'X-TextRazor-Key': API_KEY,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('TextRazor API Error:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
            error: 'Failed to fetch data from TextRazor API',
            details: error.response?.data || error.message
        });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Proxy server running on http://localhost:${port}`);
});