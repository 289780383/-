$(function() {
    /**选择性别*/
    $(".student_sex p").on("click", student_sex);
    $(".student_sex p").eq(0).find("i").addClass("sel_sex");
    /**点击列表*/
    $(".student_xl").on("click", student_xl);
    var all_data = [{
        job_type: "汽车驾驶员",
        job_level: [{ level: "无", money: "0元" }, { level: "初级工", money: "328元" }, { level: "中级工", money: "408元" }, { level: "高级工", money: "513元" }, { level: "技师", money: "450元" }]
    }, {
        job_type: "汽车修理工",
        job_level: [{ level: "无", money: "0元" }, { level: "初级工", money: "351元" }, { level: "中级工", money: "446元" }, { level: "高级工", money: "571元" }, { level: "技师", money: "500元" }, { level: "高级技师", money: "500元" }]
    }];

    function student_xl() {
        var type = $(this).attr("data-type");
        var the_data = [];
        if (type == 1) {
            $.each(all_data, function(i) {
                the_data.push(all_data[i].job_type);
            });
        } else if (type == 2) {
            var the_job_type = $(".the_job_type").text().NoSpace();
            if (the_job_type.indexOf("请") == "-1") {
                $.each(job_data, function(i) {
                    if(job_data.length-1==i){
                        return;
                    }
                    the_data.push(job_data[i].level);
                });
            } else {
                msg_show("请先选择工种", 2000);
                return;
            }
        }
        var str = '';
        for (var i = 0; i < the_data.length; i++) {
            str += '<li data-job="' + i + '""><p>' + the_data[i] + '</p><span></span></li>';
        }
        $(".xl_box").html(str);
        $(".xl_box").attr("data-type", type);
        $(".xl_box li").on("click", xl_box);
        var key = $(this).find("span").text().trim();
        $.each($(".xl_box li"), function() {
            if ($(this).find("p").text() == key) {
                $(".xl_box span").removeClass("sel_xl");
                $(this).find("span").addClass('sel_xl');
            }
        });
        $("html,body").css({"height": '100%',"overflow": 'hidden'});
        $(".mask2,.xl_box").show();
    };
    /**点击黑色遮罩*/
    $(".mask2").on("click", function() {
    $("html,body").css({"height": '',"overflow": 'auto'});
        $(".mask2,.xl_box").hide();
    });
    /**选择项目*/
    $(".xl_box li").on("click", xl_box);
var  job_data=[];
    function xl_box() {
        $(".xl_box span").removeClass("sel_xl");
        $(this).find("span").addClass('sel_xl');
        var the_val = $(this).find("p").text().trim();
        if ($(".xl_box").attr("data-type") == 1) {
            $(".the_job_type").text(the_val);
            job_data = all_data[$(this).attr("data-job")].job_level;
             $(".the_old_level").text("请选择原等级");
             $(".the_new_level,.the_price").text("");
        } else if ($(".xl_box").attr("data-type") == 2) {
            $(".the_old_level").text(the_val);
            var num=parseInt($(this).attr("data-job"))+1;
            $(".the_new_level").text(job_data[num].level);
            $(".the_price").text(job_data[num].money);
        } 
        $("html,body").css({"height": '',"overflow": 'auto'});
        $(".mask2,.xl_box").hide();
    };
    /**点击提交*/
    $(".submit_btn").on("click", function() {
        var the_job_type = $(".the_job_type").text().NoSpace();
        if (the_job_type.indexOf("请") >= 0) {
            msg_show("请选择工种", 2000);
            return;
        }
        var the_old_level = $(".the_old_level").text().NoSpace();
        if (the_old_level.indexOf("请") >= 0) {
            msg_show("请选择原等级", 2000);
            return;
        }
        var student_name = $("#student_name").val().NoSpace();
        if (student_name == "") {
            msg_show("输入您的姓名", 2000);
            return;
        }
        var student_id = $(".student_id").val().NoSpace();
        if (!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(student_id)) {
            msg_show("请输入正确身份证号", 2000);
            return;
        }
        var student_tel = $(".student_tel").val().NoSpace();
        if (!/^(13[0-9]|14[579]|15[012356789]|17[0135678]|18[0-9])\d{4}\d{4}$/.test(student_tel)) {
            msg_show("输入正确手机号", 2000);
            return;
        }
        var student_age = $(".student_age").val().NoSpace();
        if (student_age == "") {
            msg_show("输入年龄", 2000);
            return;
        }
        var student_job = $(".student_job").val().NoSpace();
        if (student_job == "") {
            msg_show("输入工作单位", 2000);
            return;
        }
        alert('提交成功');
    });
});
/**选择性别*/
function student_sex() {
    $(this).parent().find("i").removeClass("sel_sex");
    $(this).find("i").addClass("sel_sex");
}
