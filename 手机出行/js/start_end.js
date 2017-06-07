
/**点击出发点*/
function start_station(){
    getLocation();
    $(".city_title").text("请选择出发城市");

    $.ajax({
        type: "POST", //GET
        url: "***.action",
        data: {
            start_end:"start"
        },
        dataType: "json",
        success: function (data) {
            /**将城市数据铺到列表中*/
            var city=[
                {"letter":"a","city": ["阿富汗", "阿拉善", "安庆"]},
                {"letter":"b","city": ["阿富汗", "阿拉善", "安庆"]},
                {"letter":"c","city": ["阿富汗", "阿拉善", "安庆"]},
                {"letter":"d","city": ["阿富汗", "阿拉善", "安庆"]},
                {"letter":"e","city": ["阿富汗", "阿拉善", "安庆"]},
                {"letter":"f","city": ["阿富汗", "阿拉善", "安庆"]},
                {"letter":"a","city": ["阿富汗", "阿拉善", "安庆"]},
                {"letter":"b","city": ["阿富汗", "阿拉善", "安庆"]},
                {"letter":"c","city": ["阿富汗", "阿拉善", "安庆"]},
                {"letter":"d","city": ["阿富汗", "阿拉善", "安庆"]},
                {"letter":"e","city": ["阿富汗", "阿拉善", "安庆"]},
                {"letter":"f","city": ["阿富汗", "阿拉善", "安庆"]}

            ];
            var str_A='';
            var str_a='';
            for(var i=0;i<city.length;i++){
                str_A+="<li>"+city[i].letter.toLocaleUpperCase()+"</li>";
                str_a+="<li class='c_a'>";
                str_a+="<span>"+city[i].letter.toLocaleUpperCase()+"</span>";
                for(var j=0;j<city[i].city.length;j++){
                    str_a+="<p>"+city[i].city[j]+"</p>";
                }
                str_a+="</li>";

            }
            $(".city_nav").html(str_A);
            $(".city_list").html(str_a);
            $(".city_select").show();
            gundong();
        },
        error: function (data) {
            /**测试这里该删除*/
            var city=[
                {"letter":"a","city": ["阿富汗", "阿拉善", "安庆"]},
                {"letter":"b","city": ["阿富汗", "阿拉善", "安庆"]},
                {"letter":"c","city": ["阿富汗", "阿拉善", "安庆"]},
                {"letter":"d","city": ["阿富汗", "阿拉善", "安庆"]},
                {"letter":"e","city": ["阿富汗", "阿拉善", "安庆"]},
                {"letter":"f","city": ["阿富汗", "阿拉善", "安庆"]}
            ];
            var str_A='';
            var str_a='';
            for(var i=0;i<city.length;i++){
                str_A+="<li>"+city[i].letter.toLocaleUpperCase()+"</li>";
                str_a+="<li class='c_"+city[i].letter+"'>";
                str_a+="<span>"+city[i].letter.toLocaleUpperCase()+"</span>";
                for(var j=0;j<city[i].city.length;j++){
                    str_a+="<p>"+city[i].city[j]+"</p>";
                }
                str_a+="</li>";

            }
            $(".city_nav").html(str_A);
            $(".city_list").html(str_a);

            $(".city_select").show();
            gundong();
        }
    });

}
/**点击返回*/
function city_fh(){
    $(".city_select").hide();
}
/**点击目的城市*/
function end_station(){
    getLocation();
    $(".city_title").text("请选择目的城市");
    $.ajax({
        type: "POST", //GET
        url: "***.action",
        data: {
            start_end:$(".position_start").val()
        },
        dataType: "json",
        success: function (data) {
            /**将城市数据铺到列表中*/
            var city=[
                {"letter":"x","city": ["西安","西安","西安","西安","西安","西安"]},
                {"letter":"y","city": ["烟台","烟台","烟台","烟台","烟台","烟台" ]},
                {"letter":"z","city": ["张家界", "张家界", "张家界", "张家界", "张家界"]}
            ];
            var str_A='';
            var str_a='';
            for(var i=0;i<city.length;i++){
                str_A+="<li>"+city[i].letter.toLocaleUpperCase()+"</li>";
                str_a+="<li class='c_a'>";
                str_a+="<span>"+city[i].letter.toLocaleUpperCase()+"</span>";
                for(var j=0;j<city[i].city.length;j++){
                    str_a+="<p>"+city[i].city[j]+"</p>";
                }
                str_a+="</li>";

            }
            $(".city_nav").html(str_A);
            $(".city_list").html(str_a);
            $(".city_select").show();
            gundong();
        },
        error: function (data) {
            /**测试这里该删除*/
            var city=[
                {"letter":"x","city": ["西安","西安","西安","西安","西安","西安"]},
                {"letter":"y","city": ["烟台","烟台","烟台","烟台","烟台","烟台" ]},
                {"letter":"z","city": ["张家界", "张家界", "张家界", "张家界", "张家界"]}
            ];
            var str_A='';
            var str_a='';
            for(var i=0;i<city.length;i++){
                str_A+="<li>"+city[i].letter.toLocaleUpperCase()+"</li>";
                str_a+="<li class='c_"+city[i].letter+"'>";
                str_a+="<span>"+city[i].letter.toLocaleUpperCase()+"</span>";
                for(var j=0;j<city[i].city.length;j++){
                    str_a+="<p>"+city[i].city[j]+"</p>";
                }
                str_a+="</li>";

            }
            $(".city_nav").html(str_A);
            $(".city_list").html(str_a);

            $(".city_select").show();
            gundong();
        }
    });

}
function local_city(obj) {
    $(".city_select").hide();
    if($(".city_title").text()=="请选择出发城市"){
        $(".position_start").val($(obj).find("span").text());
    }else {
        $(".position_end").val($(obj).find("span").text());
    }
};
/**城市列表滚动*/
function gundong() {

    $(".city_nav li").click(function () {
        $("html,body").animate({}, 1000).stop();
        console.log($(".city_top").height());
        $("html,body").animate({scrollTop: $(".c_" + $(this).text().toLocaleLowerCase() + "").offset().top - $(".city_top").height()}, 1000);
       $(".layer-tips p").text($(this).text());
       $(".layer-tips").show();
       setTimeout(function(){
           $(".layer-tips").hide();
   },500);

    });
    $(".city_list p").click(function () {
        $(".city_select").hide();
        if($(".city_title").text()=="请选择出发城市"){
            $(".position_start").val($(this).text());
        }else {
            $(".position_end").val($(this).text());
        }

    });

}

function getLocation()
{
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else
    {
        $(".local_city span").html("该浏览器不支持获取地理位置。");
    }
}
var wd="";//当前维度
var jd="";//当前经度
//各个站点经纬度
function showPosition(position) {
    //得到当前坐标
    wd = position.coords.latitude;
    jd = position.coords.longitude;

    //请求当前城市
    $.ajax({
        type: "POST",
        url: "http://restapi.amap.com/v3/geocode/regeo?key=c253adabaf476fdbee7247cec2bab9ac&location=" + jd + "," + wd + "&extensions=all&batch=false&roadlevel=1",
        dataType: "json",
        success: function (data) {
            $(".local_city span").html(data.regeocode.addressComponent.city);
        },
        error: function () {
            alert("请求失败");
        }
    });
}