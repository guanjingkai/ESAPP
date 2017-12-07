/**
 * related to grid.ui
 * 
 * @Author : 18810151774
 * @Timestamp : 2017-12-07
 */
var page = sm("do_Page");

var app      = sm("do_App");
var rootView = ui("$");
var title = ui("title");
var typeName = ui("type_name");
var couponBg = ui("coupon_bg");
rootView.on("dataRefreshed",function(d){
	title.text = d.title;
	var bgnum = d.num%4+1;
	couponBg.bgImage = "source://image/system/coupon_bg_"+bgnum+".png";
	d.type == "minus" ? typeName.text = "元" : typeName.text = "折";
})