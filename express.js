const express = require('express'); //主体
const body = require('body-parser'); //接收普通post数据
const multer = require('multer'); //接受文件post数据

let server = express();
server.listen(8010);

// 中间件
server.use(body.urlencoded({
	extended: false
}));

let multerObj = multer({
	dest: './upload/'
});
server.use(multerObj.any());

server.post('/api', (req, res) => {

	if (req.headers['origin'].startsWith("http://127.0.0.1:8848")) {
		res.setHeader('Access-Control-Allow-Origin', '*'); // 这里*的意思是允许一切域来访问我，但是一般都会写跨我的域名
	}

	res.send('ok');

	console.log(req.body);
	console.log(req.files);
});

server.use(express.static('./'));

// 
// server.post('/api',()=>{
// 	
// });
// 
// server.use('/',()=>{
// 	
// });
