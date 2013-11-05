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
var anObjectSchema = mongoose.Schema({
    	name : String,
    	created: { type: Date, default: Date.now }
	},
	{ collection : 'AnObject' });
exports.AnObject = mongoose.model('AnObject', anObjectSchema);