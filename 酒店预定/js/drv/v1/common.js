/**设置页面基本单位*/
font_size();
window.onresize = function () {
    font_size();
};
function font_size() {
    var deviceWidth = document.documentElement.clientWidth;
    if (deviceWidth > 750) deviceWidth = 750;//640为设计稿宽度三处需要修改
    document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
}
/**去除字符串空格*/
String.prototype.NoSpace = function(){
    return this.replace(/\s+/g, "");
};
