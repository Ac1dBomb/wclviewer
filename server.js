const express = require('express');
const axios = require('axios');
const app = express();

const API_KEY = process.env.API_KEY;  // Fetch API key from environment variables

// Route to fetch WarcraftLogs rankings
app.get('/rankings/:characterName', async (req, res) => {
    const { characterName } = req.params;

    try {
        const response = await axios.get(`https://www.warcraftlogs.com/v1/rankings/character/${characterName}/your-realm`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`
            }
        });

        res.json(response.data);  // Send the rankings back to the client
    } catch (error) {
        console.error('Error fetching rankings:', error);
        res.status(500).json({ error: 'Failed to retrieve rankings.' });
    }
});

// Listen on port provided by Vercel (or default to 3000)
app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running');
});
