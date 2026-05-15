const axios = require('axios');
const cheerio = require('cheerio');


const url = 'http://books.toscrape.com/';

async function scrapeData() {
    try {
        // 1. AXIOS: Downloads the raw HTML source code of the page
        const response = await axios.get(url);
        const html = response.data;

        // 2. CHEERIO: Loads the HTML so we can search it like jQuery
        const $ = cheerio.load(html);

        // 3. SELECTION: We create an empty array to hold our "scraped" items
        const bookData = [];

        // We target the container for each book
        $('.product_pod').each((index, element) => {
            const title = $(element).find('h3 a').attr('title'); // Extract the 'title' attribute
            const price = parseFloat($(element).find('.price_color').text().replace('£', '')); // Extract the text inside the price class and remove the currency symbol
            const url = $(element).find('.image_container img').attr('src'); // Extract the 'src' attribute for the book image URL
            const availability = $(element).find('.product_price .instock.availability').text().trim(); // Extract the availability text

            bookData.push({
                title: title,
                price: price,
                url: url,
                availability: availability
            });

        });



        // ADD THIS: Return the data so the API can use it!
        return bookData;

    } catch (error) {
        console.error(`Error scraping: ${error.message}`);
        return []; // Return an empty array if it fails so the API doesn't crash
    }
}

scrapeData();

module.exports = scrapeData;

// This code is a web scraper that uses the Axios library to fetch the HTML content of a webpage and the Cheerio library to parse and extract specific data from that HTML. The scraper targets a book store website, extracting the title, price, image URL, and availability of books that are priced under £20. The extracted data is then saved to a JSON file named 'bookData.json'. The scraper also includes error handling to catch and log any issues that may arise during the scraping process.
