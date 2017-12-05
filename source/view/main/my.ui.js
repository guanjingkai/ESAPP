var nf       = sm("do_Notification");
var app      = sm("do_App");
var page     = sm("do_Page");
var config	 = require("config");
var http     = require("http_util");
var datacache= sm("do_DataCache");

var user = datacache.loadData("user");
var wiki_set = ui("avatar");
wiki_set.on("touch",function(){
	app.openPage({
    	source: "source://view/user/login.ui",
    	statusBarState: "transparent",
    	statusBarFgColor:"white",
    	animationType:"slide_b2t",
    });
});

var userName = ui("user_name");
userName.text = user.nickname;

