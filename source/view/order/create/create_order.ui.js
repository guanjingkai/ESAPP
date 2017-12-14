/**
 * related to create_order.ui
 * 
 * @Author : 18810151774
 * @Timestamp : 2017-11-27
 */
var nf = sm("do_Notification");
var app = sm("do_App");
var page = sm("do_Page");

var config = require("config/config");
var http = require("util/http");
var pay = require("util/pay");
var edusoho = require("util/edusoho");

var courseInfo = ui("course_info");
var doPay = ui("do_pay");
var courseInfoData = mm("do_ListData");
var btnClose = ui("btn_close");
var couponBox = ui("coupon_box");
var couponGrid = ui('coupon_grid');
var couponGridData = mm("do_ListData");

couponGrid.bindItems(couponGridData);
var pageData = page.getData();

//支付参数
var payType = "alipay";
var total_amount = 12;
var orderInfo;
//获取当前支付内容详情
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
		//当前课程可用优惠券
		var thisCoupons = [];
		var couponNum= 1;
		var apiName = "/api/me/coupons";
		http.get(apiName,{},function(data2){
			data2 = JSON.parse(data2);
			
			if (edusoho.isResponseError(data2,apiName)) {
				for(var i = 0;i<data2.length;i++){
					if(data2[i].targetType == pageData.targetType && (data2[i].targetId == pageData.courseSetID || data2[i].targetId == 0)){
						if(data2[i].type == "minus"){
							data2[i].title = "本课程优惠券";
						}else if (data2[i].type == "discount") {
							data2[i].title = "本课程打折券";
						}
						data2[i].num = couponNum;couponNum++;
						thisCoupons.push(data2[i]);
					}else if (data2[i].targetType == "vip") {
						//会员VIP券
						if(data2[i].targetId > -1){
							if(data2[i].type == "minus"){
								data2[i].title = "全VIP优惠券";
							}else if (data2[i].type == "discount") {
								data2[i].title = "全VIP打折券";
							}
							data2[i].num = couponNum;couponNum++;
							thisCoupons.push(data2[i]);
						}else{
							var apiName = "/api/plugins/vip/vip_levels/"+data2[i].targetId;
							http.get(apiName,{},function(data3){
								data3 = JSON.parse(data3);
								if (edusoho.isResponseError(data3,apiName)) {
									if(data2[i].type == "minus"){
										data2[i].title = data3.name+"优惠券";
									}else if (data3[i].type == "discount") {
										data2[i].title = data3.name+"打折券";
									}
									data2[i].num = couponNum;couponNum++;
									thisCoupons.push(data2[i]);
									couponGridData.addData(thisCoupons);
									couponGrid.refreshItems();
								}
							},{
								accept:"v2",
								token:true
							});
						}
						
					}
				
				}
				couponGridData.addData(thisCoupons);
				couponGrid.refreshItems();
			}
			
		},{
			accept:"v2",
			token:true
		});
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
			var apiName = "/pay/aliapp";
			nf.alert(data);
			http.post(apiName,{
				sn:data.sn
			},function(data2){
				data2 = JSON.parse(data2);
				if (edusoho.isResponseError(data2,apiName)) {
					pay.getaway(payType, data2)
				}
			},{
				accept: "v2",
				server: "esp",
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