/**
 * Created by Administrator on 2016/11/1 0001.
 */

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
    var str=['定位成功'];
    str.push('经度：' + data.position.getLng());
    str.push('纬度：' + data.position.getLat());
    str.push('精度：' + data.accuracy + ' 米');
    str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
    document.getElementById('tip').innerHTML = str.join('<br>');

  lnglatXY=[data.position.getLng(),data.position.getLat()];
    geocoder.getAddress(lnglatXY, function(status, result) {
        if (status === 'complete' && result.info === 'OK') {

            //获得了有效的地址信息:
            var msg=result.regeocode.formattedAddress;
            my_city=msg.substr(msg.indexOf("省")+1,msg.indexOf("市")-2);
            $(".city_sel,.local_city span").text(msg.substr(msg.indexOf("省")+1,msg.indexOf("市")-2));
            tishi();
            zhou_bian();
            $(".poibox").on("click",tian_dian1);
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