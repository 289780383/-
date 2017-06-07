$(function () {
    /**赞*/
    $(".the_zan").on("click", the_zan);
    /**评论*/
    $(".the_comment").on("click", the_comment);
    /**取消评论*/
    $(".reply_cancel").on("click", reply_cancel);
    /**确认评论*/
    $(".reply_sure").on("click", reply_sure);
    /**检测输入框的值*/
    $(".reply_text").on('focus', reply_text);
    /**静态页面谢了几个下面的0变成几,5代表每次加载的个数*/
    data_load(0, 5);
});
/**赞*/
function the_zan() {
    var num = $(this).text();
    if ($(this).hasClass("the_zan2")) {
        $(this).removeClass("the_zan2");
        num--;
    } else {
        $(this).addClass("the_zan2");
        num++;
    }
    $(this).text(num);
}
/**评论*/
function the_comment() {
    $(".reply,.mask2").show();
}
/**取消评论*/
function reply_cancel() {
    $(".reply,.mask2").hide();
    $(".reply_text").val("请输入回复内容");
}
/**确认评论*/
function reply_sure() {
    console.log($(".reply_text").val());
    if ($(".reply_text").val().NoSpace() == "" || $(".reply_text").val().NoSpace() == "请输入回复内容") {
        msg_show("输入无效，请重新输入", 3000);
    } else {
        reply_cancel();
        msg_show("回复成功", 3000);
        var num = $(".the_comment").text().NoSpace();
        num++;
        $(".the_comment").text(num);
    }

}
/**检测输入框的值*/
function reply_text() {
    if ($(".reply_text").val().NoSpace() == "请输入回复内容") {
        $(".reply_text").val("");
    }
}
/**评论加载*/
$(window).on("scroll", function () {
    var h1 = $("body").outerHeight();
    var h2 = $("body").scrollTop();
    var h3 = $(window).height();
    if (h1 - h2 <= h3) {
        /**已经存在的条数*/
        var num = $(".main_bot>li").length;
        /**每次请求返回的条数*/
        var k = 3;
        data_load(num, k);
    }
});
function data_load(num, k) {
    $.ajax({
        type: "POST",
        url: "data/pl.json",
        data: {
            the_number: num
        },
        dataType: "json",
        success: function (data) {
            var str = '';
            for (var i = num; i < num + k; i++) {
                if (i>=data.pl.length) {
                    break;
                }
                str += '<li>';
                str += '<div class="the_top">';
                str += '<img src="' + data.pl[i].user_pic + '" class="user_head">';
                str += '<p class="user_name over_ellipsis">' + data.pl[i].user_name + '</p>';
                str += '<span class="user_floor">' + (i + 1) + '楼</span> ';
                str += '</div>';
                str += '<div class="the_middle">' + data.pl[i].text + '</div>';
                str += '<div class="the_bottom">';
                str += '<p class="the_time">' + data.pl[i].time + '</p>';
                str += '</div>';
                str += '</li>';
            }
            if(num==0){
                $(".main_bot").html(str);
            }else {
                $(".main_bot").append(str);
            }
            if($(".main_bot li").length==data.pl.length){
                msg_show("没有更多了", 3000);
            }

        },
        error: function (data) {
            msg_show("加载失败，请重试", 3000);
        }
    });

}