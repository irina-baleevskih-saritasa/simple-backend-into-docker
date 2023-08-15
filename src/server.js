'use strict';

const express = require('express');
const fs = require('fs').promises;

const host = 'localhost';
const port = 8000;

const app = express();

app.get('/', (req, res) => {
  res.setHeader("Content-Type", "text/html");
  switch (req.url) {
    case "/":
      fs.readFile(__dirname + "/index.html")
        .then(contents => {
          res.writeHead(200);
          res.end(contents);
        })
        .catch(err => {
          console.error(`Could not read file: ${err}`);
          res.writeHead(500);
          res.end(err);
        });
      break
    case "/page-one":
      fs.readFile(__dirname + "/pages/page-one/index.html")
        .then(contents => {
          res.writeHead(200);
          res.end(contents);
        })
        .catch(err => {
          console.error(`Could not read file: ${err}`);
          res.writeHead(500);
          res.end(err);
        });
      break
    default:
        res.writeHead(404);
        res.end(JSON.stringify({error:"Resource not found"}));
    }
});

app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
