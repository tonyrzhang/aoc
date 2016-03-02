md5 = require('md5');
var input = 'bgvyzdsv';
var i = 0;
while (true) {
	if (md5(input + i).indexOf('00000')===0){
		console.log(i);
		break;
	}
	i++;
}
