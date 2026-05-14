require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const quotesData = require('./quotesData.json'); // Import the quotes data from the JSON file
const scrapeData = require('./scraper'); // Import the scraping function

// This is your ENDPOINT
app.get('/api/quotes', (req, res) => {
    res.json(quotesData); // Sends the data back as JSON
});

app.get('/api/books', async (req, res) => {
    // Here you would typically fetch book data from a database or another source
    try {
        const bookData = await scrapeData(); // Wait for the scraper to finish and get the book data
        res.json(bookData); // Sends the returned book data array back as JSON
    } catch (error) {
        console.error(`Error fetching book data: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch book data' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});