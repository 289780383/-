
    font_size();
    window.onresize = function() {
        font_size();
    };

    function font_size() {
        var deviceWidth = document.documentElement.clientWidth;
        if (deviceWidth > 750) deviceWidth = 750; //640为设计稿宽度三处需要修改
        document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
    }
    /**是否首次登陆*/
    var first_or = true;
        /**是否邀请分享*/
    var share_or= false;
    $(function() {
            /**用于关闭个人信息页*/
    // touch swipe手势
    $(".my_home").swipe(
            {//*swipe (事件，滑动的方向，滑动的距离，一次滑动的时间 , 几根手指)
                swipe: function (event, direction, distance, duration, fingerCount) {
                    if (direction == "left") {
                        $(".mask").hide();
                        $(".my_home").hide();
                    } else if (direction == "up") {
                        $(".mask").hide();
                        $(".my_home").hide();
                    }
                }
            });
    /**是否首次登陆*/
        first_show(first_or);
            /**邀请分享*/
        share_show(share_or);
        $(".header_right").on("click",go_payment_code);
$(".line_item").on("click",sel_line);
    });
    function sel_line(){
        if(!$(this).hasClass('.qsd_item')){
            window.open("city_yue.html","_self","");
        }
    }
    function go_payment_code(){
        window.open("payment_code.html","_self","");
    }
    /**首次登陆优惠*/
    function first_show(k) {
        if (k) {
            var str = '';
            str += '<div class="first_login">';
            str += '<img src="images/close_first_03.png" class="the_close">';
            str += '<p class="the_title">注册领取</p>';
            str += '<p class="the_money">¥200</p>';
            str += '<p class="the_msg">完成实名注册的用户即可获得</p>';
            str += '<p class="the_time">2017.4.6-4.8</p>';
            str += '<p class="the_first_btn">立即注册</p></div>';
            $("body").append(str);
            $(".first_login,.mask").show();
            $("html,body").css({ "height": "100%", "overflow": "hidden" });
            $(".first_login .the_close").click(function() {
                $(".first_login,.mask").hide();
                $("html,body").css({ "height": "auto", "overflow": "auto" });
            });
            $(".first_login .the_first_btn").click(function() {
                $(".first_login,.mask").hide();
                $(".the_header .header_left").trigger('click');
                $("html,body").css({ "height": "auto", "overflow": "auto" });
            });
        }
    }
    /**邀请分享*/
    function share_show(k) {
        if (k) {
            var str = '';
            str += '<div class="share">';
            str += '<img src="images/close_first_03.png" class="the_close">';
            str += '<p class="the_msg">邀请好友注册成功后，被邀请人即可获得100元优惠券奖励；被邀请人在首次消费后，产生实际消费金额，邀请人可获得100元优惠券奖励。</p>';
            str += '<div class="the_share_btn"><img src="images/wx_01.gif" class="share_wx"><img src="images/qq_01.gif" class="share_qq"></div></div>';
            $("body").append(str);
            $(".share,.mask").show();
            $("html,body").css({ "height": "100%", "overflow": "hidden" });
            $(".share .the_close").click(function() {
                $(".share,.mask").hide();
                $("html,body").css({ "height": "auto", "overflow": "auto" });
            });
            $(".the_share_btn img").click(function() {
                if($(this).hasClass('share_wx')){
                	alert("微信分享");
                }else{
                	alert("qq分享");
                }
            });
        }
    }
