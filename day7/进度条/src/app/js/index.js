define([], function () {
    /**
     * @function[此函数是封装进度条的]
     */

    class ProgressBar {
        constructor() {
            this.ball1 = document.querySelector(".ball1");
            this.ball2 = document.querySelector(".ball2");
            this.color = document.querySelector(".color");
            this.bar = document.querySelector(".bar");
            this.cur=document.querySelector(".cur");
            this.end=document.querySelector(".end")
            this.init();   
        }
        init() {  
            this.drag();
            this.initColor();
            this.click();

        }
        initColor() {
            //中间颜色的初始状态
            this.color.style.left = this.ball1.offsetLeft  + "px";
            console.log(this.ball2.offsetLeft +this.ball2.offsetWidth);
            this.color.style.width = this.ball2.offsetLeft +this.ball2.offsetWidth-this.ball1.offsetLeft+"px";
        }
        drag() {
            //第一个小球的运动
            this.ball1.onmousedown = (ev) => {
                let e = ev || window.event;
                this.ball1.x = e.clientX - this.ball1.offsetLeft;
                let max = this.ball2.offsetLeft;
                this.mouse((this.ball1), 0, max)
            }

            //第二个小球的运动
            this.ball2.onmousedown = (ev) => {
                let e = ev || window.event;
                this.ball2.x = e.clientX - this.ball2.offsetLeft;
                let min = this.ball1.offsetLeft;
                let max = this.bar.offsetWidth - this.ball2.offsetWidth;
                let w = this.color.offsetWidth; //在第二个小球按下的时候获取此时中间红条的宽度
                this.mouse((this.ball2), min, max)
            }
        }
        mouse(ball, min, max, w) {
            //第一个参数是运动元素 第二个是运动的最小位置 第三个是最大位置
            document.onmousemove = (ev) => {
                let e = ev || window.event;
                let l = e.clientX - ball.x;
                if (l <= min) {
                    l = min
                }
                if (l >= max) {
                    l = max
                }
                if (ball == this.ball1) {
                    let money=parseInt(l/max*5000);
                    this.cur.innerText=money+"元";
                    this.color.style.left = l + "px";
                    this.color.style.width = max - l + +this.ball2.offsetWidth+"px";
                }
                if (ball == this.ball2) {
                    let money=parseInt(l/max*5000);
                    this.end.innerText=money+"元";
                    let ballDifference = this.ball2.offsetLeft - this.ball1.offsetLeft;
                    this.color.style.width = ballDifference +this.ball2.offsetWidth+ "px";
                }
                ball.style.left = l + "px";
            }
            document.onmouseup = () => {
                document.onmousemove = null;
                document.onmouseup = null;
            }
        }
        click() {
            //给中间色块添加点击事件
            this.color.onclick=(ev)=>{
                //获取点击的位置
                let e=ev||window.event;
                let x=e.clientX-this.bar.offsetLeft;
                this.ball2.style.left=x-this.ball2.offsetWidth/2 + "px";
                console.log()
                this.initColor()
            }
        }
    }

    return ProgressBar;
});