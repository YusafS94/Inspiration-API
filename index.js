const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const scrapeData = require('./test-scraper'); // Import the scraping function

// This is your DATA PROVIDER (A hardcoded array)
const quotes = [
    { id: 1, text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
    { id: 2, text: "Fix the cause, not the symptom.", author: "Steve Maguire" },
    { id: 3, text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
    { id: 4, text: "Before software can be reusable it first has to be usable.", author: "Ralph Johnson" }
];

// This is your ENDPOINT
app.get('/api/quotes', (req, res) => {
    res.json(quotes); // Sends the data back as JSON
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