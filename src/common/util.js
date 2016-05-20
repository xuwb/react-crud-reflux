'use strict';

define(function(require, exports, module) {
	module.exports = {
		
		// obj:      时间字符串
		// showTime: 是否显示时分秒
		// IsMi:     是否显示毫秒
		formatDateTime: function(obj, showTime, IsMi) {   
	        var myDate = new Date(obj);   
	        var year = myDate.getFullYear();  
	        var month = ("0" + (myDate.getMonth() + 1)).slice(-2);  
	        var day = ("0" + myDate.getDate()).slice(-2);  
	        var h = ("0" + myDate.getHours()).slice(-2);  
	        var m = ("0" + myDate.getMinutes()).slice(-2);  
	        var s = ("0" + myDate.getSeconds()).slice(-2);   
	        var mi = ("00" + myDate.getMilliseconds()).slice(-3);  
	        if(!showTime) {
	        	return year + "-" + month + "-" + day;
	        }
	        if (IsMi) {   
	            return year + "-" + month + "-" + day + " " + h + ":" + m + ":" + s;   
	        }   
	        else {   
	            return year + "-" + month + "-" + day + " " + h + ":" + m + ":" + s + "." + mi;   
	        }
	    }
	}
})