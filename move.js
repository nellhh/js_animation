window.onload=function(){
	var oli1=document.getElementById('li1');
	var oli2=document.getElementById('li2');
	oli1.onmouseover=function(){
		startMove(this,'opacity',100);
	}
	oli1.onmouseout=function(){
		startMove(this,'opacity',30);
	}

}



function getStyle(obj,attr){
	//alert(obj);
	if(obj.currentStyle){
		return obj.currentStyle[attr];//ie
	}else{
		return getComputedStyle(obj,false)[attr];//ff
	}
}
//var timer=null;//先设置时间空（定时器为公用的，需要重新弄一个）

var alpha=30;
function startMove(obj,attr,itarget){//
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		//1.取当前值
		var icur=0;
		if(attr=='opacity'){
			icur=Math.round(parseFloat(getStyle(obj, attr))*100);
		}else{
			var icur=parseInt(getStyle(obj,attr));			
		}
		//2.算速度
		var speed=(itarget-icur)/8;

		speed=speed>0?Math.ceil(speed):Math.floor(speed);
		//3.检测停止
		if(icur==itarget){
			clearInterval(obj.timer);
		}else{
			if(attr=='opacity'){
				obj.style.filter='alpha(opacity:'+(icur+speed)+')';//ie
				obj.style.opacity=(icur+speed)/100;
			}else{
				obj.style[attr]=icur+speed;
			}
		} 
	},30)
}

