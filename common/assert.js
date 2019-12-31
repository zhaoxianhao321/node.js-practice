const assert=require('assert');

function sum(a,b){
	assert(arguments.length===2,'必须穿两个参数');
	assert((typeof a==='number')&&(typeof b==='number'),'两个参数必须为number类型');
	return a+b;
}


console.log(sum(3));