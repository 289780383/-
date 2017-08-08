/**设置meta标签*/
//!function(e){function t(a){if(i[a])return i[a].exports;var n=i[a]={exports:{},id:a,loaded:!1};return e[a].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var i={};return t.m=e,t.c=i,t.p="",t(0)}([function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=window;t["default"]=i.flex=function(e,t){var a=e||100,n=t||1,r=i.document,o=navigator.userAgent,d=o.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i),l=o.match(/U3\/((\d+|\.){5,})/i),c=l&&parseInt(l[1].split(".").join(""),10)>=80,p=navigator.appVersion.match(/(iphone|ipad|ipod)/gi),s=i.devicePixelRatio||1;p||d&&d[1]>534||c||(s=1);var u=1/s,m=r.querySelector('meta[name="viewport"]');m||(m=r.createElement("meta"),m.setAttribute("name","viewport"),r.head.appendChild(m)),m.setAttribute("content","width=device-width,user-scalable=no,initial-scale="+u+",maximum-scale="+u+",minimum-scale="+u),r.documentElement.style.fontSize=a/2*s*n+"px"},e.exports=t["default"]}]);  flex(100, 1);
/**去除字符串空格*/
String.prototype.NoSpace = function(){
    return this.replace(/\s+/g, "");
};
    /**消息提示*/
    function msg_show1(msg, tm=1500) {
        if ($(".msg_show").length >= 1) {
            return;
        }
        $("body").append("<div class='msg_show'><p>" + msg + "</p></div><div class='mask_w'></div>");
        setTimeout(function() {
            $(".msg_show,.mask_w").remove();
        }, tm);
    }
    font_size();
    window.onresize = function() {
        font_size();
    };

    function font_size() {
        var deviceWidth = document.documentElement.clientWidth;
        if (deviceWidth > 750) deviceWidth = 750; //640为设计稿宽度三处需要修改
        document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
    }

//解决手机端延迟300毫秒

$(function(){
    FastClick.attach(document.body);  
})