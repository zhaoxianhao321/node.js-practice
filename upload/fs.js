const fs=require('fs');


fs.readFile('读取.txt',(err,data)=>{
	if(err){
		console.log('读取不到');
	}else{
		console.log(data);
	}
});


fs.writeFile('写入.txt','333',err=>{
	if(err){
		console.log(err);
	}else{
		console.log('success');
	}
});