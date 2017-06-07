$(function () {
    /**ajax*/
    school_ajax();
    /**轮播*/
    lunbo_ul(".pic_warp", ".pic_nav");
    /**find*/
    $(".find_nav p").eq(0).addClass("find_active");
    $(".find_teacher").hide();
    $(".find_nav p").on("click", find_nav);
    /**固定find导航*/
    $(window).scroll(function(){
        if ($("body").scrollTop() >= $(".main").offset().top) {
            $(".find_nav").addClass("find_nav_fixed");
            $(".find_join").hide();
            $(".main").addClass("main_");
        } else {
            $(".find_nav").removeClass("find_nav_fixed");
            $(".main").removeClass("main_");
        }
    });
/**nav跳转*/
    $(".nav li").on("click",nav_newpage);
    /**点击跳转详情页*/
$(".find_school li").on("click",find_school);
$(".find_teacher li").on("click",find_teacher);
});

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
var jl_json;
/**find*/
function find_nav() {
    $(".find_nav p").removeClass("find_active");
    $(this).addClass("find_active");
    if ($(this).index() == "0") {
        school_ajax();
        $(".find_teacher,.find_join").hide();
        $(".find_school").show();
    } else {
        num1=0;
        teacher_ajax();

        $(".find_school").hide();
        $(".find_teacher,.find_join").show();
    }
    if($(this).parent().hasClass("find_nav_fixed")){
        $("body").scrollTop($(".main").offset().top);
        $(".find_join").hide();
    }
}

/**点击跳转详情页*/
function find_school(){
    var school_id=$(this).attr("data-id");
    window.open("school_info.html?id="+school_id+"","_self","");
}function find_teacher(){
    var teacher_id=$(this).attr("data-id");
    window.open("teacher_info.html?id="+teacher_id+"","_self","");
}
/**nav跳转*/
function nav_newpage(){
    var i=$(this).index();
    if(i==0){
        window.open("school_provide.html","_self","");
    }
}



var num1=0;/**首次加载的数目*/
var num2=5;/**每次加载的数目*/
var str="";
/**教练加载*/
function teacher_add(data){
    str="";
    for(var i=num1;i<num1+num2;i++){
        if(data.teacherResult[i]==undefined){
            $(".footer_tishi").show();
           break;
        }else {
            $(".footer_tishi").hide();
        }
        str+='<li data-id='+data.teacherResult[i]['did']+'>';
        str+='<img src='+data.teacherResult[i]['pic']+' class="show_pic">';
        str+='<section class="show_msg">';
        str+='<p class="the_name"><span>'+data.teacherResult[i]['name']+'</span><img src="images/drv/v1/v.gif" class="vip_pic"><i>'+data.teacherResult[i]['age']+'</i></p>';
        str+='<div class="the_star">';
        for(var j=0;j<data.teacherResult[i]['star_n'];j++){
            str+='<img src="images/drv/v1/star.gif">';
        }
        for(var l=0;l<5-data.teacherResult[i]['star_n'];l++){
            str+='<img src="images/drv/v1/star2.gif">';
        }
        str+='</div>';
        str+='<p class="the_money">¥'+data.teacherResult[i]['money']+'</p>';
        str+='</section>';
        str+='<p class="the_price">'+data.teacherResult[i]['price']+'</p>';
        str+='<p class="evaluate">'+data.teacherResult[i]['evaluate']+'</p>';
        str+='</li>';
    }
    num1=num1+num2;
}
/**ajax*/
function school_ajax(){
    $.ajax({
        type:"POST",
        url:"data/index.json",
        dataType: "json",
        success:function(data){
             str="";
            for(var i=0;i<data.schoolResult.length;i++){
                str+='<li data-id='+data.schoolResult[i].did+'>';
                str+='<img src='+data.schoolResult[i].pic+' class="show_pic">';
                str+='<section class="show_msg">';
                str+='<p class="the_name"><span>'+data.schoolResult[i].name+'</span><img src="images/drv/v1/v.gif" class="vip_pic"></p>';
                str+='<div class="the_star">';
                for(var j=0;j<data.schoolResult[i].star_n;j++){
                    str+='<img src="images/drv/v1/star.gif">';
                }
                for(var l=0;l<5-data.schoolResult[i].star_n;l++){
                    str+='<img src="images/drv/v1/star2.gif">';
                }
                str+='</div>';
                str+='<p class="the_money">¥'+data.schoolResult[i].money+'</p>';
                str+='</section>';
                str+='</li>';
            }
            $(".find_school").html(str);
            $(".find_school li").on("click",find_school);

        },
        error:function(data){
            msg_show("加载失败",3000);
        }
    });
}
function teacher_ajax(){
    $.ajax({
        type:"POST",
        url:"data/index.json",
        dataType: "json",
        success:function(data){
            teacher_add(data);
            $(".find_teacher").html(str);
            $(".find_teacher li").on("click",find_teacher);
            $(window).on("scroll",function(){
                var h1=$("body").outerHeight();
                var h2=$("body").scrollTop();
                var h3=$(window).height();
                if(h1-h2<=h3){
                    teacher_add(data);
                    $(".find_teacher").append(str);
                    $(".find_teacher li").on("click",find_teacher);
                }
            })
        },
        error:function(data){
            msg_show("加载失败",3000);
        }
    });

}
