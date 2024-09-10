const express = require('express');  // Importer Express
const app = express();               // Initialiserer en Express-applikation
const port = process.env.PORT || 3000;  // Angiv porten, hvor serveren skal køre

// Definer en simpel rute til din startside
app.get('/', (req, res) => {
    res.send('Welcome to the Cycle Training App!');
});

// Start serveren og lyt på den angivne port
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

