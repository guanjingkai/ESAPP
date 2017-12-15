/**
 * New DeviceOne File
 */
var d = require("deviceone");
var common = require("util/common");
var edusoho = require("util/edusoho");
var http = require("util/http");
var config = require("config/config");
module.exports.getCourseSetDetail = getCourseSetDetail;
module.exports.getCourseItem = getCourseItem;

function getCourseSetDetail (courseSetID,callBack) {
	var apiName = "/api/course_sets/" + courseSetID + "/courses";
	http.get(apiName, {}, function(data) {
		data = JSON.parse(data);
		if (edusoho.isResponseError(data,apiName)) {
			callBack(data);
		}
	}, {
		accept : "v2",
		token:true
	});
}
function getCourseItem (courseID,callback){
	var apiName = "/api/courses/"+courseID+'/items';
	http.get(apiName,{},function(data){
		data = JSON.parse(data);
		if(edusoho.isResponseError(data,apiName)){
			callback(data);
		}
	},{
		accept:"v2"
	});
}