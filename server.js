// server.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

const API_KEY = 'AIzaSyCqI_BR1VjIE7mO8qx9zvH8vn3qhbo0Otc'; // your real API key
const CX = 'd24938405cab846c1'; // your custom search engine ID

app.use(cors());

app.get('/api/startup-ideas', async (req, res) => {
  const budget = req.query.budget || '50000';

  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=startup ideas under ₹${budget}`
    );
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const first = data.items[0];
      res.json({
        title: first.title,
        snippet: first.snippet,
        link: first.link,
      });
    } else {
      res.json({ title: "", snippet: "", link: "" });
    }
  } catch (err) {
    res.status(500).json({ error: 'Search failed', details: err.message });
  }
});

app.listen(3000, () => console.log('✅ Backend running at http://localhost:3000'));
