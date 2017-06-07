
/**文档加载*/
$(function(){
    /**创建消息提示框*/
    $("body").append("<div class='msg_show'></div><div class='mask'></div><div class='mask2'></div><img src='images/loading.gif' class='loading_pic'>");

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
/**去除字符串空格*/
String.prototype.NoSpace = function(){
    return this.replace(/\s+/g, "");
};