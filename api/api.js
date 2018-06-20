const https = require('https');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fs = require('fs');

mongoose.connect('mongodb://mongo:27017/test');

const User = mongoose.model('User', new Schema({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	name: { type: String, required: true }
}));

app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));

app.get('/', (req, res) => {
  res.send('API');
});

app.route('/users')
	.get((req, res) => {
		User.find((err, users) => {
			if(err) {
				return res.status(400).json({sucess: false, error: err.message})
			}
			return res.status(200).json({sucess: true, users: users})
		})
	})

app.route('/register')
	.post((req, res) => {
		let model = new User(req.body);

		model.save((err, data) => {
			if(err) {
				return res.status(400).json({sucess: false, error: err.message})
			}
			return res.status(200).json({sucess: true, data: data})
		})
	})

app.route('/user/:username')
	.get((req, res) => {
		User.findOne({username: req.params.username}, (err, user) => {
			if(err) {
				return res.status(400).json({sucess: false, error: err.message})
			}
			return res.status(200).json({sucess: true, user: user})
		})
	})
	.put((req, res) => {
		User.findOneAndUpdate({username: req.params.username}, req.body, {new: true}, (err, data) => {
			if(err) {
				return res.status(400).json({sucess: false, error: err.message})
			}
			return res.status(200).json({sucess: true, data: data})
		})
	})
	.delete((req, res) => {
		User.findOneAndRemove({username: req.params.username}, (err, data) => {
			if(err) {
				return res.status(400).json({sucess: false, error: err.message})
			}
			return res.status(200).json({sucess: true, id: req.body.id})
		})
	})

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