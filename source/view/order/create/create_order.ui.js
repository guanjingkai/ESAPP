/**
 * related to create_order.ui
 * 
 * @Author : 18810151774
 * @Timestamp : 2017-11-27
 */
var nf = sm("do_Notification");
var app = sm("do_App");
var page = sm("do_Page");
var config = require("config");
var http = require("http_util");
var pay = require("pay");
var edusoho = require("edusoho_util");
var courseInfo = ui("course_info");
var doPay = ui("do_pay");
var courseInfoData = mm("do_ListData");
var btnClose = ui("btn_close");
var couponBox = ui("coupon_box");
var pageData = page.getData();

//支付参数
var payType = "alipay";
var total_amount = 12;
nf.alert(pageData);
var orderInfo;
var apiName = "/api/order_info";
http.post(apiName,{
	targetType:pageData.targetType,
	targetId:pageData.courseID
},function(data){
	orderInfo = JSON.parse(data);
	if (edusoho.isResponseError(orderInfo,apiName)) {
		courseInfo.bindItems(courseInfoData);
		courseInfoData.addData([{
			cover : pageData.cover,
			studentNum : pageData.studentNum,
			title:orderInfo.title,
			targetId:orderInfo.targetId,
			targetType:orderInfo.targetType
		}]);
		courseInfo.refreshItems();
	}
	
},{
	accept:"v2",
	token:true
});
//当前课程可用优惠券
var thisCoupons = [];
var apiName = "/api/me/coupons";
http.get(apiName,{},function(data){
	data = JSON.parse(data);
	if (edusoho.isResponseError(data,apiName)) {
		for(var i = 0;i<data.length;i++){
			if(data[i].targetType == pageData.targetType && data[i].targetId == pageData.courseSetID){
				thisCoupons.push(data[i]);
			}
			//会员VIP券
		}
		couponBox.add("course_grid", "source://view/coupon/cell/grid.ui", 2);
	}
	
},{
	accept:"v2",
	token:true
});

doPay.on("touch",function(){
	var apiName = "/api/orders";
	http.post(apiName,{
		targetId:orderInfo.targetId,
		targetType:orderInfo.targetType
	},function(data){
		data = JSON.parse(data);
		if (edusoho.isResponseError(data,apiName)) {
			var apiName = "/api/pay_center";
			http.post(apiName,{
				orderId:data.id,
				targetId:orderInfo.targetId,
				targetType:orderInfo.targetType
			},function(data2){
				data2 = JSON.parse(data2);
				if (edusoho.isResponseError(data2,apiName)) {
					pay.getaway(payType, "123", data.sn, total_amount)
				}
			},{
				accept: "v2",
				token:true
			})
		}
	},{
		accept: "v2",
		token:true
	})
})
btnClose.on("touch", function() {
	app.closePage();
});
page.on("back", function() {
	app.closePage();
});