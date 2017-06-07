    font_size();
    window.onresize = function() {
        font_size();
    };

    function font_size() {
        var deviceWidth = document.documentElement.clientWidth;
        if (deviceWidth > 750) deviceWidth = 750; //640为设计稿宽度三处需要修改
        document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
    }
    $(function() {
        $(".yzm_btn").on("click", send_yzm);
        $(".register_btn").on("click", register_btn);
    });
    /**yzm*/
    var yzm_num = "";

    function send_yzm() {
        $(".yzm_btn").off("click", send_yzm);
        $(".yzm_btn").css({ "background-color": "#f0f0f0", "color": "#999" });
        $(".the_yzm").val("");
        yan_time();
        $.ajax({
            type: "POST", //GET
            url: "***.action",
            data: {
                the_tel: user_tel,
            }, //组装参数
            dataType: "json",
            success: function(data) {
                /**这里拿到验证码*/
                yzm_num = "1234";
            },
            error: function(data) {
                yzm_num = "1234";
            }
        });

    }

    /*验证倒计时*/
    var time_yzm;

    function yan_time() {
        $(".yzm_btn").text("90秒后重发");
        var k = 89;
        clearInterval(time_yzm);
        time_yzm = setInterval(function() {
            if (k == 0) {
                $(".yzm_btn").text("重新发送");
                $(".yzm_btn").on("click", send_yzm);
                $(".yzm_btn").css({ "background-color": "", "color": "" });
                clearInterval(time_yzm);
                return;
            }
            $(".yzm_btn").text(k-- + "秒后重发");
        }, 1000);
    }
    /**注册按钮*/
    function register_btn() {
        if (!/^(13[0-9]|14[579]|15[012356789]|17[0135678]|18[0-9])\d{4}\d{4}$/.test($(".the_tel").val().trim())) {
            msg_show1("手机号格式有误", 2000);
            return;
        }
        if ($(".the_yzm").val().trim() == "") {
            msg_show1("验证码不能为空", 2000);
            return;
        }
        if ($(".the_yzm").val().trim() != yzm_num) {
            msg_show1("验证码不正确", 2000);
            return;
        }
        window.open("index.html", "_self", "");

    }
    /**消息提示*/
    function msg_show1(msg, tm) {
        if ($(".msg_show").length >= 1) {
            return;
        }
        $("body").append("<div class='msg_show'><p>" + msg + "</p></div><div class='mask_w'></div>");
        setTimeout(function() {
            $(".msg_show,.mask_w").remove();
        }, tm);
    }
