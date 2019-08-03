require('dotenv').config();
const express = require('express');
const path = require('path');
const bp = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const https = require('https');
const fs = require('fs');
const cors = require('cors');
app.use(express.static(path.join(__dirname, '/static')));
app.use(bp.urlencoded({ extended: true }));
app.use(cors());

const httpsOptions = {
  cert: fs.readFileSync(path.join(__dirname, 'ssl', 'server.cer')),
  key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key'))
}

app.get('', function (req, res) {
  console.log('Hit Root Route')
});

app.get('/arlen-ness', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/page-scripts/arlen-ness.js'))
});

app.get('/gallery', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/page-scripts/gallery.js'))
});

app.get('/gallery-collection', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/page-scripts/gallery-collection.js'))
});

app.get('/search', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/page-scripts/search.js'))
});

https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`Hooked on ${port}`);
});
