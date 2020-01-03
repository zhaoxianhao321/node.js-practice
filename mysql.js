const mysql = require('mysql');

// 连接池
let db=mysql.createPool({host:'localhost',user:'root',password:'',port:'3306',database:'202012'});


db.query("INSERT INTO user_table (`ID`,`name`,`gender`,`chinese`,`math`) VALUES ('0','yellow','男','56','22')",(err,data)=>{
	if(err){
		console.log(err);
	}else{
		console.log(data);
	}
});