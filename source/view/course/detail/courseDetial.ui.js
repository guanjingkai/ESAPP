/**
 * related to courseDetial.ui
 * 
 * @Author : 18810151774
 * @Timestamp : 2017-11-05
 */
//Require System Lib
var nf = sm("do_Notification");
var app = sm("do_App");
var page = sm("do_Page");
var animation = mm("do_Animation");
var timer = mm("do_Timer");
var timerMask = mm("do_Timer");
//Require util
var config = require("config/config");
var http = require("util/http");
var edusoho = require("util/edusoho");
//Require Model
var course = require("model/course");
//Bind UI
var courseSetID = "";
var courseID = "";
var courseInfo = {};
var courseItem = [];
var courseJoin = ui("course_join");
var courseMask = ui("course_mask");
var courseCover = ui("course_cover");
var courseTab = ui("course_tab");
var courseHeader = ui("course_header");
var courseMain = ui("course_main");
var coursePrice = ui("course_price");
var btnClose = ui("btn_close");
var toolbarNobuy = ui("toolbar_nobuy");
var topShare = ui("top_share");
var topDownload = ui("top_download");
var toolbarLine = ui("toolbar_line");
var toolbarLine2 = ui("toolbar_line2");
var toolbarStar = ui("toolbar_star");
var courseTabData = mm("do_ListData");
var courseMainData = mm("do_ListData");

var data = page.getData();
if (data.course == "" || data.course == null || !data.hasOwnProperty("course")) {
	nf.alert("APP异常 课程ID为空");
} else {
	courseSetID = data.course;
	courseCover.source = data.cover;
}
/** loading******************************************************** */

var loadingPageTimer = mm("do_Timer");

var loadingPage = ui("loading_page");
var loadingEnd = 0;

app.on("closeLoadingPage",function(d){
	loadingPageTimer.delay = 1000;
	loadingPageTimer.interval = 100;
	loadingPageTimer.on("tick", function() {
		if(loadingPage.visible == false){
			loadingPageTimer.stop();
			loadingPage.visible = false;
		}
		loadingPage.visible = false;
	});
	loadingPageTimer.start();
	
});
/** 页面tab交互动画******************************************************** */
btnClose.on("touch", function() {
	app.closePage();
});

var change_tab = function(index) {
	var data = [{template : 0,name : "介绍",fontColor : "C0C0C0FF",lb : false}, 
	            {template : 0,name : "目录",fontColor : "C0C0C0FF",lb : false}, 
	            {template : 0,name : "评价",fontColor : "C0C0C0FF",lb : false}];
	data[index].fontColor = "FF3C62FF";
	data[index].lb = true;
	return data;
}
courseTabData.addData(change_tab(0));

