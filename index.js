const express = require('express');
const axios = require('axios');  // Tilføj denne linje
const path = require('path');  // Importer 'path' til filhåndtering
const app = express();
const port = process.env.PORT || 3000;

// Server statiske filer fra mappen 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Standardrute til at vise dashboardet
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));  // Opdateret til 'dashboard.html'
});

// Start serveren
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
const axios = require('axios');

// Eksempel på at bruge axios til at hente data fra Strava API
app.get('/strava/recent-workouts', async (req, res) => {
    try {
        const accessToken = 'YOUR_STRAVA_ACCESS_TOKEN';  // Udskift med din Strava token
        const response = await axios.get('https://www.strava.com/api/v3/athlete/activities', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        res.json(response.data);  // Returner data til frontend
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching Strava data');
    }
});
