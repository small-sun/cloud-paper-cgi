var config = require('../config');

var fs = require('fs');


// 创建token、创建房间
var create = function(req, res) {
	var roomId = req.params.id,
		roomPwd = req.params.password;
	var token = "",
		chars = config.chars;
	
	// 判断房间名是否存在

	// 生成随机字符
	function randomChar() {
		return chars.charAt(Math.floor(Math.random() * chars.length));
	}
	// 生成16位随机字符，每4位用 - 连接
	for(var i = 0;i < 4;i++) {
		for(var j = 0;j < 4;j++) {
			token += randomChar();
		}
		if(i != 3) {
			token += "-";
		}
	}

	// 根据token创建文件存储
	var dataStore = fs.createWriteStream(__dirname + '/../storage/' + token + '.json', { 'flag': 'a+'});

	// 判断token是否重复


	// 新房间
	var newRoom = {
		id: roomId,	// 房间名
		password: roomPwd != "" ? roomPwd : null,	// 房间密码
		token: token,	// 令牌
		owner: null,    // 房主
		nsp: null,		// websokcet的命名空间
		clientList: []  // 客户端列表
	};

	// 针对房主，创建房间
	newRoom.nsp = IO.of('/' + token);

	newRoom.nsp.on('connection', function(socket){

		if(newRoom.owner == null) {
			// 设置房主socket
			newRoom.owner = socket;
			// 接收房主传来的消息，存储、转发
			newRoom.owner.on('message', function(msg) {
				console.log(msg);
				newRoom.owner.broadcast.emit('message', msg);
				dataStore.write(msg);
			});
			console.log('room create');
		}else {
			newRoom.clientList.push(socket);
			console.log('client connect');
		}
	});

	ROOMS.push(newRoom);

	res.send(token);

};

exports.create = create;



// 销毁token
var destory = function(req, res) {
	var token = req.params.token;

	for(var i = 0;i < ROOMS.length;i++) {
		if(ROOMS[i].token == token) {
			ROOMS.splice(i, 1);
			break;
		}
	}

	res.send("ok")
}

exports.destory = destory;
