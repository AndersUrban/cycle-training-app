const express = require('express');
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
