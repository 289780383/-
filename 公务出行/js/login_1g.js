/**flag6用于判断未完成订单的个数*/
var flag6 = 0;
/**flag5用于判断登录时账号密码是否正确*/
var flag5 = true;
/**flag3验证手机号用户是否存在*/
var flag3 = true;
/**flag4验证码是否正确*/
var flag4 = true;
/**flag2用于判断用户现在的登录状态*/
var flag2 = true;

/*--------------------------*/
/**单击头像登录*/
function user_login(obj) {
    /**如果用户已经登录*/
    if (flag2) {
        $(".mask").show();
        $(".my_home").show();
    } else {
        $(".mask").show();
        $(".login").show();
        $(".login_tel").val("请输入手机号");
    }
}
/**大导航*/
function big_nav(obj) {
    $(obj).parent().find("p").removeClass("a_active");
    $(obj).find("p").addClass("a_active");
}

var tel_ = '';//手机号
//点击手机号输入框
function login_tel(obj) {
    $(obj).css("color", "#aaa");
    $(obj).val("");
    $(obj).focus();
    $(obj).parent().find(".login_btn").css("background-color", "#aaa");
    $(obj).parent().find(".login_btn").attr("disabled", "disabled");
}
/*手机号框失去焦点判断是否为空*/
function login_blur(obj) {
    if ($(obj).val() == "") {
        $(obj).val("请输入手机号");
    }
}
//点击关闭按钮
function close_login(obj) {
    $(".mask").hide();
    $(obj).parent().parent().hide();
    clearInterval(time_yzm);
}
//点击返回
function fanhui(obj) {
    $(obj).parent().parent().hide();
    $(".login").show();
    clearInterval(time_yzm);
}
//点击下一步
function tel_false(obj) {
    var val = $(obj).find(".login_tel").val().trim();
    /*if (val.length == 13) {*/
    if (/^(13[0-9]|14[579]|15[012356789]|17[0135678]|18[0-9])\s\d{4}\s\d{4}$/.test(val)) {
        var val_lo = val;
        $(".yan_tel").text(val);
        $(".yan").eq(0).focus();
        val = val.split(" ");
        var va = '';
        for (var i = 0; i < val.length; i++) {
            va += val[i];
        }
        tel_ = va;
        /**这里发起一个ajax请求如果有个这个手机号*/
        $.ajax({
            type: "POST", //GET
            url: "***.action",
            data: {
                user_tel: tel_
            }, //组装参数
            dataType: "json",
            success: function (data) {
                /**请求手机号是否存在*/
                tel_or(flag3);

            },
            error: function (data) {
                alert("手机号码请求失败long.js")
            }
        });
        /**以下一行为测试测试*/
        tel_or(flag3);

        function tel_or(flag3) {
            if (flag3) {
                $(".login_now .login_tel").val(val_lo);
                $(".login_now .login_tel").css("border-bottom", "1px solid #fd4e00");
                $(".login_now .login_tel").css("color", "#333");
                $(".login_now .set_pw,.login_now .set_pw2").css("border-bottom", "1px solid #d5d2d2");
                $(".login_now .set_pw,.login_now .set_pw2").css("color", "#aaa");
                $(".login_now .set_pw,.login_now .set_pw2").val("");
                $(".login_form img").attr("src", "images/eye_07.png");
                $(".login_now .set_pw").show();
                $(".login_now .set_pw2").hide();

                $(".pass_btn").attr("disabled", "disabled");
                $(".pass_btn").css("background-color", "#aaa");
                $(".login .login_btn").attr("disabled", "disabled");
                $(".login .login_btn").css("background-color", "#aaa");
                $(".login .login_tel").val("请输入手机号");
                $(".login .login_tel").css("color", "#aaa");
                $(".login .login_tel").css("border-bottom", "1px solid #d5d2d2");
                $(".login_now .pass_num").show();
                $(".login_yan .yzm").val("");
                $(".login").hide();
                $(".login_now").show();

                clearInterval(time_yzm);
            } else {
                $(".login").hide();
                $(".login_yan").show();
                $(".login_yan .yzm").val("");
                $(".login_yan .yzm").eq(0).focus();
                $(".yan_tel").text(val_lo);
                clearInterval(time_yzm);
                yan_time();
            }

        }

    } else {
        $(".login_form").find("p").show();
        setTimeout(function () {
            $(".login_form").find("p").hide();
        }, 3000);
        $(".login_form .login_tel").focus();
    }
}

/*验证倒计时*/
var time_yzm = "";
function yan_time() {
    var k = 89;
    clearInterval(time_yzm);
    time_yzm = setInterval(function () {
        if (k == 0) {
            $(".yan_btn").text("重新发送");
            $(".yan_btn").css("color", "#333");
            $(".yan_btn").removeAttr("disabled");
            $(".yan_btn").css("border", "1px solid #fd4e00");
            clearInterval(time_yzm);
            return;
        }
        $(".yan_btn").text(k-- + "秒后重发");
    }, 1000)
}

