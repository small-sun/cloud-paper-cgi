var express = require('express');
var token = require('./api/token');
var websocket = require('./api/websocket');
// var config = require('./config');

var router = express.Router();
// token
router.get('/token/create', token.create);
router.get('/token/destory/:token', token.destory);

// websocket
// 客户端io.connect('/websocket/connect/:token')
router.get('/websocket/connect/:token', websocket.connect);


module.exports = router;