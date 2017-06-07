

function font_size() {
    var deviceWidth = document.documentElement.clientWidth;
    if (deviceWidth > 750) deviceWidth = 750;//640为设计稿宽度三处需要修改
    document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
};
/**文档加载*/
$(function(){
    /**设置页面基本单位*/
    font_size();
    window.onresize = function () {
    font_size();
};

    /**创建消息提示框*/
    $("body").append("<div class='msg_show'></div><div class='mask'></div><div class='mask2'></div><img src='images/drv/v1/loading.gif' class='loading_pic'>");
/*点击遮罩区隐藏提示
   $(".mask,.mask2").click(function(){
       if($(".msg_show").css("display")=="block"){
           $(this).hide();
           $(".msg_show").hide();
       }
   });
*/
    /**处理input*/
    $("input").focus(function(){
        $(this).blur(function(){
            if($(this).val().trim()==""){
                $(this).val("");
            }
        });
    });

});
/**消息提示*/
function msg_show(msg,tm){
    if($(".msg_show").css("display")=="block"){
        return;
    }
    $(".msg_show,.mask").show();
    $(".msg_show").append("<p>"+msg+"</p>");
    setTimeout(function () {
        $(".msg_show,.mask").hide();
        $(".msg_show p").remove();
    }, tm);
}
/**解析url*/
(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
})(jQuery);
/**去除字符串空格*/
String.prototype.NoSpace = function(){
    return this.replace(/\s+/g, "");
};