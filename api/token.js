var config = require('../config');

// 创建token
var create = function(req, res) {
	var token = "";
	var chars = config.chars;
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

	res.send(token);

};

exports.create = create;

// 销毁token
var destory = function(req, res) {
	console.log(req.token + "destory");
	res.send("ok")
}

exports.destory = destory;