function send_yan(obj) {
    $(".yan_btn").attr("disabled", "disabled");
    $(".yan_btn").css("border", "1px solid #aaa");
    $(".yan_btn").css("color", "#aaa");
    $(".login_yan .yzm").val("");
    yan_time();
    /*用于重新发送验证码*/
}

//文档加载完毕执行的
$(function () {
    //监视键盘弹起事件
    $(".login_tel").keyup(function () {
        if ($(this).val().length == 3 || $(this).val().length == 8) {
            $(this).val($(this).val() + " ");
        }
        if ((/^(13[0-9]|14[579]|15[012356789]|17[0135678]|18[0-9]).*/.test($(this).val()))) {
            $(this).css("color", "#333");
            $(this).css("border-bottom", "1px solid #fd4e00");
            if ((/^(13[0-9]|14[579]|15[012356789]|17[0135678]|18[0-9])\s\d{4}\s\d{4}$/.test($(this).val()))) {
                $(this).parent().find(".login_btn").css("background-color", "#fd4e00");
                $(this).parent().find(".login_btn").removeAttr('disabled');
            } else {
                $(this).parent().find(".login_btn").css("background-color", "#aaa");
                $(this).parent().find(".login_btn").attr("disabled", "disabled");
            }
        } else {
            $(this).css("color", "#aaa");
            $(this).css("border-bottom", "1px solid #d5d2d2");
            $(this).parent().find(".login_btn").css("background-color", "#aaa");
            $(this).parent().find(".login_btn").attr("disabled", "disabled");
        }
    });

    /*验证码*/
    var re1 = /^\d{1}$/;
    var re2 = /^\d{2}$/;
    $(".yzm").keyup(function () {
        if ($(this).val().trim().length <= 2) {
            if (re1.test($(this).val().trim())) {
                $(this).next().focus();
                if ($(this).index() >= 3) {
                    $(this).blur();

                }
            } else if (re2.test($(this).val().trim())) {
                $(this).val($(this).val().trim().substr(1, 1));
                $(this).next().focus();
                if ($(this).index() >= 3) {
                    $(this).blur();
                }
            } else {
                $(this).val("");
            }
        } else {
            if (!isNaN($(this).val().trim())) {
                $(this).val($(this).val().trim().substr(1, 1));
            } else {
                $(this).val("");
            }

        }
    }).focus(function () {
        $(this).css("border", "1px solid #fd4e00")
    }).blur(function () {
        $(this).css("border", "");
    }).click(function () {
        $(this).val("");
    }).eq(3).blur(function () {

        /**-----------验证码最终输入的值----------*/
        var yan_shu = '';
        /*验证码的4位数*/
        for (var i = 0; i < $(".yzm").length; i++) {
            yan_shu += $(".yzm").eq(i).val().trim();
        }
        /*处理判断验证码是否正确
         * 发起一个ajax请求把数据传输到后台*/
        $.ajax({
            type: "POST", //GET
            url: "***.action",
            data: {
                yan_num: yan_shu   /**验证码在这里*/
            }, //组装参数
            dataType: "json",
            success: function (data) {
                /**请求手机号是否存在*/
                yan_or(flag4);

            },
            error: function (data) {
                alert("验证码请求失败long.js");
                /**我是测试别管我，测试结束删除以下一行*/
                yan_or(flag4);
            }
        });
    });
    /**验证码请求成功后*/
    function yan_or(flag4) {
        if (!flag4) {
            $(".login_yan p").show();
            setTimeout(function () {
                $(".login_yan p").hide();
                $(".yzm").val("");
            }, 3000);
        } else {
            $(".login_yan").hide();
            $(".set_pass").show();
            $(".login_form img").attr("src", "images/eye_07.png");
            $(".set_pass .set_pw").show();
            $(".set_pass .set_pw2").hide();
            $(".set_pass .set_pw,.set_pass .set_pw2").val("");
            $(".set_pass .set_pw,.set_pass .set_pw2").css("border-bottom", "1px solid #d5d2d2");
            $(".set_pass .pass_btn").attr("disabled", "disabled");
            $(".set_pass .pass_btn").css("background-color", "#aaa");
            $(".set_pass .pass_num").show();
            clearInterval(time_yzm);
        }

    }


    /*设置密码*/
    /*输入密码状态*/
    $(".set_pw2,.set_pw").keyup(function () {
        if ($(this).val().trim().length >= 6) {
            $(this).parent().find(".set_pw2,.set_pw").css("border-bottom", "1px solid #fd4e00");
            $(this).parent().find(".set_pw2,.set_pw").css("color", "#333");
            $(this).parent().find(".pass_btn").css("background-color", "#fd4e00");
            $(this).parent().find(".pass_btn").removeAttr("disabled");
        } else {
            $(this).parent().find(".set_pw2,.set_pw").css("border-bottom", "1px solid #d5d2d2");
            $(this).parent().find(".set_pw2,.set_pw").css("color", "#aaa");
            $(this).parent().find(".pass_btn").attr("disabled", "disabled");
            $(this).parent().find(".pass_btn").css("background-color", "#aaa");
        }
    });
    if (flag2) {
        $(".user_photo").attr("src", "images/index1_03.png");
        if (flag6 != 0) {
            $(".my_wwc").show();
            $(".wwc_badge").text(flag6);
        }

    }
});
/*文档加载结束*/
/*设置密码*/
function set_pass(obj) {
    $(obj).parent().find(".pass_num").hide();
}
/*单击密码框*/
function pass_num(obj) {
    $(obj).hide();
    $(".set_pw").focus();
}
/*密码框失去焦点*/
function pass_blur(obj) {
    if ($(obj).val() == "") {
        $(".login_now .pass_num").show();
    }

}
/*显示隐藏密码的眼睛*/
var eye = 0;
function eye_pass(obj) {
    if (eye == 0) {
        $(obj).parent().find(".set_pw2").val($(obj).parent().find(".set_pw").val());
        $(obj).parent().find(".set_pw").hide();
        $(obj).parent().find(".set_pw2").show();
        $(obj).attr("src", "images/eye1_07.png");
        eye = 1;
    } else {
        $(obj).parent().find(".set_pw").val($(obj).parent().find(".set_pw2").val());
        $(obj).parent().find(".set_pw").show();
        $(obj).parent().find(".set_pw2").hide();
        $(obj).attr("src", "images/eye_07.png");
        eye = 0;
    }
}
/*密码确认验证*/
function set_mm() {
    var mima = '';
    if ($(".set_pass .eye").attr("src") == "images/eye_07.png") {
        mima = $(".set_pass .set_pw").val();
    } else {
        mima = $(".set_pass .set_pw2").val();
    }
    if (/^[0-9A-Za-z]{6,16}$/.test(mima)) {
        /**处理带有空格的手机号*/
        var val = $(".yan_tel").text().trim().split(" ");
        var tel_zhen = '';
        for (var i = 0; i < val.length; i++) {
            tel_zhen += val[i];
        }
        if ($(".start_").val() == "") {
            /**这个是未提交乘车信息的只发送账号密码*/
            $.ajax({
                type: "POST", //GET
                url: "***.action",
                data: {
                    user_tel: tel_zhen,
                    password_set: mima
                }, //组装参数
                dataType: "json",
                success: function (data) {
                    /**这里需要返回该账号的未完成的订单个数*/
                    alert('后台可以运行记得删除失败的处理方式');
                    pwset_or(flag5, flag6);

                },
                error: function (data) {
                    alert("设置密码请求失败long.js");
                    /**本测试还没有后台，请求必定失败，现将成功的处理方法放在此处*/
                    pwset_or(flag5, flag6);
                }
            });

        } else {
            /**这个是提交了乘车信息的*/
            $.ajax({
                type: "POST", //GET
                url: "***.action",
                data: {
                    user_tel: tel_zhen,
                    password_set: mima,
                    start_station: $(".start_").val(),
                    end_station: $(".end_").val(),
                    people_number: $(".number_").val(),
                    send_time: $(".time_").val(),
                    pin_or: $(".pin_or").val(),
                    pin_money: $(".pin_money").val()
                }, //组装参数
                dataType: "json",
                success: function (data) {
                    alert('密码设置成功');
                    pw_false(flag5);
                },
                error: function (data) {
                    alert("测试密码设置的请求失败了");
                    /**测试是否可以通过，测试过后删除*/
                    pw_false(flag5);
                }
            });
        }


    } else {
        $(".set_pass p").show();
        setTimeout(function () {
            $(".set_pass p").hide();
        }, 3000);
    }
}
/**这是检查密码设置是否成功的*/
function pwset_or(flag5, flag6) {
    if (flag5) {
        $(".set_pass").hide();
        $(".mask").hide();
        $(".user_photo").attr("src", "images/index1_03.png");
        if (flag6 != 0) {
            $(".my_wwc").show();
            $(".wwc_badge").text(flag6);
        }
        flag2 = true;
    } else {
        alert("密码设置失败请重新设置");
    }
}


