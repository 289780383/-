<link href="css/atc/v1/driver/inspect_ticket.css" rel="stylesheet" type="text/css">
<body class="bc_fff">
<div class="select_line">
	<input type="hidden" id="stations_crid" value="<?php echo $stations['crID'];?>" />
	<input type="hidden" id="stations_csid" value="<?php echo $station_csid;?>" />
	<input type="hidden" id="stations_seat" value="<?php echo $stations['seat'];?>" />
	<input type="hidden" id="stations_rnumber" value="<?php echo $stations['rnumber'];?>" />
	<input type="hidden" id="stations_ncnumber" value="<?php echo $stations['ncnumber'];?>" />
    <div class="select_top bc_f6">
        <p class="c_333">乘客列表</p><img src="images/atc/v1/driver/fh_03.png" onclick="history.go(-1)" class="fh_trip">
    </div>
    <div class="item_name bc_fff"><p class="name_top c_53"><?php echo $stations['startAdName'].'-'.$stations['endAdName'].' '.$stations['clName'];?></p><p class="name_bot c_333"><?php echo $station_csname;?></p><span class="car_id c_53"><?php echo $stations['cbBusNo'];?></span></div>
    <ul class="station_list bc_fff c_333">
    	<?php foreach ((array)$stations['orders'] as $a){?>
        <li pon="<?php echo $a['poNumber'];?>" class="station_item"><p><?php echo substr($a['userPhone'],0,3).'****'.substr($a['userPhone'],-4);?></p><span class="this_people"><?php echo $a['number'];?>人</span><i class="yuan"></i><i class="select_sel <?php echo $a['oState']>=3?'select_select':'';?>"></i></li>
        <?php }?>
    </ul>
</div>

<div class="inspect_b">
    <a href="javascript:;" class="local_btn bc_fff c_or" onclick="local_btn();">现场售票</a><a href="javascript:;" class="inspect_btn bc_or c_fff" onclick="inspect_btn();">验票</a>
</div>
<div class="btn_bg"></div>

<div class="mask"></div>
<!-- 输入验证码-->
<div class="inspect_bot">
    <div class="mask_title bc_f0"><p class="title_txt c_333">输入验证码</p><img class="close" src="images/atc/v1/driver/close_1.png" onclick="close_this(this);"></div>
    <div class="mask_main bc_fff">
        <p class="scan"><span class="letter_"></span><span class="letter_"></span><span class="letter_"></span><span class="letter_"></span><a href="javascript:;" class="scan_btn c_fff bc_e5">扫码</a></p>
    <div class="scan_msg "><p class="msg_txt bc_e5 c_7c7">请输入乘车码</p><a href="javascript:;" class="scan_sure c_fff bc_e5">确定</a></div>
    </div>
    <ul class="num_btn bc_fff">
       <li class="number">7</li>
       <li class="number">8</li>
       <li class="number">9</li>
        <li class="number">4</li>
        <li class="number">5</li>
       <li class="number">6</li>
       <li class="number">1</li>
       <li class="number">2</li>
       <li class="number">3</li>
       <li class="number num0">0</li>
       <li class="clear_num">清除</li>
    </ul>
    <p id="scanQRCode" style="display:none"></p>
</div>
</body>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>  
<script src="js/common/jweixin/v1.0.0.js?v=<?php echo time();?>"></script>
<script type="text/javascript" src="js/atc/v1/driver/inspect_ticket.js?v=<?php echo time();?>"></script>
<script type="text/javascript">
	var EticketsellUrl='<?php echo Yii::app()->createUrl('atc/driver/eticketsell')?>';
	var ChecketicketUrl='<?php echo Yii::app()->createUrl('atc/servicet/checketicket')?>';
	var SavechecketicketUrl='<?php echo Yii::app()->createUrl('atc/servicet/savechecketicket')?>';
    var tm=$(".btn_bg").css("background-image");
    if(tm==""||tm=="none"||tm=="undefined"){
        $(".btn_bg").css({backgroundColor:"#fff"});
    }
</script>
</html>