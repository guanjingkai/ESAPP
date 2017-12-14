/**
 * related to couponGrid.ui
 * 
 * @Author : 18810151774
 * @Timestamp : 2017-12-07
 */
var nf       = sm("do_Notification");
var app      = sm("do_App");
var page     = sm("do_Page");

var config	 = require("config/config");
var http     = require("util/http");
var edusoho  = require("util/edusoho");

var couponGrid = ui('coupon_grid');
var couponGridData = mm("do_ListData");

couponGrid.bindItems(couponGridData);
couponGridData.addData([{a:1},{a:1},{a:1}]);
couponGrid.refreshItems();
rootView.on("dataRefreshed",function(d){

})