/*我要登录验证请求*/
function login_now() {
    //!*验证手机号
    var tel_wt = $(".login_now .login_tel").val().trim();
    tel_wt = tel_wt.split(" ");
    var user_tel = '';//用户登录手机号
    for (var i = 0; i < tel_wt.length; i++) {
        user_tel += tel_wt[i];
    }
//!*在验证密码
    var user_pw = '';//用户登录密码
    if ($(".login_now .eye").attr("src") == "images/eye_07.png") {
        user_pw = $(".login_now .set_pw").val().trim();
    } else {
        user_pw = $(".login_now .set_pw2").val().trim();
    }
    if (/^[0-9A-Za-z]{6,16}$/.test(user_pw)) {
        alert("开始向后台发送数据验证");//成功
//发送数据到后台
        if ($(".start_").val() == "") {
            /**这个是未提交乘车信息的只发送账号密码*/
            $.ajax({
                type: "POST", //GET
                url: "***.action",
                data: {
                    user_tel: user_tel,
                    password_yan: user_pw
                }, //组装参数
                dataType: "json",
                success: function (data) {
                    /**这里需要返回该账号的未完成的订单个数*/
                    alert('后台可以运行记得删除失败的处理方式');
                    pw_or(flag5, flag6);
                },
                error: function (data) {
                    alert("设置密码请求失败long.js");
                    /**本测试还没有后台，请求必定失败，现将成功的处理方法放在此处*/
                    pw_or(flag5, flag6);
                }
            });

        } else {
            /**这个是提交了乘车信息的*/
            $.ajax({
                type: "POST", //GET
                url: "***.action",
                data: {
                    user_tel: user_tel,
                    password_yan: user_pw,
                    start_station: $(".start_").val(),
                    end_station: $(".end_").val(),
                    people_number: $(".number_").val(),
                    send_time: $(".time_").val(),
                    pin_or: $(".pin_or").val(),
                    pin_money: $(".pin_money").val()
                }, //组装参数
                dataType: "json",
                success: function (data) {
                    alert('登陆成功');
                    pw_false(flag5);
                },
                error: function (data) {
                    alert("测试登陆的请求失败了");
                    /**测试是否可以通过，测试过后删除*/
                    pw_false(flag5);
                }
            });
        }

    } else {
        $(".login_now p").show();
        setTimeout(function () {
            $(".login_now p").hide();
        }, 3000);
    }
}
/**未登录先选线路验证密码是否正确*/
function pw_false(flag5) {
    if (flag5) {
        $(".set_pass").hide();
        $(".mask").hide();
        flag2 = true;
        $(".user_photo").attr("src", "images/index1_03.png");
        window.open("select_updown.html", "_self", "");
        /**这个页面加载时把线路列表铺到里面*/
    } else {
        $(".login_now p").text("手机号或密码错误");
        $(".login_now p").show();
        setTimeout(function () {
            $(".login_now p").hide();
        }, 3000);
        flag2 = false;
    }
}

