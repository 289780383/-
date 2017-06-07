/**规定页面基本单位*/
font_size();
window.onresize = function () {
    font_size();
};
function font_size() {
    var deviceWidth = document.documentElement.clientWidth;
    if (deviceWidth > 750) deviceWidth = 750;//640为设计稿宽度三处需要修改
    document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
}
set_nav_width();
$(function(){
    /**设置按钮宽度*/
    set_nav_width();
    font_s(1.2);
    function font_s(s){
        var num=s|"1";
        $("body *").each(function(){
            if($(this).attr("date-size")=="1"){
                return;
            }
            var aa=parseInt($(this).css("font-size"))*num+"px";
            $(this).css("font-size",aa);
            $(this).attr("date-size","1");
        })
    }
});
function set_nav_width(){

    var nav_width = $(".item_btn").width();       //获取nav的宽度
    $(".item_btn").each(function(){
        var a_num = $(this).find("span").length;  //获取a标签的数量
        if(a_num>1){
            for(var i=0;i<a_num-1;i++){
                $(this).find("span").eq(i).css("border-right","1px solid #e5e5e5");
            }
        }
        $(this).find("span").css("width", nav_width/a_num-1);

    });

}

