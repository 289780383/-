$(function(){
    $(".head_nav").delegate("li","click",list_fn);
})
var list_fn=function(){
    $(this).siblings().removeClass('head_sel');
    $(this).addClass('head_sel');
    var index=$(this).index();
    switch(index){
        case 0:
        
        break;
        case 1:
        
        break;
        case 2:
    }
}
