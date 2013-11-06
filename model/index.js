var mongoose = require('mongoose');
var C = require('../config.js');

mongoose.connect(C.DB.url);
exports.mongoose = mongoose;

var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
	  console.log('Mongoose connected!');
	});

/* Single request inside a given bin */
var userSchema = mongoose.Schema({
    	username : String,	//username
    	email: String,		//email
    	service: String, 	//social service used
    	serviceId: String,	//social service ID
    	displayName : String,
    	created: { type: Date, default: Date.now }	//created date
	},
	{ collection : 'User' });
exports.User = mongoose.model('User', userSchema);