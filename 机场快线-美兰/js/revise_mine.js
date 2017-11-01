$(function() {
    $(".list").delegate("li", "click", list_fn);
    $(".m_cancel").on("click", cancel_fn);
    $(".forget_pw").on("click", forget_pw);
    $("#tel_yzm1").on("click", tel_yzm1);
    $(".tel_sure").on("click", tel_sure);
    /**修改密码*/
    $(".pw_sure1").on("click", pw_sure1);
    $(".pw_sure2").on("click", pw_sure2);
    $("#pw_yzm").on("click", pw_yzm_fn);
    /**点击遮罩*/
    $(".mask").on("click", mask_fn);
    /**点击退出登陆*/
    $(".out_btn").on("click",out_btn_fn);

})
var out_btn_fn = function() {
    msg_show1("退出成功",1000);
    $(".nick_name").text("未登录");
}
var mask_fn = function() {
    cancel_fn();
}
var list_fn = function() {
    var index = $(this).index();
    switch (index) {
        case 0:
            break;
        case 1:
            $(".tel_mask,.mask").show();
            break;
        case 2:
            $(".pw_mask,.mask").show();
    }
}

var cancel_fn = function() {
    $(".tel_mask,.pw_mask,.wj_mask,.mask").hide();
    clear_fn();
}
var forget_pw = function() {
    $(this).parent().hide();
    $(".wj_mask").show();
}

/****-------------修改手机号----------------****/
/**手机号确定*/
var tel_sure = function() {
    if ($(this).parents(".revise_mask").attr("data-tel") == 1) {
        tel_sure1();
    } else if ($(this).parents(".revise_mask").attr("data-tel") == 2) {
        tel_sure2();
    }
}

var tel_sure1 = function() {
    var tel = $(".tel_text").val().NoSpace();
    var yzm = $(".yzm_text").val().NoSpace();
    if (!tel_or(tel)) {
        return;
    };
    if (!yzm_or(yzm)) {
        return;
    };
    $.ajax({
        type: "POST", //GET
        url: "data.json",
        data: {
            tel: tel,
            yzm: yzm
        },
        dataType: "json",
        success: function(data) {
            $(".tel_mask").attr("data-tel", "2");
            $(".tel_mask input").val("");
            $("#tel_yzm1").text("获取验证码");
            $("#tel_yzm1").on("click", tel_yzm1);
            $(".m_txt").text("新手机号");
            clearInterval(time_yzm);

        },
        error: function(data) {}
    });


}
var tel_sure2 = function() {
    var tel = $(".tel_text").val().NoSpace();
    var yzm = $(".yzm_text").val().NoSpace();
    if (!tel_or(tel)) {
        return;
    };
    if (!yzm_or(yzm)) {
        return;
    };
    $.ajax({
        type: "POST", //GET
        url: "data.json",
        data: {
            tel: tel,
            yzm: yzm
        },
        dataType: "json",
        success: function(data) {
            clear_fn();
            msg_show1("修改成功", "1000");
            $(".tel_mask,.mask").hide();
        },
        error: function(data) {}
    });

}
/**清空填写数据*/
var clear_fn = function() {
    $(".tel_mask").attr("data-tel", "1");
    $(".tel_mask input").val("");
    $(".pw_mask input").val("");
    $(".wj_mask input").val("");
    $("#tel_yzm1").text("获取验证码");
    $("#pw_yzm").text("获取验证码");
    $("#tel_yzm1").on("click", tel_yzm1);
    $("#pw_yzm").on("click", pw_yzm_fn);
    $(".m_txt").text("旧手机号");
    clearInterval(time_yzm);
}

/**检验手机号*/
function tel_or(val) {
    if (!/^(13[0-9]|14[579]|15[012356789]|17[0135678]|18[0-9])\d{4}\d{4}$/.test(val)) {
        msg_show1("手机号格式有误");
        return false;
    }
    return true;
}
/**检验验证码*/
function yzm_or(val) {
    if (val.length == 0) {
        msg_show1("验证码不能为空");
        return false;
    }
    return true;
}
/**点击发送验证码，手机号验证码*/
var tel_yzm1 = function() {
    var tel = $(".tel_text").val().NoSpace();
    if (!tel_or(tel)) {
        return;
    };
    yzm_btn($(this), tel_yzm1, tel);
}
/**发送验证码*/
function yzm_btn(el, fn, tel) {
    var data = {};
    if ($(".wj_mask").css("display") == "block") {
        data = {
            old_tel: false,
            tel: tel
        }
    } else if (el.parents(".revise_mask").attr("data-tel") == 1) { //旧手机号验证
        data = {
            old_tel: true,
            tel: tel
        };
    } else if (el.parents(".revise_mask").attr("data-tel") == 2) { //新手机号验证
        data = {
            old_tel: false,
            tel: tel
        };

    }
    $.ajax({
        type: "POST", //GET
        url: "data.json",
        data: data,
        dataType: "json",
        success: function(data) {
            el.text("发送成功");
            el.off("click", fn);
            yan_time(el, fn);

        },
        error: function(data) {}
    });

}
/*验证倒计时*/
var time_yzm = "";

function yan_time(el, fn) {
    var k = 89;
    clearInterval(time_yzm);
    time_yzm = setInterval(function() {
        if (k == 0) {
            el.text("重新发送");
            el.on("click", fn);
            clearInterval(time_yzm);
            return;
        }
        el.text("（" + k-- + "）秒后重发");
    }, 1000)
}
/****-------------修改密码----------------****/
/**检验密码*/
function pw_or(val) {
    if (val.length < 6 || val.length > 12) {
        msg_show1("密码超出6-12限制");
        return false;
    }
    return true;
}

/**修改密码1*/
var pw_sure1 = function() {
    var old_pw = $(".old_pw").val().NoSpace(),
        new_pw1 = $(".old_new_pw1").val().NoSpace(),
        new_pw2 = $(".old_new_pw2").val().NoSpace();
    if (!pw_or(old_pw)) {
        return;
    };
    if (!pw_or(new_pw1)) {
        return;
    };
    if (new_pw1 != new_pw2) {
        msg_show1("两次密码不一致", 1000);
        return;
    }
    $.ajax({
        type: "POST", //GET
        url: "data.json",
        data: {
            old_pw: old_pw,
            new_pw: new_pw1
        },
        dataType: "json",
        success: function(data) {
            msg_show1("密码修改成功", 1000);
            cancel_fn();
        },
        error: function(data) {}
    });
}
/**修改密码2*/
var pw_sure2 = function() {
    var tel = $(".wj_tel").val().NoSpace(),
        yzm = $(".wj_yzm").val().NoSpace(),
        new_pw = $(".wj_new_pw").val().NoSpace();
    if (!tel_or(tel)) {
        return;
    };
    if (!yzm_or(yzm)) {
        return;
    };

    if (!pw_or(new_pw)) {
        return;
    };

    $.ajax({
        type: "POST", //GET
        url: "data.json",
        data: {
            tel: tel,
            yzm: yzm,
            new_pw: new_pw
        },
        dataType: "json",
        success: function(data) {
            msg_show1("密码修改成功", 1000);
            cancel_fn();
        },
        error: function(data) {}
    });
}
var pw_yzm_fn = function() {
    var tel = $(".wj_tel").val().NoSpace();
        if (!tel_or(tel)) {
        return;
    };
    yzm_btn($(this), pw_yzm_fn, tel);
}