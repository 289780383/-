/**变量为首字母大写，方法是小写*/
/**登录*/
var Tel, Ps1, Ps2, Yzm, Nk;
var m = 90;
/**yzm倒计时*/
var yzm_timer;
/**yzm定时器*/
var yzm_flag = false;
/**yzm成功与否标记*/
/**表单需要信息*/
function login_info() {
    Tel = $("#tel").val().trim();
    Ps1 = $("#pass1").val().trim();
}
function register_info() {
    Tel = $("#tel").val().trim();
    Ps1 = $("#pass1").val().trim();
    Ps2 = $("#pass2").val().trim();
    Nk = $("#nickname").val().trim();
}
function find_password_info() {
    Tel = $("#tel").val().trim();
    Ps1 = $("#pass1").val().trim();
    Ps2 = $("#pass2").val().trim();
}


/**手机号验证*/
function tel(tel) {
    if (tel == "") {
        msg_show("请填写手机号",3000);
        $(".get_yzm").off("click", get_yzm);
        return false;
    }
    Tel = tel;
    if (/^(13[0-9]|14[579]|15[012356789]|17[0135678]|18[0-9])\d{4}\d{4}$/.test(tel)) {
        /**验证码*/
        $(".get_yzm").on("click", get_yzm);
        return true;
    } else {
        msg_show("手机号格式有误",3000);
        $(".get_yzm").off("click", get_yzm);
        return false;
    }
};
/**验证码*/
function yzm() {
    if (yzm_flag) {
        return true;
    } else {
        msg_show("验证码错误",3000);
        return false;
    }
}
/**pass1验证*/
function pass1(pass) {
    if (pass == "") {
        msg_show("请填写密码",3000);
        return false;
    }
    Ps1 = pass;
    if (/^[0-9A-Za-z]{6,16}$/.test(pass)) {
        return true;
    } else {
        msg_show("密码格式有误",3000);
        return false;
    }
}
/**pass2验证*/
function pass2(pass) {
    if (pass == "") {
        msg_show("请再次填写密码",3000);
        return false;
    }
    Ps2 = pass;
    if (/^[0-9A-Za-z]{6,16}$/.test(pass) && Ps1 == Ps2) {
        return true;
    } else {
        msg_show("两次密码不一致",3000);
        return false;
    }
}
/**nickname验证*/
function nickname(nick) {
    if (nick == "") {
        msg_show("请填写昵称",3000);
        return false;
    }
    Nk = nick;
    if (/^([0-9A-Za-z]|[\u4e00-\u9fa5]){2,6}$/.test(nick)) {
        return true;
    } else {
        msg_show("昵称不能含有特殊字符",3000);
        return false;
    }
}
/**登录按钮*/
function login() {
    login_info();
    if (tel(Tel) && pass1(Ps1)) {
        alert("登录成功");
    }
    $(".login_btn").off("click", login);
    setTimeout(function () {
        $(".login_btn").on("click", login);
    }, 3000);
}
/**注册按钮*/
function register() {
    register_info();
    if (tel(Tel) && yzm() && pass1(Ps1) && pass2(Ps2) && nickname(Nk)) {
        alert("登录成功");
    }
    $(".register_btn").off("click", register);
    setTimeout(function () {
        $(".register_btn").on("click", register);
    }, 3000);
}
/**找回密码按钮*/
function find_password() {
    find_password_info();
    if (tel(Tel) && yzm() && pass1(Ps1) && pass2(Ps2)) {
        alert("登录成功");
    }
    $(".find_password_btn").off("click", find_password);
    setTimeout(function () {
        $(".find_password_btn").on("click", find_password);
    }, 3000);
}
/**eye*/
function eye_toggle() {
    $(this).toggleClass("eye_on");
    if ($(this).hasClass("eye_on")) {
        $(this).parent().find("input").prop("type", "text");
    } else {
        $(this).parent().find("input").prop("type", "password");
    }
}

/**验证码倒计时*/
function clock() {
    clearTimeout(yzm_timer);
    m--;
    $(".get_yzm").text("" + m + "秒后重发");
    yzm_timer = setTimeout(clock, 1000);
    if (m <= 0) {
        clearTimeout(yzm_timer);
        $(".get_yzm").text("重新获取");
        $(".get_yzm").css("background-color", "#24b4ff");
        $(".get_yzm").on("click", get_yzm);
    }
}

/**发送验证码*/
function get_yzm() {
    if (tel(Tel)) {
        $.ajax({
            type: "get",
            url: "",
            data: {
                tel: Tel
            },
            datatype: "json",
            success: function (data) {
                $(".get_yzm").text("90秒后重发");
                $(".get_yzm").css("background-color", "#bbb");
                clock();
                $(".get_yzm").off("click", get_yzm);
                /**验证码赋值给Yzm*/
                Yzm = data;
            },
            error: function (data) {
                msg_show("网络不佳，发送失败",3000);
                $(".get_yzm").text("重新获取");
                $(".get_yzm").css("background-color", "#24b4ff");
                $(".get_yzm").on("click", get_yzm);
            }
        });
    }
}

/**忘记密码*立即注册*/
function open_new(k){
    window.open(""+k+".html","_self","");
}

/**文档加载*/
$(function () {
    /**按钮绑定事件*/
    $(".login_btn").on("click", login);
    $(".register_btn").on("click", register);
    $(".find_password_btn").on("click", find_password);
    /**input失去焦点事件*/
    $("#tel").blur(function () {
        tel($(this).val().trim());
    });
    $("#pass1").blur(function () {
        pass1($(this).val().trim());
    });
    $("#pass2").blur(function () {
        pass2($(this).val().trim());
    });
    $("#nickname").blur(function () {
        nickname($(this).val().trim());
    });
    /**输入验证码*/
    $('#yzm').bind('input propertychange', function () {    ////*用于监听input的输入事件
        if ($(this).val().trim() == Yzm) {
            yzm_flag = true;
            clearTimeout(yzm_timer);
            msg_show("验证码输入正确",3000);
            $(this).text("验证成功");
            $(this).css("background-color", "#24b4ff");
            $(".get_yzm").off("click", get_yzm);
        }
    });
    /**eye*/
    $(".eye").on("click", eye_toggle);
})