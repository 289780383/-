/**main部分*/
$(function() {
    $("#banci").on("click", banci_fn);
    $("#position").on("click", position_fn);
    $(".mask").on("click", mask_fn);
    /**选择*/
    $(".sel_main").delegate('p', 'click', function() {
        $(this).parents(".sel_main").find("p").removeClass('sel_the');
        $(this).addClass('sel_the');
    });
    /**左右切换*/
    $(".sel_mask i").on("click", prev_next);
    /**点击确定按钮*/
    $(".sel_btn").on("click", sel_btn);
    /**点击加减号*/
    $(".pz_warp").delegate("i", "click", add_jian);
    /**选择支付方式*/
    $(".pay_way li").on("click", pay_way_fn);

})
/**班次*/
var banci_fn = function() {
    var li_w=$(".sel_banci li").length*$(".sel_banci li").eq(0).width()+"px";
    $(".sel_main").css({"left":0,"width":li_w});
    if ($(this).val() == "") {
        $(".sel_banci .sel_main p").removeClass("sel_the");
        $(".sel_banci .sel_main p").eq(0).addClass("sel_the");
    }
    $(".mask").show();
    $(".sel_banci").slideDown();
}
/**乘车点*/
var position_fn = function() {
        var li_w=$(".sel_position li").length*$(".sel_position li").eq(0).width()+"px";
    $(".sel_main").css({"left":0,"width":li_w});
    if ($(this).val() == "") {
        $(".sel_position .sel_main p").removeClass("sel_the");
        $(".sel_position .sel_main p").eq(0).addClass("sel_the");
    }
    $(".mask").show();
    $(".sel_position").slideDown();
}
/**遮罩*/
var mask_fn = function() {
    $(".mask").hide();
    $(".sel_banci,.sel_position").slideUp();
}
/**前后切换*/
var prev_next = function() {
    $(".sel_mask i").off("click", prev_next);
            setTimeout(function(){
      $(".sel_mask i").on("click", prev_next);  
    },500);

    var li_width = $(this).parent().find(".sel_main_warp").width();
    var ul_width = $(this).parent().find(".sel_main").width();
    var ul_left = parseInt($(this).parent().find(".sel_main").css("left"));
    if ($(this).hasClass('sel_prev')) { //向前
        if (ul_left >= 0) {
            return;
        } else {
            $(this).parent().find(".sel_main").css("left", ul_left + li_width + "px");
        }
    } else { //向后
        if (ul_left <= -ul_width + li_width) {
            return;
        } else {
            $(this).parent().find(".sel_main").css("left", ul_left - li_width + "px");
        }

    }

}
/**点击确定*/
var sel_btn = function() {
    if ($(this).parent().hasClass("sel_banci")) {
        var val = $(".sel_banci .sel_the").text().NoSpace();
        $("#banci").val(val);

    } else {
        var val = $(".sel_position .sel_the").text().NoSpace();
        $("#position").val(val);
    }
    mask_fn();
}
/**加减*/
var cr_min = 1,
    cr_max = 10,
    cr_price = 5,
    gb_min = 0,
    gb_max = 10,
    gb_price = 10,
    et_min = 0,
    et_max = 10,
    et_price = 3;
var conputer_money = function() {
    var cr_num = $(".pz_cr .pz_zhi").text().NoSpace();
    var gb_num = $(".pz_gb .pz_zhi").text().NoSpace();
    var et_num = $(".pz_et .pz_zhi").text().NoSpace();
    var all_money = cr_num * cr_price + gb_num * gb_price + et_num * et_price;
    $(".all_money").text(all_money);
}
var add_jian = function() {
    var min, max;
    var zhi = $(this).siblings('.pz_zhi').text();
    if ($(this).hasClass("pz_no")) {
        return;
    }
    if ($(this).hasClass("pz_j")) { //减

        if ($(this).parent().hasClass('pz_cr')) {
            min = cr_min;
        } else if ($(this).parent().hasClass('pz_gb')) {
            min = gb_min;
        } else if ($(this).parent().hasClass('pz_et')) {
            min = et_min;
        }
        --zhi;
        if (zhi <= min) {
            $(this).addClass('pz_no');
        };
        $(this).parent().find(".pz_a").removeClass('pz_no');
        $(this).siblings('.pz_zhi').text(zhi);
        conputer_money();
    } else if ($(this).hasClass("pz_a")) { //加	

        if ($(this).parent().hasClass('pz_cr')) {
            max = cr_max;
        } else if ($(this).parent().hasClass('pz_gb')) {
            max = gb_max;
        } else if ($(this).parent().hasClass('pz_et')) {
            max = et_max;
        }
        ++zhi;
        if (zhi >= max) {
            $(this).addClass('pz_no');
        };
        $(this).parent().find(".pz_j").removeClass('pz_no');
        $(this).siblings('.pz_zhi').text(zhi);
        conputer_money();

    }
}
/**选择支付方式*/
var pay_way_fn = function() {
    $(this).siblings('li').removeClass("pay_sel");
    $(this).addClass("pay_sel");
}