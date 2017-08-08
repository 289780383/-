var all_data="",ls_path=[],obj={};/**新建一个area对象*/
var city_jw;
$(function() {
	/**请求数据*/
	git_data();
	/**隐藏地图控件*/

	$(".amap-logo,.amap-copyright,.amap-mcode,.amap-toolbar").remove();
	/**导航nav*/
	$(".order_nav li").on("click", order_nav);
	/**复选框*/
	$(".area_item i").on("click",area_show);
	/**全选框*/
	$(".sel_all").on("click",sel_all);
	/**点击修改按钮*/
	$(".area_btn").on("click",area_btn);
	/**点击取消*/
	$(".sub_cancel").on("click",sub_cancel);
	/**点击提交*/
	$(".sub_sure").on("click",sub_sure);
	$(".page_company").on("click",page_company);
	function page_company(e){
		$(".company_list").show();
		e.stopPropagation();
	}
	$(".company_list li").on("click",company_list);
	function company_list(e){
		$(".page_company").val($(this).text().NoSpace());
		$(".company_list").hide();
		e.stopPropagation();
	}
	$(document).on("click",function(){
		$(".company_list").hide();
	});

	/**改变窗口大小*/
	window.onresize = function(){
		$(".area_list").css("height",$(window).height()-$(".area_list").position().top);
		$(".new_page").css("height",$(window).height()-$(".area_main").position().top);
		map_reset();
	};  
	$(".area_list").css("height",$(window).height()-$(".area_list").position().top);
	$(".new_page").css("height",$(window).height()-$(".area_main").position().top);
	/**点击关闭按钮*/
	$(".close_table").on("click",close_table);
	/**点击关闭按钮*/
	function close_table(){
		$(".area_warp").hide();
		map_reset();
	}
	/**重置地图大小*/
	map_reset();
	AMap.event.addDomListener(document.getElementById('query'), 'click', function() {
		var cityName = document.getElementById('cityName').value;
		if (!cityName) {
			return;
		}
		cityName=cityName.replace(/(省|市|县|区)/g,'').NoSpace();
		set_center(cityName);
	});
	/*--------------------------以上是调用---------------------------------------------*/
});/**文档加载完毕*/
/*--------------------------以下是方法函数---------------------------------------------*/
/**请求数据*/
function git_data(){
	$(".loading_pic,.mask").show();
	$.ajax({
		type: "POST",
		url: "data_area.json",
		dataType: "json",
		success: function(data) {
			if(data.state==1){
				all_data=data.all_area;
				creat_list(all_data);

				$(".loading_pic,.mask").hide();
			}
		},
		error: function(data) {
		}
	});
	/**获取城市经纬度*/
	$.ajax({
		type: "POST",
		url: "city_jw.json",
		dataType: "json",
		success: function(data) {
			city_jw=[];
			$.each(data,function(){
				$.each(this.children,function(){
					city_jw.push(this);
				});
				
			});
		}
	});
}

/**导航nav*/
function order_nav(){
	$(this).siblings('li').removeClass("sel_nav");
	$(this).addClass('sel_nav');
	if($(this).index()==0){
		map.clearMap();//清空地图
		git_data();
		$(".new_page").hide();
		close_polygon();

	}
	if($(this).index()==1){
		$(".new_page input").val("");
		$(".new_page").show();
		obj.polygonArr=[];
		$(".draw_s").attr("onClick","obj.startEditPolygon()");
		$(".draw_e").attr("onClick","obj.closeEditPolygon()");
		map.clearMap();//清空地图
		map.on('click',draw_area);
		msg_show("鼠标点击地图即可开始绘制",2000);
		draw_xg(obj);
	}
}
/**复选框*/
function area_show(){
	$(this).toggleClass("sel_show");var k=0;
	map.clearMap();//清空地图
	$(".area_item i").each(function() {

		if($(this).hasClass('sel_show')==false){
			$(".sel_all").removeClass('sel_show');
			return;
		}
		if($(this).hasClass('sel_show')){
			var alias=$(this).parent().attr("data-id");
			$.each(all_data,function(){
				if(alias==this.id){
					creat_polygon(this);
					map.setFitView();
				}
			});
			k++;
			if(k==$(".area_item i").length){
				$(".sel_all").addClass('sel_show');
			}
		}
	});
}

