const express = require('express');
const axios = require('axios');

const app = express();

// CORS အတွက်
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// ========== Facebook Download API ==========
app.get('/fb/dl', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: 'url parameter is required' });
  }
  try {
    const response = await axios.get(`https://nkka404-360api.hf.space/fb/dl?url=${encodeURIComponent(url)}`, {
      timeout: 30000,
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Facebook API failed', details: error.message });
  }
});

// ========== TikTok Download API ==========
app.get('/tik/dl', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: 'url parameter is required' });
  }
  try {
    const response = await axios.get(`https://nkka404-360api.hf.space/tik/dl?url=${encodeURIComponent(url)}`, {
      timeout: 30000,
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'TikTok API failed', details: error.message });
  }
});

// ========== YouTube Download API ==========
app.get('/yt/dl', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: 'url parameter is required' });
  }
  try {
    const response = await axios.get(`https://nyeinkokoaung.alwaysdata.net/yt/dl-api.php?url=${encodeURIComponent(url)}`, {
      timeout: 30000
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'YouTube DL API failed', details: error.message });
  }
});

// ========== YouTube Search API ==========
app.get('/yt/search', async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: 'q parameter is required' });
  }
  try {
    const response = await axios.get(`https://nyeinkokoaung.alwaysdata.net/yt/search-info-api.php?q=${encodeURIComponent(query)}`, {
      timeout: 30000
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'YouTube Search API failed', details: error.message });
  }
});

// ========== Health Check ==========
app.get('/', (req, res) => {
  res.json({ 
    status: 'active', 
    endpoints: ['/fb/dl', '/tik/dl', '/yt/dl', '/yt/search'],
    note: 'Usage: /fb/dl?url=FB_URL, /tik/dl?url=TIKTOK_URL, /yt/dl?url=YT_URL, /yt/search?q=KEYWORD'
  });
});

module.exports = app;
