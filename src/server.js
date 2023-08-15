'use strict';

const express = require('express');
const fs = require('fs').promises;

const host = 'localhost';
const port = 8000;

const app = express();

app.use(express.static('src'));

app.get('/', (req, res) => {
  fs.readFile(__dirname + "/index.html")
    .then(contents => {
      res.setHeader("Content-Type", "text/html");
      res.writeHead(200);
      res.end(contents);
    })
    .catch(err => {
      res.writeHead(500);
      res.end(err);
      return;
    });
});

app.get('/first-page', (req, res) => {
  fs.readFile(__dirname + "/pages/first-page/index.html")
    .then(contents => {
      res.setHeader("Content-Type", "text/html");
      res.writeHead(200);
      res.end(contents);
    })
    .catch(err => {
      res.writeHead(500);
      res.end(err);
      return;
    });
});

app.get('/second-page', (req, res) => {
  fs.readFile(__dirname + "/pages/second-page/index.html")
    .then(contents => {
      res.setHeader("Content-Type", "text/html");
      res.writeHead(200);
      res.end(contents);
    })
    .catch(err => {
      res.writeHead(500);
      res.end(err);
      return;
    });
});

app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
