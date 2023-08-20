'use strict';

const express = require('express');
const fs = require('fs').promises;

const host = '0.0.0.0';
const port = 8000;

const app = express();

app.use(express.static('src'));

app.get('/', (req, res) => {
  get('/index.html', res);
});

app.get('/first-page', (req, res) => {
  get('/pages/first-page/index.html', res);
});

app.get('/second-page', (req, res) => {
  get('/pages/second-page/index.html', res);
});
 
async function get(path, res) {
  try {
    const contents = await fs.readFile(__dirname + path);
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(contents);
  } catch (err) {
    res.writeHead(500);
    res.end(err);
    return;
  }
}

app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
