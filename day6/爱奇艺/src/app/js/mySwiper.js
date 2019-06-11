define([], function () {
    'use strict';
    /**
     * @function[此函数作用封装手机端轮播]
     * 此题需主要几个题 首先加transition ： all 1s linear;是放在css中 后来发现在拖着动的时候也有动画 为了不让拖着动的
     * 时候有动画 于是采用translate 与left相结合的方法实现 但是很快又发现两个位置会出现叠加问题 然后哦嘛噶出现各种归零及
     * 恢复当前位置的死循坏中了 最后还是放弃了 然后用left  在用到的用style加上动画效果 不需要的地方再把动画取消了 这样
     * 就能达到我们需要的效果了
     * 
     * 做此题的思路是先做出无动画状态下的左后右滑图片能够相应的进行切换 接着添加上动画效果 然后在move事件中添加上
     * 图片跟随的情况 接着判断第一张图片的右滑 和最后一张图片不能左滑的情况 这里建议多使用变量开关和if语句 
     * 不要使用一个if语句或者三木运算加上|| && ！他们就行判断 不然容易晕
     * 
     */
    class mySwiper {
        constructor(opt) {
            this.el = document.querySelector(opt.el); //盛放轮播最外层盒子
            this.index = 0;
            this.timer=null; 
            this.init()
        }
        init() {
            this.touchEvent();
            //this.autoplay();
            this.mouse()
        }
        touchEvent() {
            this.el.addEventListener("touchstart", Touch);
            this.el.addEventListener("touchmove", Touch);
            this.el.addEventListener("touchend", Touch);
            let that = this;
            let ul = this.el.querySelector("ul");

            function Touch(e) {
                e.preventDefault();
                switch (e.type) {
                    case "touchstart":
                        this.start = {
                            x: e.touches[0].clientX,
                            y: e.touches[0].clientY
                        }
                        // this.end = {
                        //     x: 0,
                        //     y: 0
                        // }
                        break;
                    case "touchmove":
                        this.end = {
                            x: e.touches[0].clientX,
                            y: e.touches[0].clientY
                        }
                        //在手指滑动的滑动距离赋值给这个图片滑动的距离 换句话说也是这个ul移动的距离
                         let flag1=false;
                         let flag2=false;
                        if(that.index==0){//在下标为1的时候切往右滑动的时候是不能让图片跟着移动的
                            //console.log((this.end.x-this.start.x)>0,"-----我在下标为0的时候滑动的方向")
                            if((this.end.x-this.start.x)>0){
                                flag1=true;
                            }
                        }
                        //同理 在下标为最后一个的时候切往左滑的是不能让图片移动的
                        //console.log((that.el.children),"----我在下标为最后一张")
                        if(that.index==(ul.children.length - 1)){
                            if((this.end.x-this.start.x)<0){
                                flag2=true;
                            }
                        }
                        let flag3=true;//第三个开关控制图片是不是能移动
                        //console.log(flag2)
                        if(flag1){
                            flag3=false;
                        }
                        if(flag2){
                            flag3=false;
                        }
                        if(flag3){
                            ul.style.transition = `top 1s linear`;
                            ul.style.left = `${-that.index*(that.el.offsetWidth)+(this.end.x-this.start.x)}px`;
                        }
                        break;
                    case "touchend":
                        if (this.end) {
                            if (this.end.y - this.start.y < 20) {
                                //在鼠标抬起的瞬间让left值为当前页所在的位置；
                                //再抬起的时候不要判断x轴方向 把其放在移动函数中进行判断
                                ul.style.transition = `all 1s linear`;
                                ul.style.left = `${-that.index*(that.el.offsetWidth)}px`;
                                that.move(this.end.x - this.start.x);
                            }
                        }
                }
            }
        }
        move(l) {
            //l 是开始落下的位置和抬起的位置之间的差
            let ul = this.el.querySelector("ul");
            let w = this.el.offsetWidth;
            console.log("滑动的距离太短 我还不能移动喽")
            if (l < 0 && Math.abs(l) >= w / 3) { //如果l是负数 证明是在像右滑动  如果绝对值还大于一半的话就让其划过去
                this.index++;
                if (this.index >= ul.children.length - 1) {
                    this.index = ul.children.length - 1
                }
                console.log(this.index, "-------左滑");
                ul.style.transition = `all 1s linear`;
                ul.style.left = -this.index * w + "px"
                //ul.style.transform = `translateX(${-this.index*w}px)`;
            }

            if (l > w / 3) { //如果想左滑动的时候大于盒子的一半的话就让其把这个图片划过去
                this.index--;
                if (this.index < 0) {
                    this.index = 0;
                }
                console.log(this.index, "-------右滑")
                ul.style.left = -this.index * w + "px";
                ul.style.transition = `all 1s linear`;
                // ul.style.transform = `translateX(${-this.index*w}px)`;
            }

        }
        autoplay(){
            //自动轮播
           this.timer=setInterval(()=>{
               this.index++;
               console.log()
               if(this.index>this.el.children[0].children.length-1){
                this.index=0;
                this.el.children[0].style.transition = `top 1s linear`;
               this.el.children[0].style.left = `${-this.index*(this.el.offsetWidth)}px`;
               }
               this.el.children[0].style.transition = `left 1s linear`;
               this.el.children[0].style.left = `${-this.index*(this.el.offsetWidth)}px`;
           },2000) 
        }
        mouse(){
            //划过取消轮播 离开加上
            
            this.el.onmouseover=()=>{
                console.log(1)
                clearInterval(this.timer)
            }
            this.el.onmouseout=()=>{
                this.autoplay()
            }
        }
    }

    return mySwiper;
});