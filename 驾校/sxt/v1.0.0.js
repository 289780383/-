/**
 * 针对http://res.wx.qq.com/open/js/jweixin-1.0.0.js封装
 * 需要在jweixin-1.0.0.js之后加载
 * 可以定义回调函数
 * @param params 需要加载的功能，以及加载该功能的元素id集
 * {
 * 	'功能1，固定值':[id1,id2,……]
 * 	'功能2，固定值':[id1,id2,……]
 * }
 * 其中“功能”包括：scanQRCode1-直接返回结果的扫一扫接口，对应回调函数jweixin_scanCallBack(res)，res接收微信返回值
 * @usage
 * var jweixin_params={'scanQRCode1':['id1',……],……};
 * loadJweixin(jweixin_params);
 * function jweixin_scanCallBack(res){
 * 	//scanQRCode1的回调函数
 * 	alert('res:'+JSON.stringify(res));
 * }
 */
;var jweixin_g_url=encodeURI(location.href.split('#')[0]);
var jweixin_g_fortime=3,jweixin_g_fortime_t=0;
var jweixin_g_error=['invalid url domain','invalid signature','the permission value is offline verifying','permission denied','function not exist'];
var jweixin_g_error0='invalid signature';
function loadJweixin(params){
	//如果担心安全问题，这里修改为Controller内传递参数
	$.ajax({
        type: "GET",async: false,
        url: 'index.php?r=uservice/getjwxcfgs',
        data: {'url':jweixin_g_url},
        dataType: "json",
        beforeSend: function (XMLHttpRequest) {
        },
        success: function (data,textStatus) {
        	initJweixin(data,params);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        	alert('网络异常')
        }
    });
}
function initJweixin(jweixin_params,params){
	if(jweixin_g_fortime_t>=jweixin_g_fortime){
		alert('微信功能模块异常，请重新打开页面，如果仍无效请联系管理员！');
		return false;
	}
	if(jweixin_params['ifjweixin']=='1'){
		wx.config({    
			debug: false,    
			appId: jweixin_params['jweixin']['appid'],    
			timestamp: jweixin_params['jweixin']['timestamp'],    
			nonceStr: jweixin_params['jweixin']['noncestr'],    
			signature: jweixin_params['jweixin']['signature'],    
			jsApiList: [    
				'checkJsApi',
		        'onMenuShareTimeline',
		        'onMenuShareAppMessage',
		        'onMenuShareQQ',
		        'onMenuShareWeibo',
		        'hideMenuItems',
		        'showMenuItems',
		        'hideAllNonBaseMenuItem',
		        'showAllNonBaseMenuItem',
		        'translateVoice',
		        'startRecord',
		        'stopRecord',
		        'onRecordEnd',
		        'playVoice',
		        'pauseVoice',
		        'stopVoice',
		        'uploadVoice',
		        'downloadVoice',
		        'chooseImage',
		        'previewImage',
		        'uploadImage',
		        'downloadImage',
		        'getNetworkType',
		        'openLocation',
		        'getLocation',
		        'hideOptionMenu',
		        'showOptionMenu',
		        'closeWindow',
		        'scanQRCode',
		        'chooseWXPay',
		        'openProductSpecificView',
		        'addCard',
		        'chooseCard',
		        'openCard'
			]    
		});
		wx.ready(function () {
			if(typeof params['scanQRCode1'] !='undefined'){
				$.each(params['scanQRCode1'],function(i,n){
					document.querySelector('#'+n).onclick = function () {
						wx.scanQRCode({
							needResult: 1,
							desc: 'scanQRCode desc',
							success: function (res) {
//						        //'{"resultStr":"1234","errMsg":"scanQRCode:ok"}';
						        if(typeof jweixin_scanCallBack != "undefined" && $.isFunction(jweixin_scanCallBack)){
						        	jweixin_scanCallBack(res);
				                }
						    }
						});
					};
				});
			}
			/*
			 * 需要其它接口，在这里添加
			 */
		});
		wx.error(function (res) {
			if(res.errMsg==jweixin_g_error0){
				jweixin_g_fortime_t++;
				$.ajax({
			        type: "GET",async: false,
			        url: 'index.php?r=uservice/getjwxcfgs',
			        data: {'url':jweixin_g_url},
			        dataType: "json",
			        beforeSend: function (XMLHttpRequest) {
			        },
			        success: function (data,textStatus) {
			        	initJweixin(data,params);
			        },
			        error: function (XMLHttpRequest, textStatus, errorThrown) {
			        	alert('网络异常')
			        }
			    });
			}else{
				alert('配置异常，请联系管理员')
			}
		});
	}else{
		$.each(params,function(paramsi,paramsn){
			$.each(paramsn,function(i,n){
				document.querySelector('#'+n).onclick = function () {
					alert('商户暂未开启功能，敬请期待！')
				};
			});
		});
	}
}