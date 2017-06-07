$(function () {
/*
    $(".main li .the_zan").on("click", the_zan);
*/
    $(".main li .the_middle").on("click", more_info);
    $(".head_write").on("click", head_write);
    /**静态页面谢了几个下面的0变成几，5代表每次加载的个数*/
    data_load(0, 5);
});
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
function more_info() {
    window.open("topic_info.html", "_self", "");
}
function head_write() {
    window.open("want_publish.html", "_self", "");
}
/**评论加载*/
$(window).on("scroll", function () {
    var h1 = $("body").outerHeight();
    var h2 = $("body").scrollTop();
    var h3 = $(window).height();
    if (h1 - h2 <= h3) {
        /**已经存在的条数*/
        var num = $(".main>li").length;
        /**每次请求返回的条数*/
        var k = 3;
        data_load(num, k);
    }
});
function data_load(num, k) {
    $.ajax({
        type: "POST",
        url: "data/article.json",
        data: {
            the_number: num
        },
        dataType: "json",
        success: function (data) {
            var str = '';
            for (var i = num; i <= num + k; i++) {
                console.log(i,data.pl.length);
                if (i>=data.pl.length) {
                    break;
                }
                str += '<li>';
                str += '<div class="the_top">';
                str += '<img src="'+data.pl[i].user_pic+'" class="user_head">';
                str += '<p class="user_name over_ellipsis">'+data.pl[i].user_name+'</p>';
                str += '<p class="text_title over_ellipsis">'+data.pl[i].the_title+'</p>';
                str += '</div>';
                str += '<div class="the_middle">'+data.pl[i].text+'</div>';
                str += '<div class="the_bottom">';
                str += '<p class="the_time">'+data.pl[i].time+'</p>';
                str += '<span class="the_comment">'+data.pl[i].comment+'</span>';
                str += '<span class="the_zan">'+data.pl[i].zan+'</span>';
                str += '</div>';
                str += '</li>';
            }
            if(num==0){
                $(".main").html(str);
            }else {
                $(".main").append(str);
            }
            if($(".main li").length==data.pl.length){
                msg_show("没有更多了", 3000);
            }

            $(".main li .the_zan").on("click", the_zan);
            $(".main li .the_middle").on("click", more_info);

        },
        error: function (data) {
            msg_show("加载失败，请重试", 3000);
        }
    });

}