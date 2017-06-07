$(function(){
    /**初始化*/
    $(".main_nav p").eq(0).addClass("sel_nav");
    $(".the_one").show();
    /**导航按钮*/
    $(".main_nav p").on("click", main_nav);
});

function main_nav() {
    $(".main_nav p").removeClass("sel_nav");
    $(this).addClass("sel_nav");
    $(".record_main ul").hide();
    if($(this).index()==0){
        $(".the_one").show();
    }else if($(this).index()==1) {
        $(".the_two").show();
    }
}
