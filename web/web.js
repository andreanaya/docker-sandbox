const express = require('express');
const app = express();
const fs = require('fs');
const https = require('https');

app.get('/', (req, res) => {
	res.send('Coming soon');
});

const privateKey = fs.readFileSync('/etc/letsencrypt/live/andreanaya.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/andreanaya.com/fullchain.pem', 'utf8');
const ca = fs.readFileSync('/etc/ssl/certs/dhparam-2048.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

let server = https.createServer(credentials, app).listen(3000, () => {
  console.log('Example app listening on port 3000!');
});