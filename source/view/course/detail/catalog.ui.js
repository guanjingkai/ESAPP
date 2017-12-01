/**
 * related to catalog.ui
 * 
 * @Author : 18810151774
 * @Timestamp : 2017-11-09
 */
var nf = sm("do_Notification");
var app = sm("do_App");
var page = sm("do_Page");
var config = require("config");
var http     = require("http_util");
var edusoho  = require("edusoho_util");
var courseID = "";
var rootView = ui("$");
var catalogData = mm("do_ListData");
var catalogList = ui("catalog_list");
catalogList.bindItems(catalogData);

rootView.on("dataRefreshed",function(d){
	courseID = d.courseID;
	getCourseInfo();
	
})
var getCourseInfo = function(){
	var apiName = "/api/courses/"+courseID+'/items';
	http.get(apiName,{},function(data){
		data = JSON.parse(data);
		if(edusoho.isResponseError(data)){
			setMapping(data)
		}
	},{
		accept:"v2"
	});
}
var setMapping = function(data){
    catalogData.addData(data);
    catalogList.refreshItems();
}