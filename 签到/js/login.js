$(function(){
	$(".nav li").on("click",nav_fn);
	$(".login_btn1").on("click",login_btn1);
	$(".login_btn2").on("click",login_btn2);
	$(".yzm_btn").on("click",yzm_btn);
	/**init*/
	$(".nav li").eq(0).trigger("click");
});
/**导航切换*/
function nav_fn(){
	$(".nav li").removeClass("sel_li");
	$(this).addClass("sel_li");
	if($(this).index()==0){
		$(".yzm_login").hide();
		$(".pw_login").show();
	}else{
		$(".pw_login").hide();
		$(".yzm_login").show();
	}
}
/**发送验证码*/
function yzm_btn(){
		var tel=$(".the_tel").val().NoSpace();
	tel_or(tel);
	var k=90;
	        $.ajax({
            type: "POST", //GET
            url: "data.json",
            data: {
            	"tel":tel
            }, //组装参数
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

/**login_btn1*/
function login_btn1(){
	var tel=$(".the_tel1").val().NoSpace();
	var pw=$(".the_pw").val().NoSpace();
	tel_or(tel);
	pw_or(pw);
	$.ajax({
		url: '/path/to/file',
		type: 'default GET (Other values: POST)',
		dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
		data: {param1: 'value1'},
	})
	.done(function() {
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
}
/**login_btn2*/
function login_btn2(){
	var tel=$(".the_tel2").val().NoSpace();
	var yzm=$(".the_yzm").val().NoSpace();
	tel_or(tel);
	yzm_or(yzm);
	$.ajax({
		url: '/path/to/file',
		type: 'default GET (Other values: POST)',
		dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
		data: {param1: 'value1'},
	})
	.done(function() {
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
}
/**验证*/
function tel_or(val){
	if (!/^(13[0-9]|14[579]|15[012356789]|17[0135678]|18[0-9])\d{4}\d{4}$/.test(val)){
		msg_show1("手机号格式有误");
		return;
	}
}
function pw_or(val){
	if(val.length<6||val.length>12){
		msg_show1("密码超出6-12限制");
		return;
	}
}
function yzm_or(val){
	if(val.length==0){
		msg_show1("验证码不能为空");
		return;
	}
}