var getCourseInfo = function(courseSetID){
	course.getCourseSetDetail(courseSetID,function(courseSetDetail){
		courseID = courseSetDetail[0].id;//不考虑多计划
		courseInfo = courseSetDetail[0];
		if(courseInfo.price > 0){
			coursePrice.fontColor = "FF3C62FF";
			courseJoin.bgColor = "FF3C62FF";
			toolbarLine.bgColor = "FFCDD7FF";
			toolbarLine2.bgColor = "FFCDD7FF";
			toolbarStar.iconColor = "FF3C62FF";
			coursePrice.text = "￥"+courseInfo.price;
		}else{
			coursePrice.text = "免费课程";
			courseJoin.bgColor = "5FD584FF";
			coursePrice.fontColor = "5FD584FF";
			toolbarLine2.bgColor = "AAEABEFF";
			toolbarLine.bgColor = "AAEABEFF";
			toolbarStar.iconColor = "5FD584FF";
		}
		
		course.getCourseItem(courseID,function(itemData) {
			courseItem = itemData;
			courseMainData.addData([
			    {template : 0,name : "介绍",courseSetID : courseSetID,courseInfo:courseInfo},
				{template : 1,name : "目录",itemData : courseItem}, 
				{template : 2,name : "评价",courseSetID : courseSetID}
			]);
			courseMain.bindItems(courseMainData);
			//判断课程权限
			if(courseInfo.access.code == "member.member_exist"){
				topDownload.visible = true;
				topShare.visible = false;
				courseTabData.removeAll();
				courseTabData.addData(change_tab(1));
				courseTab.refreshItems();
				courseMain.set({
					index : 1
				});
			}else{
				toolbarNobuy.visible = true;
			}
			courseMain.refreshItems();
		})
		app.fire("closeLoadingPage");
	});
	
}
getCourseInfo(courseSetID);
courseTab.bindItems(courseTabData);
courseTab.refreshItems();
courseTab.on("indexChanged", function(index) {
	courseTabData.removeAll();
	courseTabData.addData(change_tab(index));
	courseTab.refreshItems();
	courseMain.set({
		index : index
	});
	courseMain.refreshItems({});
});
courseMain.on("indexChanged", function(index) {
	// courseTab.index = index;
	courseTabData.removeAll();
	courseTabData.addData(change_tab(index));
	courseTab.refreshItems();
});
/** ******************************************************** */
animation.fillAfter = true;
animation.scale({
	delay : 0,
	duration : 600,
	curve : 4,
	repeatCount : 1,
	autoReverse : false,
	scaleFromX : 1,
	scaleFromY : 1,
	scaleToX : 15,
	scaleToY : 15,
	pivotX : 0.5,
	pivotY : 0.5
}, "a1");
courseJoin.on("touch", function() {
	var orderInfo = 1;
	deviceone.print("点击支付");
	timer.stop();
	if(courseInfo.access.code == "success"){
		courseMask.visible = true;
		var timerNum = 1;
		timer.on("tick", function() {
			if(timerNum == 1){
				timer.stop();
				timerNum ++;
				orderInfo.cover = courseInfo.courseSet.cover;
				orderInfo.studentNum = courseInfo.courseSet.studentNum;
				deviceone.print("支付去了"+orderInfo);
				app.openPage({
			    	source: "source://view/order/create/create_order.ui",
			    	statusBarState: "show",
			    	statusBarFgColor:"white",
			    	statusBarBgColor:"FF3C62FF",
			    	animationType:"fade",
			    	data:{
			    		targetType:"course",
			    		courseID:courseID,
						courseSetID:courseSetID,
						cover : courseInfo.courseSet.cover,
						studentNum : courseInfo.courseSet.studentNum
			    	}
			    });	
				timerMask.on("tick", function() {
					if(timerNum == 2){
						//courseMask.visible = false;
					}
				});
			}
			
					
		})
		timer.delay = 300;
		timer.interval = 10000;
		//timerMask.delay = 1000;
		//timerMask.interval = 10000;
		courseMask.animate(animation);
		//开始逻辑
		timer.start();
		
	}else{
		nf.alert(courseInfo.access.msg);
	}
	
})
topDownload.on("touch",function(){
	app.openPage({
    	source: "source://view/course/cache/courseCache.ui",
    	statusBarState: "show",
    	statusBarFgColor:"white",
    	statusBarBgColor:"FF3C62FF",
    	animationType:"slide_b2t",
    	data:{
    		targetType:"course",
    		courseID:courseID,
			courseSetID:courseSetID,
			cover : courseInfo.courseSet.cover,
			itemData : courseItem
    	}
    });
});
/** ******************************************************** */
var videoPlayer = ui("player");
var playButton = ui("play");
var loading = ui("loading");
var loadingBg = ui("loadingBg");
var loadingTimer = mm("do_Timer");
//videoPlayer.setControlVisible(false);
/***********************************************************/
playButton.on("touch",function(){
	if(videoPlayer.isPlaying()){
		videoPlayer.pause();
		playButton.text = "开始";
	}else{
		videoPlayer.resume();
		playButton.text = "暂停";
	}
});
app.on("doPlayer",function(d){
	loading.startGif("source://image/loading2.gif",-1);
	if(loadingTimer.isStart()){
		
	}else{
		loading.visible = true;
		loadingBg.visible = true;
	    videoPlayer.visible = true;
		loadingTimer.delay = 1000;
		loadingTimer.interval = 50;
		loadingTimer.on("tick", function() {
			if(videoPlayer.isPlaying()){
				loading.visible = false;
				loadingBg.visible = false;
			    loadingTimer.stop();
			}
		});
		loadingTimer.start();
	}
	deviceone.print(d);
    videoPlayer.path = d;
    videoPlayer.play();
});
/** ******************************************************** */
page.on("back", function() {
	app.closePage();
});