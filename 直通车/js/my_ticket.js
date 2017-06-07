    font_size();
    window.onresize = function() {
        font_size();
    };

    function font_size() {
        var deviceWidth = document.documentElement.clientWidth;
        if (deviceWidth > 750) deviceWidth = 750; //640为设计稿宽度三处需要修改
        document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
    }
