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

const express = require('express');
const path = require('path');  // Importer 'path' til filhåndtering
const app = express();
const port = process.env.PORT || 3000;

// Server statiske filer fra mappen 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Standardrute til at vise dashboardet
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start serveren
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
