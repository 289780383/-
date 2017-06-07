var num1=0;/**首次加载评论数量*/
var num2=5;/**累加加载评论数量*/
var str="";/**数据信息*/
$(function () {
    /**ajax*/
    student_pj();
    /**固定find导航*/
    $(window).scroll(function () {
        if ($("body").scrollTop() >= $(".main_bot").offset().top - $("header").height()) {
            $(".bot_nav").addClass("bot_nav_fixed");
            $(".main_bot").addClass("main_bot_");
        } else {
            $(".bot_nav").removeClass("bot_nav_fixed");
            $(".main_bot").removeClass("main_bot_");
        }
    });
    /**导航按钮*/
    $(".bot_nav li").on("click", bot_nav);
    $(".bot_nav li").eq(0).addClass("sel_nav");
    $(".bot-info>li").hide();
    $(".bot-info>li").eq(0).show();

    /**我要报名我要评价*/
    $(".btn_bm").click(function(){
        window.open("want_apply.html","_self","");
    });
    $(".btn_dp").click(function(){
        window.open("school_review.html","_self","");
    });
    /**打开地图查看线路*/
    $(".head_map").on("click",open_map);
});
/**打开地图查看线路*/
function open_map(){
    window.open("map.html","_self","");
}
/**导航按钮*/
var flag1;/**标记点击的是不是点评*/
function bot_nav() {
    flag1=0;
    $(".footer_tishi").hide();
    var nav_type = $(this).text().trim();
    $(".bot_nav li").removeClass("sel_nav");
    $(this).addClass("sel_nav");
    $(".bot-info>li").hide();
    $("footer a").hide();
    switch (nav_type) {
        case"驾校简介":
            $(".bot-info>li").eq(0).show();
            $(".btn_bm").show();
            break;
        case"课程班型":
            $(".bot-info>li").eq(1).show();
            $(".btn_bm").show();
            break;
        case"教学环境":
            $(".bot-info>li").eq(2).show();
            $(".btn_bm").show();
            break;
        case"学员点评":
            flag1=1;
            num1=0;
            student_pj();
            $(".bot-info>li").eq(3).show();
            $(".btn_dp").show();
    }
    if($(this).parent().hasClass("bot_nav_fixed")){
        $("body").scrollTop($(".main_bot").offset().top-$(".bot_nav").height());
    }

}
/**ajax*/
function student_pj(){
    var did = $.getUrlParam('id');
    $.ajax({
        type:"POST",
        url:"data/school_pingjia.json",
        data:{
            id: did
        },
        dataType: "json",
        success:function(data){
            data_load(data);
            $(".student_evaluate").html(str);
            $(window).on("scroll",function(){
                var h1=$("body").outerHeight();
                var h2=$("body").scrollTop();
                var h3=$(window).height();
                if(h1-h2<=h3){
                    data_load(data);
                    $(".student_evaluate").append(str);
                }
            })

        },
        error:function(data){
            msg_show("学员点评加载失败",3000);
        }
    });

}

/**学员评价加载*/
function data_load(data){
    str="";
    for(var i=num1;i<num1+num2;i++){
        if(data.student_pj[i]==undefined){
            if($(".footer_tishi").css("display")=="none"){
                if(flag1==1){
                    $(".footer_tishi").show();
                }
            }
            break;
        }
        str+='<div class="evaluate_item">';
        str+='<img src='+data.student_pj[i].head_pic+' class="evaluate_pic">';
        str+='<section class="evaluate_msg">';
        str+='<div class="msg1"><p>'+data.student_pj[i].tel+'</p><i>'+data.student_pj[i].time+'</i></div>';
        str+='<div class="msg2"><p>'+data.student_pj[i].text+'</p></div>';
        str+='<ul class="msg3">';
        str+='<li><p>教练服务</p><div>';
        for(var j=0;j<data.student_pj[i].star1;j++){
            str+='<img src="images/drv/v1/star.gif">';
        }
        for(var k=0;k<5-data.student_pj[i].star1;k++){
            str+='<img src="images/drv/v1/star2.gif">';
        }
        str+='</div>';
        str+='</li>';
        str+='<li><p>通过率</p><div>';
        for(var l=0;l<data.student_pj[i].star2;l++){
            str+='<img src="images/drv/v1/star.gif">';
        }
        for(var m=0;m<5-data.student_pj[i].star2;m++){
            str+='<img src="images/drv/v1/star2.gif">';
        }
        str+='</div>';
        str+='</li>';
        str+='<li><p>练车环境</p><div>';
        for(var n=0;n<data.student_pj[i].star3;n++){
            str+='<img src="images/drv/v1/star.gif">';
        }
        for(var o=0;o<5-data.student_pj[i].star3;o++){
            str+='<img src="images/drv/v1/star2.gif">';
        }
        str+='</div></li></ul></section></div>';
    }
    num1=num1+num2;
}
