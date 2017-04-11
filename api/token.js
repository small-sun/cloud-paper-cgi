var config = require('../config');

var fs = require('fs');


// 创建token、创建房间
var create = function(req, res) {
	var token = "",
		chars = config.chars;
	
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
		token: token,
		owner: null,
		nsp: null,
		clientList: []
	};

	// 针对房主，创建房间
	newRoom.nsp = io.of('/' + token);

	newRoom.nsp.on('connection', function(socket){

		if(newRoom.owner == null) {
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

	rooms.push(newRoom);

	res.send(token);

};

exports.create = create;



// 销毁token
var destory = function(req, res) {
	var token = req.params.token;

	for(var i = 0;i < rooms.length;i++) {
		if(rooms[i].token == token) {
			rooms.splice(i, 1);
			break;
		}
	}

	res.send("ok")
}

exports.destory = destory;
