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
/*    font_size();//使用flexible.js替换掉
    window.onresize = function() {
        font_size();
    };

    function font_size() {
        var deviceWidth = document.documentElement.clientWidth;
        if (deviceWidth > 750) deviceWidth = 750; //640为设计稿宽度三处需要修改
        document.getElements.style.fontSize = deviceWidth / 7.5 + 'px';
    }*/

//解决手机端延迟300毫秒

$(function(){
    FastClick.attach(document.body);  
})
/**底部导航*/
$(function(){
    $(".nav").delegate("li","click",nav_fn);
})
var nav_fn=function(){
    if($(this).hasClass("n_index")||$(this).hasClass("n_trip")||$(this).hasClass("n_mine")){
        return;
    }
    var index=$(this).index();
    switch(index){
        case 0:
        window.open("index.html","_self","");
        break;
        case 1:
        window.open("trip.html","_self","");
        break;
        case 2:
        window.open("mine.html","_self","");
    }
};
$(function() {
    $(".wm_s").on("click", function() {
        var src = $(this).attr("src");
        load_img(src);
        if ($(".wm_big").length == 0) {
            $("body").append('<img src="' + src + '" class="wm_big">');
        } else {
            $(".wm_big").attr("src", src);
        }
        $(".wm_big").attr("style","position:fixed;left: 50%;top:50%;transform: translate(-50%,-50%);display: block;background-color: #fff;padding:0.5rem;border-radius: 0.2rem;width: 5rem;height: 5rem;z-index: 200;");
        $(".wm_big").show();
        $(".mask").on("click", function() {
            $(".wm_big,.mask").hide();
        });
    });
/**加载图片*/
    function load_img(src) {
        $(".loading_pic,.mask").show();
        var im = new Image();
        $(im).on("load error", function() {
            $(".loading_pic").hide();
        });
        im.src = src;
    }
})
