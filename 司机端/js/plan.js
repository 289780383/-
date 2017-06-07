/**
 * Created by Administrator on 2016/10/12 0012.
 */
function select_dian(obj){
    $(".select_sel").removeClass("select_select");
    $(obj).find(".select_sel").addClass("select_select");
}
/**点击确认*/
function go_index(){
    $.ajax({
        type: "POST", //GET
        url: "***.action",
        data: {
            plan_line:$(".select_select").parent().parent().prev(".item_name").text()
        }, //组装参数
        dataType: "json",
        success: function (data) {
            window.open("index.html","_self","");
        },
        error: function (data) {
            /**待删除*/
            window.open("index1.html","_self","");
        }
    });

}