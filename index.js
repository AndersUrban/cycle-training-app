const express = require('express');
const path = require('path');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();  // Indlæs miljøvariabler fra .env-filen

const app = express();
const port = process.env.PORT || 3000;

// Funktion til at hente Strava Access Token
async function getAccessToken() {
    return process.env.STRAVA_ACCESS_TOKEN;
}

// Server statiske filer fra mappen 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Standardrute til dashboard
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Hent seneste træninger fra Strava
app.get('/strava/recent-workouts', async (req, res) => {
    try {
        const accessToken = await getAccessToken();

        const response = await axios.get('https://www.strava.com/api/v3/athlete/activities', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        res.json(response.data);  // Send Strava-data som JSON
    } catch (error) {
        console.error('Error fetching Strava data:', error);
        res.status(500).send('Error fetching Strava data');
    }
});

// Start serveren
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
