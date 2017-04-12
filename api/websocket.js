
// 请求建立连接
exports.connect = function(req, res) {
	var token = req.params.token;
	console.log(token);

	// 获取与token相对应的房间
	var room = null;
	for(var i = 0;i < ROOMS.length;i++) {
		if(ROOMS[i].token == token) {
			room = ROOMS[i];
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

// 查看与websocket连接相关信息
exports.getRooms = function(req, res) {
	var rooms = [];
	var room;
	for(var i = 0;i < ROOMS.length;i++) {
		room =  {
			id: ROOMS[i].id,
			token: ROOMS[i].token
		}
		rooms.push(room);
	}
	console.log("rooms:" + rooms);
	// 返回
	res.send(rooms);

}
