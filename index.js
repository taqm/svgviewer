#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');
const opn = require('opn');

const express = require('express');

const app = express();

app.set('views', __dirname);
app.set('view engine', 'pug');

const current = path.resolve('.');

app.use('/svg', express.static(current));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.get('/', (req, res) => {
  const files = fs.readdirSync(current)
    .filter(filename => fs.statSync(filename).isFile())
    .filter(filename => filename.match(/\.svg$/));
  res.render('index', {
    files,
  });
});

// app.listen(3000);
const svr = http.createServer(app).listen();
const port = svr.address().port;
app.set('port', port);

svr.on('listening', () => {
  const url = `http://localhost:${port}`;
  console.log(url);
  opn(url);
})
