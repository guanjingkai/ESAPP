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

var rootView = ui("$");
var itemBox = ui("item_box");
var lessonItem = ui("lesson_item");
var lessonTitle = ui("lesson_title");
var lessonNum = ui("lesson_num");
var lessonTime = ui("lesson_time");
var chapterItem = ui("chapter_item");
var chapterTitle = ui("chapter_title");
var chapterNum = ui("chapter_num");
var itemBox = ui("item_box");
var courseID = 0;
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
		courseID = d.task.activity.id;
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
	var apiName = "/api/lessons/"+courseID;
	http.get(apiName,{},function(data){
		data = JSON.parse(data);
		if(edusoho.isResponseError(data,apiName)){
			Algorithm.md5('string', config.esplusKey + data.mediaUri, function(data, e) {
				deviceone.print(data)
				var apiName2 = "/video/info";
				http.post(apiName2,{
					id:courseID
				},function(videoInfo){
					videoInfo = JSON.parse(videoInfo);
					var cover = videoInfo.data.VideoBase.CoverURL;
					var m3u8url = "";
					var maxheight = 0;
					for(var i = 0; i < videoInfo.data.PlayInfoList.PlayInfo.length;i++){
						deviceone.print(i);
						if(videoInfo.data.PlayInfoList.PlayInfo[i].Height > maxheight){
							m3u8url = videoInfo.data.PlayInfoList.PlayInfo[i].PlayURL;
						}
					}
					app.fire("doPlayer",m3u8url);
				},{
					server:"esp"
				});
			});
		}
	},{
		token:true
	});
});