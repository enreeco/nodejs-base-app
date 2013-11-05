/**
  Here lies the routes
  Author: Enrico Murru
          http://about.me/enreeco
          @enreeco
 **/

var request = require('request');
var model = require('../model');
var C = require('../config');

exports.api = require('./api');

exports.mainRoute = function(req,res){
	res.render('index',{});
};