/**去除字符串空格*/
String.prototype.NoSpace = function(){
    return this.replace(/\s+/g, "");
};
/**文档加载*/
$(function(){
    /**创建消息提示框*/
    $("body").append("<div class='mask'></div><div class='mask2'></div><img src='images/loading.gif' class='loading_pic'>");

});

    /**消息提示*/
    function msg_show1(msg, tm=1500) {
        if ($(".msg_show").length >= 1) {
            return;
        }
        $("body").append("<div class='msg_show'><p>" + msg + "</p></div><div class='mask_w'></div>");
        setTimeout(function() {
            $(".msg_show,.mask_w").remove();
        }, tm);
    }
    font_size();
    window.onresize = function() {
        font_size();
    };

    function font_size() {
        var deviceWidth = document.documentElement.clientWidth;
        if (deviceWidth > 750) deviceWidth = 750; //640为设计稿宽度三处需要修改
        document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
    }

//解决手机端延迟300毫秒

$(function(){
    FastClick.attach(document.body);  
})