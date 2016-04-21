function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];//ie
	}else{
		return getComputedStyle(obj,false)[attr];//ff
	}
}
//startMove(obj,{attr1:itarget1,attr2:itarget2},fn)
function startMove(obj,json,fn){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var flag=true;//假设
		for(var attr in json){
			//1.取当前值
			var icur=0;
			if(attr=='opacity'){
				icur=Math.round(parseFloat(getStyle(obj,attr))*100);
			}else{
				icur=parseInt(getStyle(obj,attr));			
			}
			//2.算速度
			var speed=(json[attr]-icur)/8;

			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			//3.检测停止
			if(icur!=json[attr]){//如果没到达
				flag=false;//那么假设为假
			}
			if(attr=='opacity'){
				obj.style.filter='alpha(opacity:'+(icur+speed)+')';//ie
				obj.style.opacity=(icur+speed)/100;
			}else{
				obj.style[attr]=icur+speed+'px';
			}		
		}
		if(flag){
			clearInterval(obj.timer);
			if(fn){
				fn();
			}
		}

	},15)
}

