/**
 * New DeviceOne File
 */
var d = require("deviceone");
var nf = d.sm("do_Notification");
var config = require("config/config");
var datacache= d.sm("do_DataCache");
var serverUrl = config.serivceUrl;
module.exports.post = post;
module.exports.get = get;
module.exports.resquestHttp = resquestHttp;

function resquestHttp(httpMethod,apiName,bodyData,callBack,thisConfig) {
	var http = d.mm("do_Http");
	var token = null;
	if(thisConfig == "" || thisConfig == null){
		thisConfig = config
	}else{
		serverUrl = config.serivceUrl;
		for(var key in thisConfig){
			if(key == "token" && thisConfig[key] != false){
				if(datacache.hasData("token")){
					var token = datacache.loadData("token");
					http.setRequestHeader("X-Auth-Token",token);
				}else{
					//nf.alert("请登录");
				}
				
			}else if(key == "accept" && thisConfig[key] != false){
				if(thisConfig[key] == "v2"){
					http.setRequestHeader("Accept","application/vnd.edusoho.v2+json");
				}
				
			}else if(key == "server" && thisConfig[key] != false){
				if(thisConfig[key] == "esp"){
					serverUrl = config.espUrl;
				}
				
			}else{
				config[key] = thisConfig[key]
			}
		}
		thisConfig = config
	}
	http.setRequestHeader("Accept-Encoding","gzip");
	http.setRequestHeader("User-Agent","okhttp/3.8.0");
	http.method            = httpMethod;
	http.url               = getUrl(serverUrl,apiName);
	http.body              = formatHttpBody(bodyData);
	http.contentType       = thisConfig.httpContentType;
	http.responseEncoding  = thisConfig.httpResponseEncoding;
	http.timeout           = thisConfig.httpTimeout;
	
	//是否缓存
	if(!datacache.hasData(apiName+JSON.stringify(bodyData)) || (thisConfig.hasOwnProperty("cache") && thisConfig['cache'] == 0)){
		//nf.alert("无缓存");
		http.request();
		http.on("result", function(data) {
			if(data.error){
				//todo
			}else{
				datacache.saveData(apiName+JSON.stringify(bodyData),{
					time:new Date().getTime(),
					data:data.data
				});
				callBack(data.data);
			}
		}).on("fail",function(data){
			//nf.alert("请求失败了"+JSON.stringify(data));
		});	
	}
	else
	{
		if(!thisConfig.hasOwnProperty("cache")){
			thisConfig['cache'] = 3600 * 1000;
		}
		if(datacache.hasData(apiName+JSON.stringify(bodyData)) && datacache.loadData(apiName+JSON.stringify(bodyData)).time+thisConfig['cache'] > new Date().getTime()){
			//nf.alert("有缓存未超时");
			callBack(datacache.loadData(apiName+JSON.stringify(bodyData)).data);
		}else{
			//nf.alert("有缓存超时了");
			//nf.alert(datacache.loadData(apiName+JSON.stringify(bodyData)).time+thisConfig['cache'] );
			//nf.alert(new Date().getTime() );
			http.request();
			http.on("result", function(data) {
				if(data.error){
					//todo
				}else{
					datacache.saveData(apiName+JSON.stringify(bodyData),{
						time:new Date().getTime(),
						data:data.data
					});
					callBack(data.data);
				}
			}).on("fail",function(data){
				//nf.alert("请求失败了"+JSON.stringify(data));
			});	
		}
	}
}
function post(apiName,data,callBack,thisConfig) {
	resquestHttp('post',apiName,data,callBack,thisConfig);
}
function get(apiName,data,callBack,thisConfig) {

	resquestHttp('get',apiName,data,callBack,thisConfig);
}
function formatHttpBody(jsonData){
	var bodyData = "";
	if(config.httpContentType == "application/x-www-form-urlencoded"){
		for(var key in jsonData){
			bodyData += key+"="+jsonData[key]+"&"
		}
	}else if(config.httpContentType == "application/json"){
		bodyData = jsonData
	}
	return bodyData;
}
function getUrl(serivceUrl,apiName){
	var reg = new RegExp("[a-zA-z]+://[^\s]*");
	if(reg.test(apiName)){
		return apiName
	}else{
		return serivceUrl+apiName;
	}
}