$(function(){
    $("#keyword").focus(function(){
        var old=$(this).val().trim();
        if(old=="输入地址名称搜索"){
            $(this).val("");
        }
    });
    local_dw_city();
});
/**选择point*/
function select_point(point){
    var poi=encodeURI(encodeURI(point));
    window.open("register_teacher.html?point="+poi+"","_self","");
}
var lnglatXY;
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
    lnglatXY=[];//地图上所标点的坐标
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
                zhou_bian(the_city);
                tishi(the_city);

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

/**输入提示**/
function tishi(cc){
    AMap.plugin(['AMap.Autocomplete','AMap.PlaceSearch'],function(){
        var autoOptions = {
            city: cc, //城市，默认全国
            limitCity:true,
            input: "keyword"//使用联想输入的input的id
        };
        autocomplete= new AMap.Autocomplete(autoOptions);
        AMap.event.addListener(autocomplete, "select", function(e){

            select_point(e.poi.name);

            //TODO 针对选中的poi实现自己的功能
            placeSearch.search(e.poi.name)
        });
    });

}
/**周边*/

function zhou_bian(cc){
    var map = new AMap.Map("container", {
        resizeEnable: true
    });
    AMap.service(["AMap.PlaceSearch"], function() {
        var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
            pageSize: 20,
            pageIndex: 1,
            city: cc, //城市
            map: map,
            panel: "panel"
        });
        var cpoint = lnglatXY; //中心点坐标
        placeSearch.searchNearBy('', cpoint, 2000, function(status, result) {
            $(".poibox").click(function(){
                select_point(result.poiList.pois[$(this).index()].name);
            });
        });
    });
}
