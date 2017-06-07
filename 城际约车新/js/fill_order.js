    font_size();
    window.onresize = function() {
        font_size();
    };

    function font_size() {
        var deviceWidth = document.documentElement.clientWidth;
        if (deviceWidth > 750) deviceWidth = 750; //640为设计稿宽度三处需要修改
        document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
    }


    function pay_way(obj) {
        $(".way_list li").removeClass("sel_way");
        $(obj).addClass('sel_way');
    }

    function ride_way(obj) {
        $(".ride_list span").removeClass("selected");
        $(obj).find("span").addClass("selected");
        var coupon = parseInt($(".coupon_money").text().trim().substring(1));
        if ($(".coupon_money").text().trim() == "") {
            coupon = 0;
        }
        var m = parseFloat($(".pay_money span").text() - coupon).toFixed(2);
        $(".all_money").text(m);
    }
    /**最终价格初始化*/
    function money_init() {
        var coupon = parseInt($(".coupon_money").text().trim().substring(1));
        if ($(".coupon_money").text().trim() == "") {
            coupon = 0;
        }
        var m = parseFloat($(".pay_money span").text() - coupon).toFixed(2);
        $(".all_money").text(m);
    }
    /**打开优惠券界面*/
    function open_coupon() {
        $(".sel_warp").show();
        $("html,body").css("overflow", "hidden");
        var val = $(this).find(".coupon_money").text().trim();
        if (val == "") {
            return;
        } else {
            val = val.substring(1);
            $(".money_warp span").each(function(i, e) {
                $(this).parents("li").find(".sel_1").removeClass('sel_1');
                if (val == $(this).text().trim()) {
                    $(this).parents("li").find("i").addClass('sel_1');
                }
            });
        }
    }
    /**退出优惠选择*/
    function close_coupon() {
        $(".sel_warp").hide();
        $("html,body").css("overflow", "auto");
    }
    /**选择优惠券*/
    function conpon_list() {
        var the_i = $(this).find("i");
        if (the_i.hasClass("sel_0")) {
            return;
        } else if (the_i.hasClass("sel_1")) {
            the_i.removeClass("sel_1");
        } else {
            $(".sel_1").removeClass('sel_1');
            the_i.addClass("sel_1");
        }

    }
    /**点击确定*/
    function coupon_sure() {
        var val = $(".sel_1").parents("li").find(".money_warp").text();
        $(".coupon_money").text(val);
        money_init();
        close_coupon();
    }
    /**选择联系人*/
    function open_contacts() {
        var tel = $(this).parent().find(".the_tel span").text().trim();
        $(".contacts_list li").each(function(i) {
            if ($(this).find(".the_tel span").text().trim() == tel) {
                $(this).addClass('sel_contacts');
            } else {
                $(this).removeClass('sel_contacts');
            }
        });
        if ($(".contacts_list .sel_contacts").length == 0) {
            $(".contacts_list li").eq(0).addClass('sel_contacts');
        }
        $(".contacts_warp").show();
    }

    function close_contacts() {
        $(".contacts_warp").hide();
    }

    function add_contacts() {
        $(".add_contacts_mask,.mask_add").show();
    }

    function contacts_sel() {
        $(".contacts_list li").removeClass('sel_contacts');
        $(this).addClass('sel_contacts');
    }

    function contacts_jian(e) {
        $(this).parents("li").remove();
        e.stopPropagation();
    }

    function contacts_cancel() {
        $(".add_contacts_mask").find(".the_name input").val("");
        $(".add_contacts_mask").find(".the_tel input").val("");
        $(".add_contacts_mask,.mask_add").hide();
    }

    function talk_save() {
        if ($(".sel_contacts").length > 0) {
            var name = $(".sel_contacts .the_name span").text().trim();
            var tel = $(".sel_contacts .the_tel span").text().trim();
            $(".main_list .the_name span").text(name);
            $(".main_list .the_tel span").text(tel);
            $(".contacts_warp").hide();
        } else {
msg_show1("请先选择一项",2000);
        }
    }

    function contacts_save() {
        var name = $(this).parents(".add_contacts_mask").find(".the_name input").val().trim();
        var tel = $(this).parents(".add_contacts_mask").find(".the_tel input").val().trim();
        if (name.length == 0) {
            $(this).parents(".add_contacts_mask").find(".the_name input").attr("placeholder", "姓名不能为空");
            return;
        } else {
            $(this).parents(".add_contacts_mask").find(".the_name input").attr("placeholder", "填写姓名");
        }
        if (!/^(13[0-9]|14[579]|15[012356789]|17[0135678]|18[0-9])\d{4}\d{4}$/.test(tel)) {
            $(this).parents(".add_contacts_mask").find(".the_tel input").val("");
            $(this).parents(".add_contacts_mask").find(".the_tel input").attr("placeholder", "手机号格式错误");
            return;
        } else {
            $(this).parents(".add_contacts_mask").find(".the_tel input").attr("placeholder", "填写手机号");
        }
        var str = '<li><div class="the_name"><p>姓名</p><span>' + name + '</span></div><div class="the_tel"><p>手机</p><span>' + tel + '</span></div><i></i></li>';
        $(".contacts_list").append(str);
        contacts_cancel();
        $(".contacts_list li").on("click", contacts_sel);
        $(".contacts_list i").on("click", contacts_jian);
    }
    $(function() {
        money_init();
        $(".coupon").on("click", open_coupon);
        $(".coupon_list li").on("click", conpon_list);
        $(".coupon_sure").on("click", coupon_sure);
        /**选择联系人*/
        $(".main_list .the_name").on("click", open_contacts);
        $(".add_contacts").on("click", add_contacts);
        $(".contacts_list li").on("click", contacts_sel);
        $(".contacts_list i").on("click", contacts_jian);
        $(".contacts_cancel").on("click", contacts_cancel);
        $(".contacts_save").on("click", contacts_save);
    });
/**消息提示*/
function msg_show1(msg,tm){
    if($(".msg_show").length>=1){
        return;
    }
    $("body").append("<div class='msg_show'><p>"+msg+"</p></div><div class='mask_w'></div>");
    setTimeout(function () {
        $(".msg_show,.mask_w").remove();
    }, tm);
}
