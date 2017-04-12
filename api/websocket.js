
// 请求建立连接
exports.connect = function(req, res) {
	var token = req.params.token;
	console.log(token);

	// 获取与token相对应的房间
	var room = null;
	for(var i = 0;i < rooms.length;i++) {
		if(rooms[i].token == token) {
			room = rooms[i];
		}
	}

	var data;
	if(room != null) {
		data = {
			state: 'success',
			token: token
		};
	}else {
		data = {
			state: "failed",
			token: ""
		};
	}
	res.send(data);
};

