const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

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

            if (price < 20) { // Filter for books under £20
                bookData.push({
                    title: title,
                    price: price,
                    url: url,
                    availability: availability
                });
            }
        });

        // 4. OUTPUT: Log the final data to your terminal
        console.log("Successfully Scraped Data:");
        // console.table(bookData);

        // 5. SAVE: Write the scraped data to a JSON file
        fs.writeFileSync('bookData.json', JSON.stringify(bookData, null, 2));

    } catch (error) {
        console.error(`Error scraping: ${error.message}`);
    }
}

scrapeData();