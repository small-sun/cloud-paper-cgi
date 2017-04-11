
var config = require('./config');

var express = require('express');
var sio		= require('socket.io');

var app = express();

var server = app.listen(config.port, function () {
	console.log('Server listening at http://%s:%s', config.host, config.port);
});

// 将 socket.io 附加到 http server 上，
// 当 http server 接收到 upgrade websocket 时就将请求转给 socket.io 处理
var io = sio.listen(server);


var apiRouter = require('./api_router.js');

app.use(function(req ,res ,next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Content-Length, Authorization, Accept, X-Requested-With'
    );
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method == 'OPTIONS') {
        res.send(200); //options快速响应
    }
    else {
        next();
    }
});
// route
app.use('/', apiRouter(io));


module.exports = app;