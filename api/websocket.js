
exports.connect = function(io) {
	return function() {
		console.log("request connection");

		io.on('connection', function(socket) {
			socket.on('message', function(msg) {
				console.log(msg);
			});
			socket.broadcast.emit('message',msg);
		});
	};
};