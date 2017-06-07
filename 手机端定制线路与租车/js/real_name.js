$(function(){
    $(".the_pic div").on("click",sel_pic);
    $(".btn_submit").on("click",btn_submit);
});
function sel_pic(){
    alert("选择照片");
}
function btn_submit(){
    var name=$(".the_name").val().trim();
    var id=$(".the_id").val().trim();
    yan_name(name);
    yan_id(id);
    drv_pic();
    peo_pic();
    /**此处可以提交*/
    msg_show("提交成功",3000);
}
function yan_name(n){
    if(n!=''&& n.length>1){
        /**验证成功*/
    }else {
        msg_show("姓名格式有误",3000);
        return;
    }
}
function yan_id(n){
    if(/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(n)){
        /**验证成功*/
    }else {
        msg_show("身份证号格式有误",3000);
        return;
    }
}
function drv_pic(){
    if($(".drv_id img").length>0){
        /**验证成功*/
    }else {
        msg_show("请选择驾驶证主副页照",3000);
        return;
    }
}
function peo_pic(){
    if($(".drv_peo img").length>0){
        /**验证成功*/
    }else {
        msg_show("请选择手持驾驶证正面照",3000);
        return;
    }
}