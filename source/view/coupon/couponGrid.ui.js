/**
 * related to couponGrid.ui
 * 
 * @Author : 18810151774
 * @Timestamp : 2017-12-07
 */
var nf       = sm("do_Notification");
var app      = sm("do_App");
var page     = sm("do_Page");
var config	 = require("config");
var http     = require("http_util");
var edusoho  = require("edusoho_util");
var couponGrid = ui('coupon_grid');
var couponGridData = mm("do_ListData");

couponGrid.bindItems(couponGridData);
rootView.on("dataRefreshed",function(d){
	nf.alert(d);
	couponGridData.addData([{},{},{}]);
	couponGrid.refreshItems();
})