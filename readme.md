# Inspiration API & Books Scraper

A Python project that provides inspirational quotes through an API and scrapes book data from web sources.

## Features

- **Inspiration API**: Fetch random inspirational quotes with authors
- **Books Scraper**: Extract book information from web sources
- **Easy Integration**: Simple API endpoints for quick access to data
- **Lightweight**: Minimal dependencies for fast execution

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd "Inspiration API"
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

## Usage

### Running the API

```bash
python app.py
```

The API will start on `http://localhost:5000` (or your configured port)

### API Endpoints

- `GET /api/quotes` - Retrieve a random inspirational quote
- `GET /api/quotes/<id>` - Get a specific quote by ID
- `GET /api/books` - Scrape and retrieve book data

### Example Requests

```bash
curl http://localhost:5000/api/quotes
curl http://localhost:5000/api/books
```

## Project Structure

```
Inspiration API/
├── app.py              # Main application file
├── scraper.py          # Web scraping module
├── requirements.txt    # Project dependencies
└── readme.md           # This file
```

## Technologies Used

- **Python 3.x**
- **Flask** - Web framework
- **BeautifulSoup/Requests** - Web scraping
- **JSON** - Data format

## License

MIT License

## Author

Yusaf
