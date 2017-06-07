//基本地图加载
var local=[];
var school=[121.447935,37.463822];
/**当前坐标定位*/
function local_dw(){
    var geolocation;
    var map = new AMap.Map("container", {
        resizeEnable: true,
        zoom: 13//地图显示的缩放级别
    });

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
/*
    AMap.service('AMap.Geocoder',function(){//回调函数
        //实例化Geocoder
        geocoder = new AMap.Geocoder({
            city: "010"//城市，默认：“全国”
        });
        //TODO: 使用geocoder 对象完成相关功能
    })
*/
//解析定位结果
    function onComplete(data) {
        local=[data.position.getLng(),data.position.getLat()];
        sel_transfer(local,school);
    }
//解析定位错误信息
    function onError(data) {
        msg_show("定位当前坐标失败",3000);
        //document.getElementById('tip').innerHTML = '定位失败';
    }
//逆地理编码
}
/**城市公交*/
function sel_transfer(a,b){
    var map = new AMap.Map("container", {
        resizeEnable: true,
        zoom: 13//地图显示的缩放级别
    });

    AMap.service('AMap.Transfer',function(){//回调函数
        //实例化Transfer
        transfer= new AMap.Transfer({
            map: map,
            panel: "result"
        });
        //TODO: 使用transfer对象调用公交换乘相关的功能
        //传经纬度
        transfer.search([a[0],a[1]], [b[0],b[1]]);
    });
    $(".loading_pic,.mask").hide();
}
/**步行*/
function sel_walking(a,b){
    var map = new AMap.Map("container", {
        resizeEnable: true,
        zoom: 13//地图显示的缩放级别
    });

    AMap.service('AMap.Walking',function(){//回调函数
        //实例化Walking
        walking= new AMap.Walking({
            map: map,
            panel: "result"
        });
        //TODO: 使用walking对象调用步行路径规划相关的功能
        //传经纬度
        walking.search([a[0],a[1]], [b[0],b[1]],function(status, result) {
            //TODO:开发者使用result自己创建交互面板和地图展示
            $(".loading_pic,.mask").hide();
        });
    })
}
/**驾车*/
function sel_driving(a,b){
    var map = new AMap.Map("container", {
        resizeEnable: true,
        zoom: 13//地图显示的缩放级别
    });

    AMap.service('AMap.Driving',function(){//回调函数
        //实例化Driving
        driving= new AMap.Driving({
            map: map,
            panel: "result"

        });
        //TODO: 使用driving对象调用驾车路径规划相关的功能
        //传经纬度
        driving.search([a[0],a[1]], [b[0],b[1]],function(status, result) {
            //TODO:开发者使用result自己创建交互面板和地图展示
            $(".loading_pic,.mask").hide();
        });
    })
}

$(function(){
    $(".loading_pic,.mask").show();
    local_dw();
    $(".btn_group span").eq(0).addClass("select_a");
    $(".btn_group span").on("click",sel_trip);
    function sel_trip(){
        $(".loading_pic,.mask").show();
        $(".btn_group span").removeClass("select_a");
        var index=$(this).index();
        $(".btn_group span").eq(index).addClass("select_a");
        if(index==0){
            sel_transfer(local,school);
        }else if(index==1){
            sel_driving(local,school);
        }else {
            sel_walking(local,school);
        }
    }
});
