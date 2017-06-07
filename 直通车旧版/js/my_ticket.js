    font_size();
    window.onresize = function() {
        font_size();
    };

    function font_size() {
        var deviceWidth = document.documentElement.clientWidth;
        if (deviceWidth > 750) deviceWidth = 750; //640为设计稿宽度三处需要修改
        document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
    }
    $(function() {
        /**长按验票*/
        var btn = document.getElementsByClassName("item_btn")[0];
        /**是否付款*/
        var pay_or = false;
        /**限制十秒钟可点击一次定时器*/
        var ten_or = true;
        btn.addEventListener('touchstart', function() {
            var timer;
            if (ten_or) {
                ten_or = false;
                clearTimeout(timer);
                timer = setTimeout(function() {
                    ten_or = true;
                }, 10000);
            } else {
                return;
            }
            if (pay_or) {
                $(".main").css("animation", "run_on 1s infinite linear");
            } else {
                $(".main").css("animation", "run_off 1s infinite linear");
            }

        });
        btn.addEventListener('touchend', function() {
            $(".main").css("animation", "");
        });
        document.addEventListener('touchstart', function(e) {
        e.preventDefault();
        }, false);

    });
