String.prototype.endWith=function(s){//重新endWith方法
	if(s==null||s==""||this.length==0||s.length>this.length)
		return false;
	if(this.substring(this.length-s.length)==s)
		return true;
	else
		return false;
	return true;
}
String.prototype.startWith=function(s){//重写startWith方法
	if(s==null||s==""||this.length==0||s.length>this.length)
		return false;
	if(this.substr(0,s.length)==s)
		return true;
	else
		return false;
	return true;
}
/**
 * 引入此类，加载完毕后会自动获取微信用户信息
 * 也可以WXUtils.GetWxUserInfo()获取用户信息
 * 也可以通过window.localStorage.getItem("WXOAUTH2INFO")从缓存中获取
 **/
var WXUtils = {
	oauth2Url: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect",
	appid: "wxb2d8ca4d2e0217be",
	cacheTimeout: 1000 * 60 * 60 * 48, //48小时
	platfm: {
		runtimeEnv: "pro" //loc本地  tec 测试 pro 线上
	},
	baseDoMain_pro: 'http://shop.pinchengkeji.com/eoil',
	baseDoMain_tec: 'http://192.168.20.103:8080/eoil',
	baseDoMain_loc: 'http://localhost:8080/eoil',
	
	wechatUserUrl: "/rest/wechat/OAuth2/",
	getWechatUserUrl: function() {
		return (typeof Base == "undefined" ? this['baseDoMain_' + this.platfm.runtimeEnv] : Base['baseDoMain_' + Base.platfm.runtimeEnv]) + this.wechatUserUrl;
	},
	
	wechatSignUrl: "/rest/wechat/jsTicketSign",
	getWechatSignUrl: function() {
		return (typeof Base == "undefined" ? this['baseDoMain_' + this.platfm.runtimeEnv] : Base['baseDoMain_' + Base.platfm.runtimeEnv]) + this.wechatSignUrl;
	},
	
	tokenUrl: "/rest/auth/getToken",
	getTokenUrl: function() {
		return (typeof Base == "undefined" ? this['baseDoMain_' + this.platfm.runtimeEnv] : Base['baseDoMain_' + Base.platfm.runtimeEnv]) + this.tokenUrl;
	},
	
	checkToken: function() {
		this.httpRequest("GET" ,this.getTokenUrl(), false, {}, function(data) {
			data = JSON.parse(data);
			if (data.data.token != window.localStorage.getItem("AUTHTOKEN")) {
				window.localStorage.removeItem("WXOAUTH2INFO");
			}
			window.localStorage.setItem("AUTHTOKEN", data.data.token);
		});
	},
	
	//判断是否是微信浏览器
	isWeiXin: function() {
		var ua = window.navigator.userAgent.toLowerCase();
	    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
	        return true;
	    }else{
	        return false;
	    }
	},
	/**
	 * method: GET/POST
	 * url: url
	 * isAsync: 同步异步， boolean: true（异步）或 false（同步）
	 * param: 参数；格式： {"aa": "bb"}
	 * _callback function 回调函数
	 **/
	httpRequest: function(method, url, isAsync, param, _callback) {
		var str = "";
		if (param == null || typeof param == 'undefined') {
			param = {};
		} else {
			if ("POST" == method) {
				for (var prop in param) {
					str += (prop + "=" + param[prop] + "&");
				}
				param = str;
			}
		}
		var obj = new XMLHttpRequest();
        obj.open(method, url, isAsync);
        obj.setRequestHeader("Authorization", window.localStorage.getItem("sessionid"));
        if ("POST" == method.toUpperCase())
        	obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded;"); // 发送信息至服务器时内容编码类型
        obj.onreadystatechange = function () {
            if ((obj.readyState == "4") && (obj.status == "200" || obj.status == "304")) {  // 304未修改
            	_callback(obj.responseText);
            }
        };
        obj.send(param);
	},
	//微信获取用户信息
	WeChatOAuth2: function() {
		/**开发测试Start**/
		/*var userInfo = {"openId":"oLSeUv79ROl7c88dbEmDQ2EnJQ9k","nickname":"千寻","sex":2,"country":"CN","province":"Liaoning","city":"Shenyang","headImgUrl":"http://wx.qlogo.cn/mmopen/qlnpIUxflmIebGfIvzicFgnpIVeDdicuCo4M7ThxxChp90ELPzov9eQ4nUrKvSEOHMY4Hwj6qlxo08MqkhKxeLFZ7vehv7z6zc/0"};
		window.localStorage.setItem("WXOAUTH2INFO",JSON.stringify(userInfo));
		return userInfo;*/
		/**开发测试End**/
		var that_ = this;
		if (this.isWeiXin()) {
			var fullUrl = window.document.location.href;
			//拒绝授权
			if (that_.getParameter("code") == "authdeny") {
				return {"code": "0002", "message": "用户拒绝授权"};
			} else if (that_.isEmpty(that_.getParameter("code"))) {//非授权返回页面
				var wxUserInfo = window.localStorage.getItem("WXOAUTH2INFO");
				// TODU 判断授权超时
//				if (that_.isEmpty(wxUserInfo) || (new Date().getTime() - JSON.parse(wxUserInfo).authTime) > that_.cacheTimeout) {//微信未授权，或者授权超时
					var oauth2Url = WXUtils.oauth2Url.replace(/APPID/g, that_.appid).replace(/REDIRECT_URI/g, fullUrl);
					window.location.replace(oauth2Url);
					return false;
//				}
			} else {//授权返回
				return that_.GetWxUserInfo();
			}
		} else {
			return {"code": "0001", "message": "非微信浏览器"};//非微信登录返回空字符串“”，各端自己做判断
		}
	},
	//向微信获取用户信息
	GetWxUserInfo : function() {
		var that_ = this;
		var wxUserInfo = window.localStorage.getItem("WXOAUTH2INFO") || "";
		wxUserInfo = (wxUserInfo == "" || wxUserInfo == null) ? {} : JSON.parse(wxUserInfo);
		/*if (typeof wxUserInfo.authTime != 'undefined' && (new Date().getTime() - wxUserInfo.authTime) < that_.cacheTimeout) {//用户信息缓存有效期48小时
			//直接返回缓存中的用户信息，不重新取
			return wxUserInfo;
		}*/
		var httpResponse = {};
		this.httpRequest("GET" ,that_.getWechatUserUrl() + that_.getParameter("code"), false, {}, function(data) {
			httpResponse = data;
		});
		httpResponse = JSON.parse(httpResponse);
		if (httpResponse.code == "30001") {
			alert("获取用户信息失败");
			return {};
		} else if (typeof httpResponse.data.result == 'undefined' || httpResponse.data.result == "FAIL") {
			alert("获取用户信息失败");
			return {};
		}
		wxUserInfo = httpResponse.data.message;
		//更新登录信息
		if (typeof httpResponse.data.member != 'undefined' && httpResponse.data.member != null && httpResponse.data.member != "") {
			window.localStorage.setItem("login",true);
			window.localStorage.setItem("message",JSON.stringify(httpResponse.data.member));
		}
		wxUserInfo.authTime = new Date().getTime();
		window.localStorage.setItem("WXOAUTH2INFO", JSON.stringify(wxUserInfo));
		return wxUserInfo;
	},
	//微信JS—API签名
	weChatConfig: function(jsApiList) {
		var that_ = this;
		var nonceStr = WXUtils.randomString(32),
			timeStamp = new Date().getTime(),
			configUrl = window.location.href.split("#")[0];
		var param = {
				"noncestr" : nonceStr,
				"timeStamp" : timeStamp,
				"configUrl" : configUrl
		};
		var res = {};
		this.httpRequest("POST", this.getWechatSignUrl(), false, param, function(data) {
			res = data;
		});
		res = JSON.parse(res);
		if (res.code != "0000") {
			alert("请求失败: 不是0000： " + res.message);
			return false;
		}
		wx.config({
		    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		    appId: that_.appid, // 必填，公众号的唯一标识
		    timestamp: timeStamp, // 必填，生成签名的时间戳
		    nonceStr: nonceStr, // 必填，生成签名的随机串
		    signature: res.message,// 必填，签名，见附录1
		    jsApiList: jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
	},
	//微信扫码
	scanQRCode: function(_callback) {
		this.weChatConfig(['scanQRCode']);
		wx.ready(function() {
			wx.scanQRCode({
		        // 默认为0，扫描结果由微信处理，1则直接返回扫描结果
		        needResult : 1,
		        desc : 'scanQRCode desc',
		        success : function(res) {
		        	_callback(res);
		        }
		    });
		});
	},
	//微信支付,需要实现支付的页面在ready方法中执行此方法
	wechatPay: function(total_fee,msgBody,outTradeNo) {//传入参数  总金额， 订单描述， 订单号
		WXUtils.weChatConfig(['chooseWXPay']);
		if (typeof WeixinJSBridge == "undefined") {
			if (document.addEventListener) {
				document.addEventListener('WeixinJSBridgeReady', WXUtils.onBridgeReady(), false);
			} else if (document.attachEvent) {
				document.attachEvent('WeixinJSBridgeReady', WXUtils.onBridgeReady());
				document.attachEvent('onWeixinJSBridgeReady', WXUtils.onBridgeReady());
			}
		} else {
			WXUtils.onBridgeReady(total_fee,msgBody,outTradeNo);
		}
	},
	onBridgeReady: function(total_fee,msgBody,outTradeNo) {//微信支付传入方法
		var openid = JSON.parse(window.localStorage.getItem(Base.WECHAT_USER_INFO));
		var prepay_id;
		var sign;
		openid = openid.openId;
		var param = {
				"method" : "payTicket",
				"openid" : openid,
				"total_fee" : total_fee,
				"msgBody" : msgBody,
				"outTradeNo" : outTradeNo
		};
		this['httpRequest_' + this.platfm.frameEnv]("POST" ,"http://localhost:8080/eoil/rest/auth/getToken", param);
		var data = WXUtils.httpResponse;
		var res = JSON.parse(data);
		if (typeof res.error != "undefined") {//预支付支付失败
			alert("支付失败,请稍后再试");
//					Utils.closeOrder(outTradeNo);
			return false;
		}
		if (res.return_code == "FAIL") {
			alert(res.return_msg);
			//付款失败，则刷新页面
			setTimeout(function() {
				window.location.reload();
			}, 3000);
			return false;
		}
		//js调起微信支付
		wx.ready(function() {
			WeixinJSBridge.invoke('getBrandWCPayRequest', 
			{
				"appId" : res.appId.toString(), // 公众号名称，由商户传入
				"timeStamp" : res.timeStamp.toString(), // 时间戳，自1970年以来的毫秒数
				"nonceStr" : res.nonceStr.toString(), // 随机串
				"package" : res.package.toString(), //商户号
				"signType" : res.signType.toString(), // 微信签名方式：
				"paySign" : res.paySign.toString() // 微信签名
			}, function(res) {
					// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
				if (res.err_msg == "get_brand_wcpay_request:ok") {
					window.location.replace(Base.url.MINE_URL + "?func=orderlist&time=" + new Date().getTime());
				} else {
					//如果放弃付款或者付款失败，则刷新页面
					window.location.reload();
//							alert(res.err_msg);
				}
			});
		});
	},
	randomString: function(len) {
		len = len || 32;
		/****默认去掉了容易混淆的字符oOLl,9g,I1****/
		var $chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefhijkmnpqrstuvwxyz2345678';
		var maxPos = $chars.length;
		var pwd = '';
		for (var i = 0; i < len; i++) {
			pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
		}
		return pwd;
	},
	//js版本 request.getparameter();
	getParameter : function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
			return unescape(decodeURI(r[2]));
		return null;
	},
	isEmpty: function(str) {
		if (str == null || typeof str == 'undefined' || str == "" || str.toLocaleString() == "null") {
			return true;
		}
		return false;
	}
};

$(document).ready(function() {
	WXUtils.checkToken();
    WXUtils.WeChatOAuth2();
})

window.onload = function() {
	
}
export default WXUtils;