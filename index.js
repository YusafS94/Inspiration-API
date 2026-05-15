require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // Use the PORT from environment variables or default to 3000
const quotesData = require('./quotesData.json'); // Import the quotes data from the JSON file
const scrapeData = require('./scraper'); // Import the scraping function
const fs = require('fs');
const path = require('path');
app.use(express.static('public')); // Serve static files from the 'public' directory

const writeToFile = (data) => {
    fs.writeFile('bookData.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error(`Error writing to file: ${err.message}`);
        } else {
            console.log('Book data successfully written to bookData.json');
        }
    });
};

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve the index.html file
});

// Hard coded Quotes endpoint
app.get('/api/quotes', (req, res) => {
    res.json(quotesData); // Sends the data back as JSON
});

// Books endpoint that uses the scraper to get book data and filter it based on price
app.get('/api/books', async (req, res) => {
    // Here you would typically fetch book data from a database or another source
    try {
        // 1. Get the price limit from the query parameters and convert it to a number
        const priceLimit = parseFloat(req.query.price);

        // 2. Wait for the scraper to finish and get the book data
        const bookData = await scrapeData();

        // 3. Filter the book data based on the price limit
        const filteredBooks = bookData.filter(book => book.price < priceLimit);

        // 4. Sends the filtered book data array back as JSON
        res.json(filteredBooks);

        // 5. Save the filtered book data to a JSON file
        writeToFile(filteredBooks);
    } catch (error) {
        console.error(`Error fetching book data: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch book data' });
    }
});

// Additional endpoints for books over specific price points
app.get('/api/books/over20', async (req, res) => {
    try {
        // 1. Get the book data from the scraper
        const bookData = await scrapeData();

        // 2. Filter the book data to only include books over £20
        const filteredBooks = bookData.filter(book => book.price > 20);

        // 3. Sends the filtered book data back as JSON
        res.json(filteredBooks);

        // 4. Save the filtered book data to a JSON file
        writeToFile(filteredBooks);
    } catch (error) {
        console.error(`Error fetching book data: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch book data' });
    }
});

app.get('/api/books/over50', async (req, res) => {
    try {
        // 1. Get the book data from the scraper
        const bookData = await scrapeData();

        // 2. Filter the book data to only include books over £50
        const filteredBooks = bookData.filter(book => book.price > 50);

        // 3. Sends the filtered book data back as JSON
        res.json(filteredBooks);

        // 4. Save the filtered book data to a JSON file
        writeToFile(filteredBooks);
    } catch (error) {
        console.error(`Error fetching book data: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch book data' });
    }
});

app.get('/api/quotes/:category', (req, res) => {
    // 1. Extract the category from the URL parameters
    const category = req.params.category.toLowerCase();
    const results = quotesData[category];
    // 2. Check if the category exists in the quotes data
    if (results) {
        res.json(results); // 3. If it exists, send the quotes back as JSON
    } else {
        res.status(404).json({ error: 'Category not found' }); // 4. If it doesn't exist, send a 404 error
    }
});
// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});