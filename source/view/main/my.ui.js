var nf       = sm("do_Notification");
var app      = sm("do_App");
var page     = sm("do_Page");
var config	 = require("config");
var http     = require("http_util");
var datacache= sm("do_DataCache");
var userName = ui("user_name");
var userAvatar = ui("user_avatar");
var userInfo = datacache.loadData("user");
userAvatar.on("touch",function(){
	app.openPage({
    	source: "source://view/user/login.ui",
    	statusBarState: "transparent",
    	statusBarFgColor:"white",
    	animationType:"slide_b2t",
    });
});

function setUserInfo(userInfo){
	userName.text = userInfo.nickname;
	userAvatar.source = userInfo.avatar;
}
if(datacache.hasData("user")){
	setUserInfo(datacache.loadData("user"));
}
app.on("refreshUser",function(){
	deviceone.print("刷新登录用户信息");
	setUserInfo(datacache.loadData("user"));
})