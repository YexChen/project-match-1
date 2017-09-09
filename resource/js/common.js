//轮播图，封装版本
// //轮播图实现功能：
// 1.点击左右按钮，来进行train的滚动，
// 2.点击底部按钮，来进行train的滚动,
// 3.在移动了3张图片以后，还原train的位置
let carousel = document.querySelector(".carousel");
let train = document.querySelector(".train");
let leftBtn = document.querySelector(".dir").querySelector(".left");
let rightBtn = document.querySelector(".dir").querySelector(".right");
let dots = document.querySelector(".dots").querySelectorAll("li");

let imageLength = 1260;
function Carousel(speed){
	this.train = train;
	this.init(speed);
	this.bindEvent();
}

Carousel.prototype.init = function(speed){
	this.timer = null;
	this.speed = speed;
	this.distancePerFrame = 10;
	this.allFrames = imageLength/this.distancePerFrame;
	this.frame = 0;
	this.left = 0;
	this.intervalTime = 10;
	this.direction = undefined;
	this.location = 0;
}

Carousel.prototype.render = function(){
	train.style.left = this.left + "px";
	if(this.left < -3*imageLength+20){
		this.left = 0;
	}
}

Carousel.prototype.move = function(direction){
	this.direction = direction;
	clearInterval(this.timer);
	this.timer = setInterval(()=>{
		this.left -= this.distancePerFrame*this.direction;
		this.render();
		//一次只能跳一张动画
		if(this.left%(imageLength*direction) == 0){
			clearInterval(this.timer);
			this.changeDots();
			this.location = this.left*(-1)/imageLength;
		}
	},this.intervalTime)
}

Carousel.prototype.bindEvent = function(){
	leftBtn.onclick = ()=>{
		if(this.left < 0){
			this.move(-1);
		}
	}
	rightBtn.onclick = ()=>{
		this.move(1);
	}
	for(let i = 0;i<dots.length;i++){
		dots[i].onclick = ()=>{
			this.move(i-this.location);
		}
	}
}

Carousel.prototype.changeDots = function(){
	//排他模型
	console.log(this.left*(-1)/imageLength+1);
	for(let i =0;i<dots.length;i++){
		dots[i].className = "";
	}
	dots[(this.left*(-1)/imageLength)].className = "cur";
}

console.log(carousel);

new Carousel();


// ##############################carousel封包完毕##########################

//视频控制插件
// 控制开始和暂停

//定义信号变量
let oVideo = document.querySelector("video");
let oPause = document.querySelector(".pause");
//定义video实例的属性
oVideo.paused = false;

//绑定点击事件
// toggle
oVideo.onclick = function(){
	if(oVideo.paused){
		oVideo.play();
		oVideo.paused = false;
		oPause.style.display = "none";
	}
	else{
		oVideo.pause();
		oVideo.paused = true;
		oPause.style.display = "block";
	}
}