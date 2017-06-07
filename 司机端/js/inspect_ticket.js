/**
 * Created by Administrator on 2016/10/13 0013.
 */
function close_this(obj){
    $(".inspect_bot").hide();
    $(".mask").hide();
}
function local_btn(){
    /**这里发ajax确定当前地点*/
    $.ajax({
        type: "POST", //GET
        url: "***.action",
        data: {
            local_name:$(".name_bot").text()
        }, //组装参数
        dataType: "json",
        success: function (data) {
            /**请求状态*/
            window.open("site_ticket.html","_self","");
        },
        error: function (data) {
            /**测试*/
            window.open("site_ticket.html","_self","");
        }
    });
}
var count1=0;
/**点击验票*/
function inspect_btn(){
    $(".inspect_bot").show();
    $(".mask").show();
    $(".num_btn").hide();
    count1=0;
    $(".scan_sure").css("background-color","#e5e5e5");
    $(".scan_btn").on("click",scan);
    $(".msg_txt").html("请输入手机号后四位或短信乘车码");
    $(".scan_btn").css("background-color","#ff4f00");
    $(".letter_").text("");
    $(".clear_num").on("click",clear_ccm);
    $(".scan_sure").off("click",scan_sure);
    $(".mask_main").css("padding-bottom","1.2rem")

}

/**扫码事件*/
function scan(){
    $(".scan_btn").css("background-color","#ff4f00");
    count1=0;
    $(".letter_").text("");
}
/**扫码确定*/
function scan_sure(){
    $(".scan_sure").css("background-color","#e5e5e5");
    $(".scan_btn").on("click",scan);
    $(".msg_txt").html("还有<i>11</i>人未验票，请继续！");
    $(".scan_btn").css("background-color","#ff4f00");
    $(".letter_").text("");
    count1=0;
    $(".clear_num").on("click",clear_ccm);
    $(".scan_sure").off("click",scan_sure);

}
/**清除乘车码*/
function clear_ccm(){
    if(count1==0){
        return;
    }
    count1--;
    $(".letter_").eq(count1).text("");
}

/**以下是文档加载完毕执行的*/
$(function(){
    $(".clear_num").on("click",clear_ccm);


    $(".letter_").click(function(){
        $(".num_btn").show();
        $(".mask_main").css("padding-bottom","0.4rem")
    });
    /**点击的次数*/

    $(".number").click(function(){
        var k=$(this);
        $(this).css("background-color","#dedede");
        setTimeout(function(){
            k.css("background-color","#000");
        },100);

        if(count1==4){
            return;
        }
        $(".letter_").eq(count1).text($(this).text());
        if(count1==3){
            var ccm=$(".letter_").text();
            alert(ccm);
            $.ajax({
                type: "POST", //GET
                url: "***.action",
                data: {
                    ccm:ccm
                }, //组装参数
                dataType: "json",
                success: function (data) {
                    /**请求乘车码是否正确*/
                    $(".scan_btn").off("click",scan);
                    $(".scan_btn").css("background-color","#e5e5e5");
                    $(".msg_txt").html("共1人，<span>已付120.00</span>元，<span>要票！</span>");
                    $(".scan_sure").css("background-color","#0c9ef1");
                    $(".scan_sure").on("click",scan_sure);

                },
                error: function (data) {
                    $(".scan_btn").off("click",scan);
                    $(".scan_btn").css("background-color","#e5e5e5");
                    $(".msg_txt").html("共1人，<span>已付120.00</span>元，<span>要票！</span>");
                    $(".scan_sure").css("background-color","#0c9ef1");
                    $(".scan_sure").on("click",scan_sure);
                    $(".clear_num").off("click",clear_ccm);
                }
            });
            $(".msg_txt").text();
        }
        count1++;
    });
});