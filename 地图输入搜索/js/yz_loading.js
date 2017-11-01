//$("***").loading();开启
//$("***").close();关闭
(function($) {
    var settings = {
        "time": 500
    };
    var timer, time_c; //定义定时器
    var init = function(the) {
        creat_el(the);
        style_el(the);
        animation(the);
        //close(the);//内容加载完毕结束
    }
    var creat_el = function(the) {
        $(the).append(`<div id="load-bg"></div>
        <div id="load-inner">
            <img src="images/yz-load-top.png" id="load-big">
            <div id="small1">
                <img src="images/yz-load-k.png">
                <img src="images/yz-load-k.png">
                <img src="images/yz-load-k.png">
                <img src="images/yz-load-k.png">
                <img src="images/yz-load-k.png">
            </div>
            <div id="small2">
                <img src="images/yz-load-s.png">
                <img src="images/yz-load-s.png">
                <img src="images/yz-load-s.png">
                <img src="images/yz-load-s.png">
                <img src="images/yz-load-s.png">
            </div>
        </div>`);
    }
    var style_el = function(the) {
        $("head").append(`<style type="text/css">
        @keyframes change {
    0% {
        transform:rotate(-3deg);
    }
    50% {
        transform:rotate(3deg);
    }
    100% {
        transform:rotate(-3deg);
    }
}
    </style>`);
        $(the).find('#load-bg').css({
            "background-color": "#fff",
            "position": "fixed",
            "width": "100%",
            "height": "100%",
            "left": 0,
            "top": 0,
            "z-index": 900000
        });
        $(the).find('#load-inner').css({
            "position": "fixed",
            "transform": "translate(-50%,-50%)",
            "left": "50%",
            "top": "50%",
            "z-index": 900009
        });
        $(the).find('#load-inner div').css({
            "overflow": "hidden"
        });
        $(the).find('#load-inner #small2').css({
            "position": "fixed",
            "left": 0,
            "bottom": 0
        });

        $(the).find('#load-big').css({
            "display": "block",
            "width": "1.9rem",
            "margin-bottom": "0.1rem",
            "animation": "change 2s linear infinite"
        });

        $(the).find('#small1 img').css({
            "display": "block",
            "float": "left",
            "width": "0.18rem",
            "height": "0.18rem",
            "margin": "0.1rem",
        });
        $(the).find('#small2 img').css({
            "display": "none",
            "float": "left",
            "width": "0.18rem",
            "height": "0.18rem",
            "margin": "0.1rem"

        });

    }
    var animation = function(the) {
        var n = 0;
        an_fn();

        function an_fn() {
            console.log(n);
            $(the).find('#small2 img').eq(n).css("display", "block");
            n++;

            if (n >= $(the).find('#small2 img').length + 1) {
                n = 1;
                $(the).find('#small2 img').css("display", "none");
                $(the).find('#small2 img').eq(0).css("display", "block");
            }
            timer = setTimeout(an_fn, settings.time);
        }
    }
    var close = function(the) {
        document.onreadystatechange = subSomething; //当页面加载状态改变的时候执行这个方法. 
        function subSomething() {
            if (document.readyState == "complete") //当页面加载状态 
                clearTimeout(timer);
                clearTimeout(time_c);
                $(the).hide();
        }
    }
    /**手动关闭*/
    $.fn.close = function() {
        document.onreadystatechange = subSomething; //当页面加载状态改变的时候执行这个方法. 
        function subSomething() {
            if (document.readyState == "complete") //当页面加载状态 
                clearTimeout(timer);
                clearTimeout(time_c);
                $(this).hide();
        }
    }
    $.fn.loading = function(options) {
        //创建一些默认值，拓展任何被提供的选项
        settings = $.extend({}, settings, options);
        init(this);
    };
})(jQuery);