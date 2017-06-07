/**点击出发点*/
function start_station(){
$(".city_title").text("请选择取车地点");
    $(".city_sel").text(my_city);
    $(".city_pin,.city_nav,.city_main").hide();

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
                {"letter":"a","city": ["石家庄", "阿拉善", "安庆"]},
                {"letter":"b","city": ["石家庄", "阿拉善", "安庆"]},
                {"letter":"c","city": ["石家庄", "阿拉善", "安庆"]},
                {"letter":"d","city": ["石家庄", "阿拉善", "安庆"]},
                {"letter":"e","city": ["石家庄", "阿拉善", "安庆"]},
                {"letter":"f","city": ["石家庄", "阿拉善", "安庆"]},
                {"letter":"a","city": ["石家庄", "阿拉善", "安庆"]},
                {"letter":"b","city": ["石家庄", "阿拉善", "安庆"]},
                {"letter":"c","city": ["石家庄", "阿拉善", "安庆"]},
                {"letter":"d","city": ["石家庄", "阿拉善", "安庆"]},
                {"letter":"e","city": ["石家庄", "阿拉善", "安庆"]},
                {"letter":"f","city": ["石家庄", "阿拉善", "安庆"]}

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
                {"letter":"a","city": ["哈尔滨", "阿拉善", "安庆"]},
                {"letter":"b","city": ["哈尔滨", "阿拉善", "安庆"]},
                {"letter":"c","city": ["哈尔滨", "阿拉善", "安庆"]},
                {"letter":"d","city": ["哈尔滨", "阿拉善", "安庆"]},
                {"letter":"e","city": ["哈尔滨", "阿拉善", "安庆"]},
                {"letter":"f","city": ["哈尔滨", "阿拉善", "安庆"]}
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
    $(".city_sel").show();
    $(".city_pin,.city_nav,.city_main").hide();
    $(".city_select").hide();
}

/**点击标题小城市*/
function city_sel(obj){
$(".point_list").hide();
    $(obj).hide();
    $(".city_pin,.city_nav,.city_main").show();
    $(".city_pin").val("");
    if($(".city_title").text()=="请选择取车地点"){
        $(".city_title").text("请选择取车城市");
    }else {
        $(".city_title").text("请选择还车城市");
    }

}
/**点击目的城市*/
function end_station(){
    $(".city_title").text("请选择还车地点");
    $(".city_sel").text(my_city);
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
                {"letter":"y","city": ["烟台市", "烟台市", "烟台市", "烟台市", "烟台市", "烟台市"]},
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
                {"letter":"y","city": ["烟台市", "烟台市", "烟台市", "烟台市", "烟台市", "烟台市"]},
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
    $(".city_sel").text($(obj).find("span").text());
    $(".city_pin,.city_nav,.city_main").hide();
    $(".city_sel").show();
    $.ajax({
        url:"",
        type:"get",
        datatype:"json",
        /**请求城市具体点*/
        success:function(date){
            $(".city_point").on("click",city_point);
            $(".point_list").show();
            if($(".city_title").text()=="请选择取车城市"){
                $(".city_title").text("请选择取车地点");
            }else {
                $(".city_title").text("请选择还车地点");
            }

        },
        error:function(date){
            $(".city_point").on("click",city_point);
            $(".point_list").show();
            if($(".city_title").text()=="请选择取车城市"){
                $(".city_title").text("请选择取车地点");
            }else {
                $(".city_title").text("请选择还车地点");
            }

        }
    });

}
/**城市列表滚动*/
function gundong() {

    $(".city_nav li").click(function () {
        $("html,body").animate({scrollTop: $(".c_" + $(this).text().toLocaleLowerCase() + "").offset().top - $(".city_top").height()}, 1000);
    });
    $(".city_list p").click(function () {
        $(".city_sel").show();
        $(".city_sel").text($(this).text());
        $(".city_pin,.city_nav,.city_main").hide();
$(".point_list").show();
        if($(".city_title").text()=="请选择取车城市"){
            $(".city_title").text("请选择取车地点");
        }else {
            $(".city_title").text("请选择还车地点");
        }

    });
}
$(function(){
    /**填入值*/
    $(".city_point").on("click",city_point);
})
/**填入值*/
function city_point(){
    var city=$(".city_sel").text();
    var city_point=$(this).find("p").text();
    if($(".city_title").text()=="请选择取车地点"){
        $(".get_point").text(city+" · "+city_point);
    }else {
        $(".lose_point").text(city+" · "+city_point);
    }
    city_fh();
}
