const express = require('express');
const axios = require('axios');
const app = express();

const API_KEY = process.env.API_KEY;  // Make sure you have this set as an environment variable

// Route to fetch WarcraftLogs rankings
app.get('/rankings/:characterName', async (req, res) => {
    const { characterName } = req.params;
			//https://www.warcraftlogs.com/v1/rankings/character/${characterName}/your-realm			
    try {
        const response = await axios.get(`https://vanilla.warcraftlogs.com/character/us/jom-gabbar/pilsung`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`
            }
        });

        // Send rankings back to the client
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching rankings:', error);
        res.status(500).json({ error: 'Failed to retrieve rankings.' });
    }
});

// Listen on the port provided by Vercel (or default to 3000 locally)
app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running');
});
