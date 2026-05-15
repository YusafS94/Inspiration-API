require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const quotesData = require('./quotesData.json'); // Import the quotes data from the JSON file
const scrapeData = require('./scraper'); // Import the scraping function
const fs = require('fs');

const writeToFile = (data) => {
    fs.writeFile('bookData.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error(`Error writing to file: ${err.message}`);
        } else {
            console.log('Book data successfully written to bookData.json');
        }
    });
};

// This is your ENDPOINT
app.get('/api/quotes', (req, res) => {
    res.json(quotesData); // Sends the data back as JSON
});

app.get('/api/books', async (req, res) => {
    // Here you would typically fetch book data from a database or another source
    try {
        const bookData = await scrapeData(); // Wait for the scraper to finish and get the book data
        res.json(bookData); // Sends the returned book data array back as JSON
        writeToFile(bookData); // Save the book data to a JSON file
    } catch (error) {
        console.error(`Error fetching book data: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch book data' });
    }
});

app.get('/api/books/over20', async (req, res) => {
    try {
        const filteredBooks = (await scrapeData()).filter(book => book.price > 20); // Ensure the scraper runs to update the bookData.json file
        // Here you would typically filter the book data to only include books over £20
        res.json(filteredBooks); // Sends the filtered book data back as JSON
        writeToFile(filteredBooks); // Save the filtered book data to a JSON file
    } catch (error) {
        console.error(`Error fetching book data: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch book data' });
    }
});

app.get('/api/books/over50', async (req, res) => {
    try {
        const filteredBooks = (await scrapeData()).filter(book => book.price > 50); // Ensure the scraper runs to update the bookData.json file
        // Here you would typically filter the book data to only include books over £50
        res.json(filteredBooks); // Sends the filtered book data back as JSON
        writeToFile(filteredBooks); // Save the filtered book data to a JSON file
    } catch (error) {
        console.error(`Error fetching book data: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch book data' });
    }
});

// app.get(`/api/books?price=${price}`, async (req, res) => {
//     try {
//         const price = parseFloat(req.query.price); // Get the price from the query parameters and convert it to a number
//         const filteredBooks = (await scrapeData()).filter(book => book.price < price); // Ensure the scraper runs to update the bookData.json file
//         res.json(filteredBooks); // Sends the filtered book data back as JSON
//         writeToFile(filteredBooks); // Save the filtered book data to a JSON file
//     } catch (error) {
//         console.error(`Error fetching book data: ${error.message}`);
//         res.status(500).json({ error: 'Failed to fetch book data' });
//     }
// })

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});