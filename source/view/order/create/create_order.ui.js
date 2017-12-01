/**
 * related to create_order.ui
 * 
 * @Author : 18810151774
 * @Timestamp : 2017-11-27
 */
var nf = sm("do_Notification");
var app = sm("do_App");
var page = sm("do_Page");

var btnClose = ui("btn_close");
btnClose.on("touch", function() {
	app.closePage();
});
page.on("back", function() {
	app.closePage();
});