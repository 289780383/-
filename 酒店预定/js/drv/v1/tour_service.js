$(function(){
    /**初始化*/
    $(".main_nav p").eq(0).addClass("sel_nav");
    $(".tour_one").show();
    /**导航按钮*/
    $(".main_nav p").on("click", main_nav);
    /**点击开始搜索*/
    $(".head_search").on("click",head_search);

    /**点击酒店返回按钮*/
    $(".close_mask").on("click",close_mask);

});

function main_nav() {
    $(".main_nav p").removeClass("sel_nav");
    $(this).addClass("sel_nav");
    $(".tour_main ul").hide();
    if($(this).index()==0){
        $(".tour_one").show();
    }else if($(this).index()==1) {
        $(".tour_out").show();
    }else{
        $(".tour_long").show();
    }
}
function head_search(){
    $(".tour_search").show();
}
function close_mask(){
    $(this).parent().parent().hide();
}
