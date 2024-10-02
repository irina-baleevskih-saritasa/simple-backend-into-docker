'use strict';

const http = require("http");
const path = require("path");
const fs = require('fs');
const fsPromises = require('fs').promises;

const host = '0.0.0.0';
const port = 8000;

const mimeTypes = {
  html: 'text/html',
  css: 'text/css',
  js: 'text/javascript',
  jpg: 'image/jpeg',
  png: 'image/png',
  ico: 'image/x-icon',
  svg: 'image/svg+xml',
  ttf: 'aplication/font-sfnt'
};

const requestListener = function (req, res) {
  const publicFolder = process.argv.length > 2 ? process.argv[2] : '.';
  const pathName = path.join(publicFolder, req.url).replace(/\/+/g, '/');
  const extension = path.extname(pathName);
  if (extension.length > 0 && mimeTypes.hasOwnProperty(extension.slice(1))) {
    const file = fs.readFileSync('src/' + pathName);
    res.setHeader("Content-Type", mimeTypes[extension.slice(1)]);
    res.writeHead(200);
    res.write(file, 'binary');
    res.end();
  } else {
    switch (req.url) {
      case "/":
        get('/index.html', res);
        break
      case "/first-page":
        get('/pages/first-page/index.html', res);
        break
      case "/second-page":
        get('/pages/second-page/index.html', res);
        break
      default:
        res.writeHead(404);
        res.end(JSON.stringify({error:"Resource not found"}));
    }
  }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

async function get(path, res) {
  try {
    const contents = await fsPromises.readFile(__dirname + path);
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(contents);
  } catch (err) {
    res.writeHead(404);
    res.end(err);
  }
}
