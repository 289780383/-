var listMsg = [],
    showMsg, sign_flag = 0;
$(function() {
    /**初始加载*/
    init();
    /**点击事件*/
    $(".sign_btn").on("click", sign_btn);
    $(".close_warp").on("click", close_warp);
});
/**初始加载*/
function init() {
    $(".loading_pic,.mask").show();
    $.ajax({
        type: "POST",
        url: "data.json",
        dataType: "json",
        success: function(data) {
            if (data.returnCode == 1) {
                sign_flag = data.returnMsg.todayInit.isSign;
                returnMsg = data.returnMsg.dateList;
                creat_list(returnMsg);
                $(".loading_pic,.mask").hide();
            }
        },
        error: function(data) {
            msg_show1("访问错误");
        }
    });

}
/**创建列表*/
function creat_list(msg) {
    if (sign_flag == 1) {
        $(".sign_btn").attr("src", "images/sign_icon_04.gif");
    }
    var str = "";
    $.each(msg, function(i) {
        if (msg[i].isTimeOut == 1) {
            if (msg[i].isSign == 1) {
                if (msg[i].isDouble == 1) {
                    str += "<li class='sign_d_on'></li>";
                } else {
                    str += "<li class='sign_on'></li>";
                }
            } else {
                if (msg[i].isDouble == 1) {
                    str += "<li class='sign_d_off'></li>";
                } else {
                    str += "<li class='sign_off'></li>";
                }

            }
        } else {
            if (msg[i].isDouble == 1) {
                str += "<li class='wei sign_d'></li>";
            } else {
                str += "<li class='wei'>" + msg[i].date.slice(8) + "天</li>";
            }


        }
    });
    $(".sign_list").html(str);
}
/**点击签到*/
function sign_btn() {
    if (sign_flag == 1) {
        return false;
    }
    $(".loading_pic,.mask").show();
    $.ajax({
        type: "POST",
        url: "s_data.json",
        dataType: "json",
        success: function(data) {
            showData = data;
            $(".loading_pic,.mask").hide();
            if (showData.returnCode == 1) {
                show_msg(showData.returnMsg.signHint);
            } else {
                msg_show1(showData.returnMsg, 1500);
            }
        },
        error: function(data) {
            msg_show1("访问错误");
        }
    });
}
/**信息展示*/
function show_msg(msg) {
    $(".show_warp p").html(msg.signHint);
    $(".show_warp,.mask").show();
    if ($(".wei").eq(0).hasClass("sign_d")) {
        $(".wei").eq(0).removeClass('sign_d');
        $(".wei").eq(0).addClass('sign_d_on');
    } else {
        $(".wei").eq(0).addClass('sign_on');
    }
    $(".wei").eq(0).text(' ');
    $(".sign_btn").attr("src", "images/sign_icon_04.gif");
    sign_flag = 1;
}
/**关闭展示*/
function close_warp() {
    $(".show_warp,.mask").hide();
}