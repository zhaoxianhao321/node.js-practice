let b=new Buffer('asd--fasd--fa');

console.log(b.indexOf('--',4));

console.log(b.slice(0,3).toString());

Buffer.prototype.split=function(b){
	let arr=[];
	let cur=0;
	let n=0;
	while((n=this.indexOf(b,cur))!=-1){
		arr.push(this.slice(cur,n));
		cur=n+b.length;
	}
	arr.push(this.slice(cur));
	return arr;
}
let str=b.split('--');
console.log(str.map(item=>item.toString()));