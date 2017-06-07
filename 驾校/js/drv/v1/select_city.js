$(function(){
    /**当前城市*/
   $(".now_city span").text(decodeURI($.getUrlParam('local')));
    /**驾校滚动*/
    $(".city_nav li").on("click",city_nav);
    /**选择城市*/
$(".main p").on("click",select_this);
});
/**驾校滚动*/
function city_nav(){
    msg_show($(this).text(),500);
    var h=$(".title_" + $(this).text()+ "").offset().top - $("header").height();
    $("html,body").animate({scrollTop:h}, 500);
}
/**选择城市*/
function select_this(){
    var city=encodeURI(encodeURI($(this).text().trim()));
    window.open("select_school.html?city="+city+"","_self","");
}