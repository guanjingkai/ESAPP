/**
 * New DeviceOne File
 */
var d = require("deviceone");;
var app = d.sm("do_App");
var nf = d.sm("do_Notification");
var datacache = d.sm("do_DataCache");
var page     = d.sm("do_Page");
module.exports.isResponseError = isResponseError;

function isResponseError(data,apiName,openLogin){
	if(data.hasOwnProperty("error")){
		nf.alert(data);
		nf.alert(apiName);
		if(data.error.code == "user.not_login" || data.error.code == 5){
			
			datacache.removeData("user", data.user);
			datacache.removeData("token", data.token);
			if(openLogin == true){
				//用户未登录
				app.openPage({
			    	source: "source://view/user/login.ui",
			    	statusBarState: "transparent",
			    	statusBarFgColor:"white",
			    	animationType:"slide_b2t",
			    });
			}
			return "not_login";
		}else{
			return false;
		}
	}else{
		return true;
	}
}