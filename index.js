const express = require('express');
const path = require('path');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();  // Indlæs miljøvariabler fra .env-filen

const app = express();
const port = process.env.PORT || 3000;

// Funktion til at få en ny Strava Access Token ved brug af Refresh Token
async function getAccessToken() {
    try {
        const response = await axios.post('https://www.strava.com/oauth/token', {
            client_id: process.env.STRAVA_CLIENT_ID,
            client_secret: process.env.STRAVA_CLIENT_SECRET,
            refresh_token: process.env.STRAVA_REFRESH_TOKEN,
            grant_type: 'refresh_token'
        });

        return response.data.access_token;
    } catch (error) {
        console.error('Error refreshing Strava access token:', error);
        throw new Error('Unable to refresh access token');
    }
}

// Server statiske filer fra mappen 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Standardrute til at vise dashboardet
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Rute til at hente Strava-data
app.get('/strava/recent-workouts', async (req, res) => {
    try {
        const accessToken = await getAccessToken();  // Få en ny access token automatisk

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

// Start serveren
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
