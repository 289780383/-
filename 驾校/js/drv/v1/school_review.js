$(function(){
    /**点击星星*/
    $(".star_group li").on("click",start_group);
    $(".star_group li").addClass("sel_star");
    /**输入框获得焦点*/
    $(".text_main").focus(function(){
        if($(this).val()=="学车过程中满意不满意的，快来吐槽一下吧！（6-140字）"){
            $(this).val("");
        }
        /**输入框失去焦点*/
        $(this).blur(function(){
            if($(this).val()==""){
                $(this).val("学车过程中满意不满意的，快来吐槽一下吧！（6-140字）");
            }
        })

    });
    /**输入框字数检测*/
    $(".text_main").bind('input propertychange', function(){
            var le=$(this).val().length;
            $(".text_num").text(""+le+"/140");
        if(le>=140){
            $(this).val($(this).val().substr(0,139));
        }
    });
    $(".anonymous").click(function(){
        if($(this).find("i").hasClass("sel_sure")){
            $(this).find("i").removeClass("sel_sure");
        }else {
            $(this).find("i").addClass("sel_sure")
        }

    });
});
/**点击星星*/
function start_group(){
    var the_i=$(this).index();
    $(this).parent().find("li").removeClass("sel_star");
    for(var i=0;i<=the_i;i++){
        $(this).parent().find("li").eq(i).addClass("sel_star");
    }
    switch (the_i){
        case 0:
            $(this).parents(".review_item").find(".star_text").text('"很差"');
            break;
        case 1:
            $(this).parents(".review_item").find(".star_text").text('"差"');
            break;
        case 2:
            $(this).parents(".review_item").find(".star_text").text('"一般"');
            break;
        case 3:
            $(this).parents(".review_item").find(".star_text").text('"挺好"');
            break;
        case 4:
            $(this).parents(".review_item").find(".star_text").text('"非常好"');
            break;
    }
}