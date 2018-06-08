const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fs = require('fs');

mongoose.connect('mongodb://mongo:27017/test');

const timestamp = new Date().toUTCString();

const User = mongoose.model('User', new Schema({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	name: { type: String, required: true }
}));

app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));

app.get('/', (req, res) => {
  res.send(timestamp+'<br/><br/>'+fs.readFileSync('msg.txt', 'utf8'));
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

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});