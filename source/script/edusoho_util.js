/**
 * New DeviceOne File
 */
var d = require("deviceone");;
var app = d.sm("do_App");
var nf = d.sm("do_Notification");
var datacache = d.sm("do_DataCache");
var page     = d.sm("do_Page");
module.exports.isResponseError = isResponseError;

function isResponseError(data,apiName){
	if(data.hasOwnProperty("error")){
		//nf.alert(data.error.message)
		nf.alert(data);nf.alert(apiName);
		if(data.error.code == "user.not_login"){
			//用户未登录
			app.openPage({
		    	source: "source://view/user/login.ui",
		    	statusBarState: "transparent",
		    	statusBarFgColor:"white",
		    	animationType:"slide_b2t",
		    });
			datacache.removeData("user", data.user);
			datacache.removeData("token", data.token);
		}
		return false;
	}else{
		return true;
	}
}