$(function(){
	$(".nav li").on("click",nav_fn);
	$(".reg_btn").on("click",reg_btn);
	$(".login_btn1").on("click",login_btn1);
	$(".login_btn2").on("click",login_btn2);
	$(".yzm_btn").on("click",yzm_btn);
	$(".the_tel").on("input propertychange",tel_change);

});
/**导航切换*/
function nav_fn(){
	$(".nav li").removeClass("sel_li");
	$(this).addClass("sel_li");
	if($(this).index()==0){
		$(".yzm_warp").hide();
		$(".password_warp").show();
	}else{
		$(".password_warp").hide();
		$(".yzm_warp").show();
	}
}
/**注册*/
function reg_btn(){
	flag_pw=flag_pw2=flag_yzm=0;
	var tel=$(".the_tel").val();
	var pw1=$(".the_pw1").val().Nospace();
	pw_or(pw1);
	var pw2=$(".the_pw2").val().Nospace();
	pw2_or(pw1,pw2);
	var yzm=$(".the_yzm1").val().Nospace();
	yzm_or(yzm);
	if(flag_pw==1&&flag_pw2==1&&flag_yzm==1){
			$(".loading_pic,.mask").show();
	$.ajax({
            type: "POST", //GET
            url: "success.json",
            data: {
            	"tel":tel,
            	"pw":pw1,
            	"yzm":yzm
            }, //组装参数
            dataType: "json",
            success: function (data) {
            	$(".loading_pic,.mask").hide();
            	$(".main").html('<p class="success_ts">'+data.returnMsg+'</p>');

            },
            error: function (data) {}
        });

	}

}
/**login_btn1*/
	var flag_pw=flag_pw2=flag_yzm=0;
function login_btn1(){
	flag_pw=0;
	var tel=$(".the_tel").val();
	var pw=$(".the_pw").val().Nospace();
	pw_or(pw);
	if(flag_pw==1){
	$(".loading_pic,.mask").show();
	$.ajax({
            type: "POST", //GET
            url: "success.json",
            data: {
            	"tel":tel,
            	"pw":pw
            }, //组装参数
            dataType: "json",
            success: function (data) {
            	$(".loading_pic,.mask").hide();
            	$(".main").html('<p class="success_ts">'+data.returnMsg+'</p>');

            },
            error: function (data) {}
        });

	}
}
/**login_btn2*/
function login_btn2(){
	flag_yzm=0;
	var tel=$(".the_tel").val();
	var yzm=$(".the_yzm2").val().NoSpace();
	yzm_or(yzm);
	if(flag_yzm=1){
		$(".loading_pic,.mask").show();
	$.ajax({
            type: "POST", //GET
            url: "success.json",
            data: {
            	"tel":tel,
            	"yzm":yzm
            }, //组装参数
            dataType: "json",
            success: function (data) {
            	$(".loading_pic,.mask").hide();
            	$(".main").html('<p class="success_ts">'+data.returnMsg+'</p>');
            },
            error: function (data) {}
        });
	
	}
}
/**发送验证码*/
function yzm_btn(){
	$.ajax({
            type: "POST", //GET
            url: "data.json",
            dataType: "json",
            success: function (data) {
            	$(".yzm_btn").text("发送成功");
            	$(".yzm_btn").off("click",yzm_btn);
            	yan_time();

            },
            error: function (data) {
            }
        });

}
/*验证倒计时*/
var time_yzm = "";
function yan_time() {
	var k = 89;
	clearInterval(time_yzm);
	time_yzm = setInterval(function () {
		if (k == 0) {
			$(".yzm_btn").text("重新发送");
			$(".yzm_btn").on("click",yzm_btn);
			clearInterval(time_yzm);
			return;
		}
		$(".yzm_btn").text("（"+k-- + "）秒后重发");
	}, 1000)
}

/**tel_change*/
function tel_change(){
	var val=$(this).val();
	tel_or(val);
}
/**验证*/
function tel_or(val){
	if(val.length==11){
		if (!/^(13[0-9]|14[579]|15[012356789]|17[0135678]|18[0-9])\d{4}\d{4}$/.test(val)){
			msg_show1("手机号格式有误");
			$(".register_warp,.reg_over,.nav").hide();
			$(".yzm_btn").text("重新发送");
			$(".yzm_btn").on("click",yzm_btn);
			clearInterval(time_yzm);
			return;
		}else{
			$(".loading_pic,.mask").show();
			$.ajax({
            type: "POST", //GET
            url: "tel.json",
            data: {
            	"tel":val
            }, //组装参数
            dataType: "json",
            success: function (data) {
            	$(".loading_pic,.mask").hide();
            	if(data.returnCode==1){
            		if(data.returnMsg.memberState!=1){
            			$(".register_warp").show();
            		}else{
            			$(".reg_over,.nav").show();
            			$(".nav li").eq(0).trigger("click");
            		}
            	}else{
            		msg_show1("请输入正确手机号");
            	}
            },
            error: function (data) {
            }
        });
		}

	}else{
		$(".register_warp,.reg_over,.nav").hide();
		$(".yzm_btn").text("重新发送");
		$(".yzm_btn").on("click",yzm_btn);
		clearInterval(time_yzm);
	}
}
function pw_or(val){
	if(val.length<6||val.length>12){
		msg_show1("密码超出6-12限制");
		flag_pw=0;
	}else{
		flag_pw=1;
	}
}
function pw2_or(val1,val2){
	if (val1!=val2) {
		msg_show1("两次密码不一致");
		flag_pw2=0;
	}else{
		flag_pw2=1;
	}
}

function yzm_or(val){
	if(val.length==0){
		msg_show1("验证码不能为空");
		flag_yzm=0;
	}else{
		flag_yzm=1;
	}
}