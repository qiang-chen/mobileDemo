define([], function() {
    /**
     * @function[此函数的作用是写icon的滑动效果]
     */
    class Icon{
        constructor(opt){
            this.el=document.querySelector(opt.el);
            this.init();
        }
        init(){
            this.event();
        }
        event(){
            this.el.addEventListener("touchstart",Touch);
            this.el.addEventListener("touchmove",Touch);
            this.el.addEventListener("touchend",Touch);
            let that=this;
            function Touch(e){
                switch (e.type){
                    case "touchstart":
                    this.start={
                        x:e.touches[0].clientX,
                        y:e.touches[0].clientY
                    }
                    break;
                    case "touchmove":
                    this.end={
                        x:e.touches[0].clientX,
                        y:e.touches[0].clientY
                    }
                    let l=this.end.x-this.start.x;
                    let h=this.end.y-this.start.y;
                    if(Math.abs(h)<12){
                        that.move(l)
                    }
                    break;
                    case "touchend":
                    break;
                }
            }
        }
        move(l){
            let list=this.el.querySelector(".list");
            list.style.left=l+"px";
            let listLeft=parseInt(getComputedStyle(list).left);
            let listW=list.offsetWidth;
            console.log(listLeft)
            if(listLeft>=listW){
                list.style.left=listW+"px";
            }else if(listLeft<=0){
                list.style.left=0;
            }
        }
    }
    return Icon
});