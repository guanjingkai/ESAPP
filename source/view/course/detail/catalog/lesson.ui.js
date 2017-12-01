/**
 * related to catalog_lesson.ui
 * 
 * @Author : 18810151774
 * @Timestamp : 2017-11-14
 */
var page = sm("do_Page");

var rootView = ui("$");
var itemBox = ui("item_box");
var lessonItem = ui("lesson_item");
var lessonTitle = ui("lesson_title");
var lessonNum = ui("lesson_num");
var lessonTime = ui("lesson_time");
var chapterItem = ui("chapter_item");
var chapterTitle = ui("chapter_title");
var chapterNum = ui("chapter_num");

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