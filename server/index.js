const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
module.exports = app;

const mongoose = require('mongoose');
mongoose.Promise = Promise;
require('../models/Accounts');

mongoose.connect(process.env.MONGODB_URI ||'mongodb://heroku_sjg8kqmm:33jkdaujb2vpo5sukgp4jf54dg@ds125048.mlab.com:25048/heroku_sjg8kqmm');

let Account = mongoose.model('Account');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')

  next()
});

//app.use(express.static('client'));
app.use(express.static(path.join(__dirname, '../build')))

//Get all accounts
app.get('/accounts', (req, res) => { //route for getting all accounts
  Account.find({}).then(a => res.json(a)).catch(console.error);
});

//Signing in
app.post('/login', (req, res) => {
  console.log(req.body)
  Account.findOne({email: req.body.email}).then(doc => doc.toObject()).then(a => {res.json(a)}).catch(console.error)
});

//Account creation
app.post('/signup', (req,res) => {
  console.log(req.body);
  const newAccount = new Account({email: req.body.email, profile: req.body.profile, username: req.body.username, password: req.body.password, imageUrl: req.body.imageUrl });
  newAccount.save();
});

//Update account info
app.post('/account', (req, res) => (
  Account.findOneAndUpdate({ email: req.body.email }, { username: req.body.username, profile: req.body.profile }).then(Account.findOne({email: req.body.email}).then(doc => doc.toObject()).then(u => res.json(u)))
))

//Get account info
app.get('/account', (req, res) => (
  Account.findOne({ email: req.body.email }).then(doc => doc.toObject()).then(a => res.json(a)).catch(console.error)
))


//The route below clears all saved documents from the DB. 
//Note: this route is NOT connected to the Front End AT ALL. It can accessed through curl or the browser bar by appending '/wipe' to whatever the base url is.

app.get('/wipe', (req, res, next) => { 
  Account.remove({}, function(err) { 
   console.log('account removed'); 
  });
});


var port = process.env.PORT || 4040;
app.listen(port);
console.log("Listening on port " + port);
