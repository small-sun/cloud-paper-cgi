
exports.connect = function(io) {
	return function() {
		console.log("request connection");
		console.log(io)

		io.on('connection', function(socket) {
			// 接受
			socket.on('message', function(msg) {
				console.log(msg);
			});
			socket.broadcast.emit('message',msg);
		});

		// var chat = io.of('/websocket/connect/' + token);
		// chat.emit('an event sent to all connected clients in chat namespace');

	};
};