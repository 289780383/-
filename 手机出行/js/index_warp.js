/**规定页面基本单位*/
font_size();
window.onresize = function () {
    font_size();
};
function font_size() {
    var deviceWidth = document.documentElement.clientWidth;
    if (deviceWidth > 750) deviceWidth = 750;//640为设计稿宽度三处需要修改
    document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
}


$(function(){
    /**轮播*/
    lunbo_ul(".pic_warp", ".pic_nav");
    /**search*/
$(".search_in").on("focus",search_in);
    /**滚动头部变色*/
    $(window).on("scroll",win_scroll);
    /**页面跳转*/
    $(".nav li").on("click",open_page);
    /**公告无缝滚动*/
    wf();
    /**公告无缝滚动*/
        function wf(){
            setTimeout(function(){fn1()},4000);
        function fn1(){
            setTimeout(function(){
                var new_li=$(".msg_main li").eq(0).clone();
                $(".msg_main").append(new_li);
                $(".msg_main").css("transition","all 0.5s");
            },500);
            var h=$(".msg_main li").height();
            $(".msg_main").animate({"top":-h},500);
            setTimeout(function(){
                $(".msg_main").css("transition","all 0s");
                $(".msg_main li").eq(0).remove();
                $(".msg_main").css("top","0");
            },1000);
            setTimeout(fn1,4000);
        }

    }
});
/**页面跳转*/
function open_page(){
    var page=$(this).find("p").text().trim();
    switch (page){
        case "全部":
            window.open("index_w_more.html","_self","");
            break;
    }
}
/**滚动头部变色*/
function win_scroll(){
    var n=$(window).scrollTop();
    if(n>$(".banner").height()/2){
        $(".search_box").css("background-color","#fff");
        $(".search_icon").hide();
        $(".search").css("background-color","#ec584e");
    }else {
        $(".search_box").css("background-color","");
        $(".search_icon").show();
        $(".search").css("background-color","transparent");
    }
}

/**search*/
function search_in(){
    $(".footer_nav").hide();
    var old=$(this).val().trim();
    if(old=="你要去哪？"){
        $(this).val("");
    }
    $(this).blur(function(){
        $(".footer_nav").show();
        if($(this).val().trim()==""){
            $(this).val("你要去哪？");
        }
    });
}
/**轮播*/
function lunbo_ul(bo, nav) {//传入轮播的ul和小导航的ul需要搭配css使用
    var li_w = $("" + bo + " li").eq(0).outerWidth();
    var li_n = $("" + bo + " li").length;
    var str = "";
    var this_timer, this_timed, n = -1;
    $(bo).css("width", li_w * li_n);//计算ul宽度
    for (var i = 0; i < li_n; i++) {//写入导航按钮
        str += "<li></li>";
    }
    $(nav).html(str);
    /**定时轮播*/
    fn1();
    function fn1() {
        n++;
        if (n >= li_n) {
            n = 0;
        } else if (n < 0) {
            n = li_n - 1;
        }
        clearTimeout(this_timer);
        $(bo).css("left", -n * li_w);
        $(nav).find("li").removeClass("nav_active");
        $(nav).find("li").eq(n).addClass("nav_active");
        this_timer = setTimeout(fn1, 3000);
    }

    /**滑动切换*/
    $(bo).swipe(
        {//*swipe (事件，滑动的方向，滑动的距离，一次滑动的时间 , 几根手指)
            swipe: function (event, direction, distance, duration, fingerCount) {
                if (direction == "left") {
                    n++;
                    if (n >= li_n) {
                        n = li_n - 1;
                    }
                    swipe_bo();
                } else if (direction == "right") {
                    n--;
                    if (n <= 0) {
                        n = 0;
                    }
                    swipe_bo();
                }
                /**滑动切换*/
                function swipe_bo() {
                    clearTimeout(this_timer);
                    clearTimeout(this_timed);
                    $(bo).css("left", -n * li_w);
                    $(nav).find("li").removeClass("nav_active");
                    $(nav).find("li").eq(n).addClass("nav_active");
                    this_timed = setTimeout(fn1, 5000);
                }
            }
        });
}


/***当前城市**/

var map, geolocation;
//加载地图，调用浏览器定位服务
map = new AMap.Map('container', {
    resizeEnable: true
});
mapp();
function mapp(){
    map.plugin('AMap.Geolocation', function() {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition:'RB'
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
    });

}
var my_city='';
var lnglatXY=[];//地图上所标点的坐标
AMap.service('AMap.Geocoder',function(){//回调函数
    //实例化Geocoder
    geocoder = new AMap.Geocoder({
        city: "010"//城市，默认：“全国”
    });
    //TODO: 使用geocoder 对象完成相关功能
})
//解析定位结果
function onComplete(data) {
    lnglatXY=[data.position.getLng(),data.position.getLat()];
    geocoder.getAddress(lnglatXY, function(status, result) {
        if (status === 'complete' && result.info === 'OK') {

            //获得了有效的地址信息:
            var msg=result.regeocode.formattedAddress;
            my_city=msg.substr(msg.indexOf("省")+1,msg.indexOf("市")-2);
            var the_city=msg.substr(msg.indexOf("省")+1,msg.indexOf("市")-3);
            $(".search_city").text(the_city);
            get_weather(the_city);
            //即，result.regeocode.formattedAddress
        }else{
            //获取地址失败
            /* alert(result.regeocode.formattedAddress);*/

        }
    });
}
//解析定位错误信息
function onError(data) {
    document.getElementById('tip').innerHTML = '定位失败';
}
//逆地理编码

/***当前城市结束**/
/**天气查询*/
function get_weather(city){
    AMap.service('AMap.Weather', function() {
        var weather = new AMap.Weather();
        //查询实时天气信息, 查询的城市到行政级别的城市，如朝阳区、杭州市
        weather.getLive(city, function(err, data) {
            if (!err) {
                $(".gd_wd").text(data.temperature);
                $(".gd_txt").text(data.weather);
            }
        });
    });
}
