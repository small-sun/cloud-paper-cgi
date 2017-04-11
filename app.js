
var config = require('./config');

var express = require('express');
var sio		= require('socket.io');

var app = express();

var server = app.listen(config.port, function () {
	console.log('Server listening at http://%s:%s', config.host, config.port);
});

// 将 socket.io 附加到 http server 上，
// 当 http server 接收到 upgrade websocket 时就将请求转给 socket.io 处理
var io = sio.listen(server, function() {
	console.log("upgrade http to websocket");
});


var apiRouter = require('./api_router.js');
// route
app.use('/', apiRouter(io));


module.exports = app;