/**
 * related to sobot.ui
 * 
 * @Author : 18810151774
 * @Timestamp : 2018-04-01
 */
//Require System Lib
var nf = sm("do_Notification");
var app = sm("do_App");
var page = sm("do_Page");
var btnClose = ui("btn_close");
page.on("back", function() {
	app.closePage();
});
btnClose.on("touch", function() {
	app.closePage();
});