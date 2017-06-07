$(function(){
    /**驾校滚动*/
$(".school_nav li").on("click",school_nav);
    /**点击城市*/
    $(".local_city").on("click",local_city);
    /**确定城市*/
    city_sure();
    /**选择驾校*/
    $(".school_item p").on("click",select_the_school);
});
function select_the_school(){
    if($(".local_city").text().trim()!="定位中"){
        var school=encodeURI(encodeURI($(this).text().trim()));
        var school_city=encodeURI(encodeURI($(".local_city").text().trim()));
        window.open("register_teacher.html?school="+school+"&school_city="+school_city+"","_self","");
    }else {
        msg_show("等待定位完成",3000);
    }
}
/**确定城市*/
function city_sure(){
    var now_city=decodeURI($.getUrlParam('city'));
    if(now_city=="null"){
        local_dw_city();
    }else {
        $(".local_city").text(now_city);
    }
}

/**点击当前城市*/
function local_city(){
    if($(this).text()!="定位中"){
        var  local=encodeURI(encodeURI($(this).text().trim()));
        window.open("select_city.html?local="+local+"","_self","");
    }else {
        msg_show("等待定位完成",3000);
    }
}
/**驾校滚动*/
function school_nav(){
    msg_show($(this).text(),500);
    var h=$(".title_" + $(this).text()+ "").offset().top - $("header").height()-$(".main_top").height();
    $("html,body").animate({scrollTop:h}, 500);
}

/***当前城市**/
function local_dw_city(){
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
                var the_city=msg.substr(msg.indexOf("省")+1,msg.indexOf("市")-2);
                $(".local_city").text(the_city);


            }else{
                //获取地址失败
                /* alert(result.regeocode.formattedAddress);*/

            }
        });
    }
//解析定位错误信息
    function onError(data) {
        //document.getElementById('tip').innerHTML = '定位失败';
    }
//逆地理编码
}