/**验证密码是否正确*/
function pw_or(flag5, flag6) {
    if (flag5) {
        $(".login_now").hide();
        $(".mask").hide();
        $(".user_photo").attr("src", "images/index1_03.png");
        if (flag6 != 0) {
            $(".my_wwc").show();
            $(".wwc_badge").text(flag6);
        }
        flag2 = true;
    } else {
        $(".login_now p").text("手机号或密码错误");
        $(".login_now p").show();
        setTimeout(function () {
            $(".login_now p").hide();
        }, 3000);
        flag2 = false;
    }
}

/*忘记密码*/
function forget() {
    $(".login_now").hide();
    $(".login_yan .yan_tel").text($(".login_now .login_tel").val());
    $(".login_yan").show();
    $(".login_yan .yzm").val("");
    $(".login_yan .yzm").eq(0).focus();
    send_yan($(".login_yan .yan_tel").text());
}
/*去选择具体出发地点*/
function select_dian(obj) {
    /**ajax发送线路信息成功后跳转*/
    $.ajax({
        type: "POST", //GET
        url: "***.action",
        data: {}, //线路信息
        dataType: "json",
        success: function (data) {
            window.open("select_updown.html", "_self", "");
        },
        error: function (data) {
            window.open("select_updown.html", "_self", "");
        }
    });


}
function my_trip() {
    window.open('my_trip.html', '_self', '');
}
function my_setting() {
    window.open('setting.html', '_self', '');
}
$(function () {
    /**弹窗*/
    function loading(l,t) {
        var str = '', pic, title;
        if (l == "loading") {
            pic = "loading.svg";
            title = "加载中…";
        }
        if (l == "success") {
            pic = "success.png";
            title = "成功";
        }
        if (l == "error") {
            pic = "error.png";
            title = "失败";
        }
        str += '<div class="mask_"></div>';
        str += '<div class="msg_warp">';
        str += '<img src="images/' + pic +'" class="loading">';
        str += '<p>' + title + '</p>';
        str += '</div>';
        $("body").after(str);

        if (t > 0) {
            setTimeout(function () {
                $(".msg_warp,.mask_").remove();
            }, t)
        }
    }
})
