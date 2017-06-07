/**
 * Created by Administrator on 2016/10/22 0022.
 */
/**icon鼠标移入移出事件*/
function player() {
    clearTimeout(banner_time);
    $(".banner_nav li").removeClass("banner_active");
    $(this).addClass("banner_active");
    n = $(this).index() + 1;
    $(".banner").css("background-image", "url('images/" + n + ".jpg')");
}
$(function (){
    /**微信公众号*/
    $(".wx").mouseover(function () {
        $(".wx_box").stop(true);
        $(".wx_box").slideDown();
        setTimeout(function () {
            $(".wx").mouseout(function () {
                $(".wx_box").slideUp();
            });
        }, 500);
    });
    /**icon鼠标移入移出*/
    $(".icon_inner li").mouseover(function () {
        $(this).find("img").stop(true);
        $(this).find("img").animate({"margin-top": "-10px"}, 300);
        $(".icon_inner li").mouseout(function () {
            $(this).find("img").animate({"margin-top": "0"}, 300);
        });
    });
    /**热门线路出发点点击*/
    $(".m_l_point li").click(function () {
        $(".m_l_point li").removeClass("main_active");
        $(this).addClass("main_active");
    });
    /**导航点击跳转*/
    $(".nav_nav li").on("click",open_win);
    $(".header_right li").eq(0).find("span").on("click",open_win);
    $(".header_right a").on("click",open_win);
    $(".forget").on("click",open_win);
    $(".nav_left h1,.header_left h1").click(function(){
        window.open("index.html","_self","");
    });

    /**判断登录状态*/
    var flag_lodin=1;
    login_or(flag_lodin);
    function login_or(flag){
        if(flag){
            $(".login_wei").hide();
            $(".login_yi").show();
        }else {
            $(".login_yi").hide();
            $(".login_wei").show();
        }
    }

});
/**判断浏览器*/
function myBrowser(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1){
        return "Chrome";
    }//判断是否Chrome浏览器
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器
}var mb = myBrowser();
/**得到今明后日期*/
function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;//获取当前月份的日期
    var d = dd.getDate();
    if (m < 10) {
        m = "0" + m;
    }
    if (d < 10) {
        d = "0" + d;
    }
    return y + "-" + m + "-" + d;
}
/**页面跳转*/
function open_win(){
    var a=$(this).text();
    switch (a){
        case "首页":
            window.open("index.html","_self","");
            break;
        case "汽车票":
            window.open("car_ticket.html","_self","");
            break;
        case "约租车":
            window.open("car_rental.html","_self","");
            break;
        case "定制班线":
            window.open("made_line.html","_self","");
            break;
        case "景区直达":
            window.open("view_go.html","_self","");
            break;
        case "新闻中心":
            window.open("news.html","_self","");
            break;
	case "用户帮助":
            window.open("help.html","_self","");
            break;
        case "登录":
            window.open("login.html","_self","");
            break;
        case "注册":
            window.open("register.html","_self","");
            break;
        case "忘记密码":
            window.open("reset_password.html","_self","");
            break;

    }
}
