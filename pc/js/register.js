/**
 * Created by Administrator on 2016/10/27 0027.
 */
$(function () {
    /**声明*/
    $(".sure").find("i").on("click", sel_radio);
    /**手机号*/
    $(".user_tel").focus(function () {
        if (isNaN($(this).val())) {
            $(this).val("");
        }
    });
    $(".user_tel").on("blur", user_tel);

    /**验证码*/
    $(".yzm_btn").on("click",yzm_btn);
    $(".yzm_text").focus(function () {
        if (isNaN($(this).val())) {
            $(this).val("");
        }
    });

    $(".yzm_text").on("blur", yzm_blur);
    /**密码1*/
    $(".user_password1").focus(function () {
        if ($(this).val() == "设置6-16位密码") {
            $(this).attr("type", "password").val("");
        }
    });
    $(".user_password1").on("blur", user_password1);

    /**密码2*/
    $(".user_password2").focus(function () {
        if ($(this).val() == "请再次输入确认密码") {
            $(this).attr("type", "password").val("");
        }
    });
    $(".user_password2").on("blur", user_password2);
    /**注册*/
    $(".register_btn").on("click", register_btn);
});
/**------------------------方法*/
/**注册*/
function register_btn() {
    $(".user_tel").trigger("blur");
    $(".yzm_text").trigger("blur");
    $(".user_password1").trigger("blur");
    $(".user_password2").trigger("blur");
    var tel = $(".user_tel").val().trim();
    var pass = $(".user_password2").val().trim();
    if($(".register_btn").text()=="注册"){
        var k=/^(13[0-9]|14[579]|15[012356789]|17[0135678]|18[0-9])\d{8}$/.test(tel) && /^[0-9A-Za-z]{6,16}$/.test(pass) && $(".sure i").hasClass("sel_radio");
    }else {
        k=/^(13[0-9]|14[579]|15[012356789]|17[0135678]|18[0-9])\d{8}$/.test(tel) && /^[0-9A-Za-z]{6,16}$/.test(pass);
    }
    if (k) {
        /**ajax*/
        /*提交手机号密码跳转*/
        alert(1);
    }
}
/**声明*/
function sel_radio() {
    $(this).toggleClass("sel_radio")
}
/**验证手机号*/
function user_tel() {
    if ($(this).val().trim() == "请输入手机号" || $(this).val().trim() == "") {
        $(this).val("请输入手机号");
    } else {
        var tel = $(".user_tel").val().trim();
        if (!/^(13[0-9]|14[579]|15[012356789]|17[0135678]|18[0-9])\d{8}$/.test(tel)) {
            $(".yzm").append("<span class='msg_tel'>您填写的手机号格式有误</span>");
            $(".user_tel").off("blur", user_tel);
            setTimeout(function () {
                $(".user_tel").on("blur", user_tel);
                $(".msg_tel").remove();
            }, 2000);
        }
    }
}
/**发送验证码*/
function yzm_btn(){
    $(".yzm_btn").off("click",yzm_btn);
    /**ajax发送验证码*/
$(this).addClass("yzm_btn2");
    var k=90;
    tt();
    function tt(){
        $(".yzm_btn").text("重新发送("+k+"s)");
        k--;
        if(k<0){
            $(".yzm_btn").on("click",yzm_btn).text("获取动态验证码");
            $(".yzm_btn").removeClass("yzm_btn2");
            return;
        }
        setTimeout(tt,1000);
    }

}
/**验证码框失去焦点*/
function yzm_blur() {
    if ($(this).val().trim() == "请输入验证码" || $(this).val().trim() == "") {
        $(this).val("请输入验证码");
    } else {
        /**ajax*/
        /**提示信息*/
        yzm("true");

    }
}
/**验证码*/
function yzm(or) {

    if (or == false) {
        $(".yzm").append("<span class='msg_btn1'>您填写的验证码错误</span>");
        $(".yzm_text").off("blur", yzm_blur);
        setTimeout(function () {
            $(".yzm_text").on("blur", yzm_blur);
            $(".msg_btn1").remove();
        }, 2000);
    }
}
/**密码1*/
function user_password1() {
    if ($(this).val().trim() != "设置6-16位密码" && $(this).val().trim() != "") {
        var pass = $(".user_password1").val().trim();
        if (!/^[0-9A-Za-z]{6,16}$/.test(pass)) {
            $(".yzm").append("<span class='msg_word1'>密码只能是6-16位数字或字母</span>");
            $(".user_password1").off("blur", user_password1);
            setTimeout(function () {
                $(".user_password1").on("blur", user_password1);
                $(".msg_word1").remove();
            }, 2000);
        }
    } else {
        $(this).attr("type", "text").val("设置6-16位密码");
    }
}
/**密码2*/
function user_password2() {
    if ($(this).val().trim() != "请再次输入确认密码" && $(this).val().trim() != "") {
        var pass1 = $(".user_password1").val().trim();
        var pass2 = $(".user_password2").val().trim();
        if (pass1 != pass2) {
            $(".yzm").append("<span class='msg_word2'>两次密码不一致</span>");
            $(".user_password2").off("blur", user_password2);
            setTimeout(function () {
                $(".user_password2").on("blur", user_password2);
                $(".msg_word2").remove();
            }, 2000);
        }
    } else {
        $(this).attr("type", "text").val("请再次输入确认密码");
    }
}