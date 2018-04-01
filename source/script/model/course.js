/**
 * New DeviceOne File
 */
var d = require("deviceone");
var common = require("util/common");
var edusoho = require("util/edusoho");
var http = require("util/http");
var nf = d.sm("do_Notification");
var config = require("config/config");
module.exports.getCourseSetDetail = getCourseSetDetail;
module.exports.getCourseItem = getCourseItem;

function getCourseSetDetail (courseSetID,callBack) {
	var apiName = "/api/course_sets/" + courseSetID + "/courses";
	http.get(apiName, {}, function(data) {
		data = JSON.parse(data);
		if (edusoho.isResponseError(data,apiName) == "not_login") {
			nf.alert("没登录在发送一次不带token");
			//没登录在发送一次不带token
			http.get(apiName, {}, function(data) {
				data = JSON.parse(data);
				if (edusoho.isResponseError(data,apiName)) {
					callBack(data);
				}
			}, {
				accept : "v2",
				cache:0
			});
		}else if (edusoho.isResponseError(data,apiName)) {
			callBack(data);
		}
	}, {
		accept : "v2",
		token:true,
		cache:0
	});
}
function getCourseItem (courseID,callback){
	var apiName = "/api/courses/"+courseID+'/items?onlyPublished=1';
	http.get(apiName,{},function(data){
		data = JSON.parse(data);
		if(edusoho.isResponseError(data,apiName)){
			callback(data);
		}
	},{
		accept:"v2",
		token:true,
		cache:0
	});
}