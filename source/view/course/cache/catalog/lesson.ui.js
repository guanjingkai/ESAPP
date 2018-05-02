/**
 * related to catalog_lesson.ui
 * 
 * @Author : 18810151774
 * @Timestamp : 2017-11-14
 */
var app = sm("do_App");
var page = sm("do_Page");
var Algorithm = sm("do_Algorithm");
var config	 = require("config/config");
var http     = require("util/http");
var edusoho  = require("util/edusoho");
var course  = require("model/course");

var nf = sm("do_Notification");
var rootView = ui("$");
var itemBox = ui("item_box");
var lessonItem = ui("lesson_item");
var lessonTitle = ui("lesson_title");
var lessonNum = ui("lesson_num");
var lessonTime = ui("lesson_time");
var chapterItem = ui("chapter_item");
var chapterTitle = ui("chapter_title");
//var lessonIcon = ui("lesson_icon");
var chapterNum = ui("chapter_num");
var itemBox = ui("item_box");
var courseID = 0;
var taskID = 0;
rootView.on("dataRefreshed",function(d){
	
	if(d.type == "chapter"){
		itemBox.bgColor = "F3F3F3FF";
		chapterItem.visible = true;
		lessonItem.visible = false;
		chapterTitle.text = d.title;
		chapterNum.text = "第"+d.number+"章";
	}else{
		itemBox.bgColor = "00000000";
		chapterItem.visible = false;
		lessonItem.visible = true;
		lessonTitle.text = d.title;
		lessonNum.text = "第"+d.number+"课";
		lessonTime.text = getMS(d.task.length);
		courseID = d.courseID;
		taskID = d.task.activity.id;
		//lessonIcon.source = "source://image/video_wait.png";
		if(d.task.hasOwnProperty("result")){
			if(d.task.result.hasOwnProperty("status")){
				if(d.task.result.status == "finish"){
					//lessonIcon.source = "source://image/video_finish.png";
				}else if(d.task.result.status == "start"){
					//lessonIcon.source = "source://image/video_start.png";
				}
			}
		}
	}
	
})
var getMS = function(times){
	var mm = Math.floor(times / 60);
	var ss = ('00'+Math.floor(times % 60)).slice(-2);
	if((mm + "").length < 2){
		mm = ('00'+mm).slice(-2)
	}
	return mm+":"+ss;
}
itemBox.on("touch",function(){
	//获取课程详情
	if(taskID > 0){
		var apiName = "/api/lessons/"+taskID;
		http.get(apiName,{},function(data){
			data = JSON.parse(data);
			if(edusoho.isResponseError(data,apiName)){
				var apiName2 = "/video/info";
				http.post(apiName2,{
					id:taskID
				},function(videoInfo){
					videoInfo = JSON.parse(videoInfo);
					var cover = videoInfo.data.VideoBase.CoverURL;
					var m3u8url = "";
					var maxheight = 0;
					for(var i = 0; i < videoInfo.data.PlayInfoList.PlayInfo.length;i++){
						if(videoInfo.data.PlayInfoList.PlayInfo[i].Height > maxheight){
							m3u8url = videoInfo.data.PlayInfoList.PlayInfo[i].PlayURL;
						}
					}
					//下载m3u8
//					course.cacheVideo(courseID,taskID,m3u8url,function(){
//						
//					});
					course.downloadMp4("https://hls.chungold.com/eea8424fec27483391d0b45266bd08ec/1fda1119f48d4311b9eff7062d8737f8-6033ce7f75a44881181768b0d955fc83-od-S00000001-200000.mp4", "data://videoCache/test.mp4", "123333", function() {
						deviceone.print("文件是否下载");
					})
				},{
					server:"esp"
				});
			}
		},{
			token:true
		});
	}
});