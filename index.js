const express = require('express');
const path = require('path');
const axios = require('axios');  // Importer axios til at lave API-kald

const app = express();
const port = process.env.PORT || 3000;

// Server statiske filer fra mappen 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Standardrute til at vise dashboardet
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Rute til at hente Strava-data
app.get('/strava/recent-workouts', async (req, res) => {
    try {
        const accessToken = 'YOUR_STRAVA_ACCESS_TOKEN';  // Udskift med din Strava Access Token

        // Lav forespørgsel til Strava API for at hente brugerens aktiviteter
        const response = await axios.get('https://www.strava.com/api/v3/athlete/activities', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        // Send Strava-data tilbage som JSON
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching Strava data:', error);
        res.status(500).send('Error fetching Strava data');
    }
});

// Start serveren og lyt på den angivne port
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
