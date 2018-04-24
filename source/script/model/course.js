/**
 * New DeviceOne File
 */
var d = require("deviceone");
var common = require("util/common");
var edusoho = require("util/edusoho");
var http = require("util/http");
var nf = d.sm("do_Notification");
var config = require("config/config");
var dataCache = d.sm("do_DataCache");
var storage = d.sm("do_Storage");
module.exports.getCourseSetDetail = getCourseSetDetail;
module.exports.getCourseItem = getCourseItem;
module.exports.cacheVideo = cacheVideo;

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
function cacheVideo(courseID,taskID,m3u8Url,callback){
	if(!dataCache.hasData("videoCache")){
		var videoCache = {
				videoNum:0,
				videoSize:0,
				videoData:[]
		}
		dataCache.saveData("videoCache",videoCache);
	}
	var cacheVideo = dataCache.loadData("videoCache");
	cacheVideo.videoData[courseID] = [];
	cacheVideo.videoData[courseID][taskID] = [];
	cacheVideo.videoData[courseID][taskID].m3u8Url = m3u8Url;
	var downloadId = "video|"+courseID+"|"+taskID;
	var reg1=new RegExp("[0-9a-zA-z-]*.m3u8");
	var fileName = reg1.exec(m3u8Url);
	var path = "data://videoCache/"+courseID+"/"+taskID+"/"+fileName;
	d.print(path);
	//nf.alert("path:"+path);
	downloadFile(m3u8Url,path,downloadId, function(fileData) {
		storage.readFile(path, function(m3u8Data, e) {
			m3u8Data = JSON.stringify(m3u8Data);
			//nf.alert(m3u8Data);
			//解析TS
			
			//下载TS
			
		})
	})
}

function downloadFile(m3u8Url,downloadPath,downloadId,callBack){
	var http = d.mm("do_Http");
	http.url = m3u8Url;
	http.download1(downloadPath, downloadId, true);
	http.on("result", function(data) {
		callBack(data);
	}).on("fail",function(data){
		
	});
}