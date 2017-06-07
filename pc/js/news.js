$(function(){
    $(".news_type span").on("click",news_type);
    $(".news_msg span").on("click",news_more);
});
/**切换类型*/
function news_type(){
    $(".news_type span").removeClass("type_active");
    $(this).addClass("type_active");
    if($(this).text()=="新闻"){

    }else{

    }
}
/**打开详细*/
function news_more(){
    window.open("news_more.html","_blank","");
}
