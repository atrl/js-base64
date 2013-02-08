/**
 * base 64 编码解码
 * http://zh.wikipedia.org/wiki/Base64
 */
var Base64 = {
	_map : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split(''),
	//位数补齐
	_prefixbit : function(num, length){
		var def = '00000000';
		return def.substr(0,length - num.length) + num;
	},
	encode : function(str){
		var bit = '';
		var fix = '';
		var result = '';

		//将字符串分割
		str.split('').forEach(function(v){
			//将单个字符转成8位ascii码并连接
			bit += Base64._prefixbit(v.charCodeAt(0).toString(2), 8);
		});

		//补0 补等号
		//最后剩余一个八位字节(1个byte)时，最后一个6位的base64字节块有4位是0值，最后附加2个等号；
		//最后剩余两个八位字节(2个byte)时，最后一个6位的base64字节块有2位是0值，最后附加1个等号。
		switch(str.length % 3){
			case 1 :
				bit += '0000';
				fix += '==';
				break;
			case 2 : 
				bit += '00';
				fix += '=';
				break;
		}

		var index = 0;
		while(bit.length > index){
			//读取6位二进制位
			var codeIdx = parseInt(bit.substr(index, 6), 2);
			result += Base64._map[codeIdx];
			index += 6;
		}

		return result + fix;
	},

	decode : function(str){
		var bit = '';
		var result = '';
		//将字符串转为二进制
		str.split('').forEach(function(v){
			//末尾等号过滤多余的等号
			if(v == '='){
				bit = bit.substr(0, bit.length - 2);
			}
			//将单个字符转成6位二进制
			else{
				bit += Base64._prefixbit(Base64._map.indexOf(v).toString(2), 6);
			}
		});

		var index = 0;
		while(bit.length > index){
			//读取6位二进制位
			var code = parseInt(bit.substr(index, 8), 2);
			result += String.fromCharCode(code);
			index += 8;
		}

		return result;
	}
}