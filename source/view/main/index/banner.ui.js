/**
 * related to banner.ui
 * 
 * @Author : 18810151774
 * @Timestamp : 2017-12-04
 */
var page = sm("do_Page");
var app      = sm("do_App");

var rootView = ui("$");
var bannerImage = ui("banner_image");

rootView.on("dataRefreshed",function(d){
	bannerImage.source = d.url;
	
})