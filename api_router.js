var express = require('express');
var token = require('./api/token');
var websocket = require('./api/websocket');
// var config = require('./config');

module.exports = function(io){
	var router = express.Router();
	// token
	router.get('/token/create', token.create);
	router.get('/token/destory/:token', token.destory);

	// websocket
	router.get('/websocket/connect/:token', websocket.connect(io));

	return router;
};