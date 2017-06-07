/**
 * Created by Administrator on 2016/10/27 0027.
 */
$(function () {
    /**手机号*/
    $(".user_tel").focus(function () {
        if (isNaN($(this).val())) {
            $(this).val("");
        }
        $(this).blur(function () {
            if ($(this).val().trim() == "请输入手机号" || $(this).val().trim() == "") {
                $(this).val("请输入手机号");
            }
        });

    });
    /**密码*/
    $(".user_password").focus(function () {
        if ($(this).val() == "请输入密码") {
            $(this).attr("type", "password").val("");
        }
        $(this).blur(function () {
            if ($(this).val().trim() != "请输入密码" && $(this).val().trim() != "") {
            } else {
                $(this).attr("type", "text").val("请输入密码");
            }
        });
    });
    $(".login_btn").on("click",login_btn);
});
function login_btn(){

    var tel=$(".user_tel").val().trim();
    var pass=$(".user_password").val().trim();
    if (/^(13[0-9]|14[579]|15[012356789]|17[0135678]|18[0-9])\d{8}$/.test(tel)) {
        if (/^[0-9A-Za-z]{6,16}$/.test(pass)){
            /**发送ajax*/
        }else {
            show_login("pass");
        }
    }else {
        show_login("tel");
    }
}
function show_login(msg){
    var m='';
    if(msg=="tel"){
        m="手机号";
    }else if (msg=="pass"){
        m="密码";
    }
        $(".login_btn").append("<span class='msg_btn'>您填写的"+m+"格式有误</span>");
        $(".login_btn").off("click", login_btn);
        setTimeout(function () {
            $(".msg_btn").remove();
            $(".login_btn").on("click",login_btn);
        }, 2000)


}