/**全选框*/
function sel_all(){
	$(this).toggleClass("sel_show");
	if($(this).hasClass('sel_show')){
		$(".area_item i").addClass('sel_show');
		map.clearMap();//清空地图
		$.each(all_data,function(){
			creat_polygon(this);
		});
		map.setFitView();
	}else{
		$(".area_item i").removeClass('sel_show');
		map.clearMap();//清空地图
	}
	
}
/**点击修改按钮*/
function area_btn(){
	var alias=$(this).parent().attr("data-id");
	$.each(all_data,function(){
		if(alias==this.id){
				map.clearMap();//清空地图

				obj={};
				obj=this;
				obj.alias="obj";
				creat_polygon(obj);
				map.setFitView();
				new_page(this);				
			}
		});
}
/**点击取消*/
function sub_cancel(){
	if($(".order_nav li").eq(1).hasClass('sel_show')){
		close_polygon();
	}
	$(".new_page").hide();
		map.clearMap();//清空地图
		$(".sel_all").addClass('sel_show');
		$(".order_nav li").eq(0).trigger('click');
		obj.polygonArr=ls_path;

		
	}
	/**点击提交*/
	function sub_sure(){
		if($(".order_nav li").eq(1).hasClass('sel_show')){
			obj.id="";
			if(obj.polygonArr.length==0){
				msg_show("请在地图上绘制区域",1500);
				return;
			}
		}
		obj.name=$(".page_name").val().NoSpace();
		obj.company=$(".page_company").val().NoSpace();
		if(obj.name==""){
			msg_show("请填写名称",1500);
			return;
		}
		if(obj.company==""){
			msg_show("请填写单位 ",1500);
			return;
		}
		
		var polygonArr=obj.polygonArr.toString();
		console.log(polygonArr);
		$(".loading_pic,.mask").show();
		$.ajax({
			type: "POST",
			url: "data_area.json",
			dataType: "json",
			data:{
				"name":obj.name,
				"id":obj.id,
				"company":obj.company,
				"polygonArr":polygonArr
			},
			success: function(data) {
				all_data=data.all_area;
				$(".order_nav li").eq(0).trigger('click');
				$(".sel_all").addClass('sel_show');
				$(".new_page").hide();
				map.setFitView();
				close_polygon();
				$(".loading_pic,.mask").show();
				msg_show("提交成功",1500);
			},
			error:function(data) {
			}
		});
	}

	/**重置地图大小*/
	function map_reset(){
		if($(".area_warp").css("display")=="block"){
			$("#container").css("width",$(window).width()-$(".area_warp").width());
		}else{
			$("#container").css("width","100%");
		}

	}
	/**渲染*/
	function creat_list(data){

		var str="";
		$.each(data,function() {
			str+='<li class="area_item" data-id="'+this.id+'">';
			str+='<p><span>名称 :</span><span class="area_name">'+this.name+'</span></p>';
			str+='<p><span>单位 :</span><span class="area_company">'+this.company+'</span></p>';
			str+='<i class="sel_show"></i>';
			str+='<div class="area_btn">修改</div></li>';
			creat_polygon(this);

		});
		$(".area_list").html(str);
		$(".area_item i").on("click",area_show);
		$(".area_btn").on("click",area_btn);

	}
	/**创建多边形围栏*/
	function creat_polygon(editor){
		if(editor.alias){
			$(".draw_s").attr("onClick",editor.alias+".startEditPolygon()");
			$(".draw_e").attr("onClick",editor.alias+".closeEditPolygon()");
		}
		editor._polygon=(function(){
			return new AMap.Polygon({
				map: map,
				path: editor.polygonArr,
				strokeColor: "#0000ff",
				strokeOpacity: 1,
				strokeWeight: 3,
				fillColor: "#f5deb3",
				fillOpacity: 0.35
			});
		})(editor);

		editor._polygonEditor= new AMap.PolyEditor(map, editor._polygon);/**绘制围栏*/
		editor.polygonArr=editor._polygon.getPath();
		draw_xg(editor);

	}
	/**新增页面修改*/
	function draw_xg(editor){
		editor.startEditPolygon=function(){
			if(editor.polygonArr.length!=0){
				editor._polygonEditor.open();
				ls_path=editor.polygonArr;
			}
			
		}
		editor.closeEditPolygon=function(){
			if(editor.polygonArr.length!=0){
				editor._polygonEditor.close();
				editor.polygonArr=editor._polygon.getPath();
				console.log(editor.polygonArr);
			}
		}

	}
	/**新页面数据*/
	function new_page(data){
		$(".page_name").val(data.name);
		$(".page_company").val(data.company);
		$(".new_page").show();
	}
	/**关闭鼠标点击创建*/
	function  close_polygon(){
		map.off('click',draw_area);
	}
	/**点击地图事件*/
	function draw_area(e) {
		obj.polygonArr.push([e.lnglat.getLng() , e.lnglat.getLat()]);
			map.clearMap();//清空地图
			creat_polygon(obj);
		}
		/**设置城市中心*/
		function set_center(the_city){
			$.each(city_jw,function(){
				if(this.name.indexOf(the_city)>=0){
					map.setZoomAndCenter(12, [this.log, this.lat]);
					return false;
				}
			});
		}
