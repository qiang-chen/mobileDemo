define(['jquery'], function ($) {
    /**
     * @function[此函数是往页面渲染歌曲信息的]
     */

    class musicRender {
        constructor() {
            this.right = document.querySelector(".right");
            this.data = null;
            this.audio = document.querySelector("#audio");
            this.curIndex = 0; //当前歌曲在播放的下标
            this.curTime = 1000; //定时器初始化时间
            this.timer = null;
            this.a = 0; //再点击暂停时保存一下当前进度的时间
            this.endTime=321;//进度条的默认总时间
            this.startTime=0;
            this.init();
        }
        init() {
            $.ajax({
                url: './app/common/index.json',
            }).then((res) => {
                this.data = res;
                this.render(res);
            });
            this.drag();
        }
        render(data) {
            let str = data.map(item => {
                return `<div class="right1">
                    <span class="one">${item.no}</span>
                    <span>❤</span>
                    <span>${item.name}</span>
                    <span>${item.singer}</span>
                    <span class="duration">${item.length}</span>
                </div>`
            }).join(" ");
            this.right.innerHTML = str;
            this.musicDblclick();
            this.speed();
        }
        musicDblclick() {
            //给每一行添加双击事件播放音乐
            let center = document.querySelector(".center");
            let right1 = document.querySelectorAll(".right1");
            let down = document.querySelector(".down ");
            let up = document.querySelector(".up");
            right1.forEach((item, index) => {
                item.ondblclick = () => {
                    //双击的时候加个样式
                    if (item.classList.contains("active")) {
                        //如果在播放的时候在一次双击就让这首歌从头开始播放
                        console.log("第二次点击")
                        this.audio.currentTime = 0; //从0秒的时候开始播放
                    } else {
                        for (let i = 0; i < right1.length; i++) {
                            right1[i].classList.remove("active")
                        }
                        item.classList.add("active")
                        //双击播放音频
                        console.log(index, "双击时候的下标");
                        this.curIndex = index;
                        //console.log(this.audio);
                        this.audio.src = this.data[this.curIndex].src;

                        center.classList.remove("icon-weibiaoti102");
                        center.classList.add("icon-zanting2");
                    }
                    clearInterval(this.timer)
                    this.initBar();
                    this.barMove()
                }

            })

            //点击下一首按钮
            down.onclick = () => {
                this.curIndex++;
                console.log(this.curIndex, "下一首歌曲");
                for (let i = 0; i < right1.length; i++) {
                    //排他
                    right1[i].classList.remove("active");
                }
                this.audio.src = this.data[this.curIndex].src;
                right1[this.curIndex].classList.add("active");

                //console.log(right1.length - 1)
                if (this.curIndex > (right1.length - 2)) {
                    console.log(this.curIndex, "下一首临界点")
                    this.curIndex = -1;
                }
                clearInterval(this.timer)
                this.initBar();
                this.barMove()
            }
            //点击上一首按钮
            up.onclick = () => {
                this.curIndex--;
                console.log(this.curIndex, "上一首歌曲");
                for (let i = 0; i < right1.length; i++) {
                    //排他
                    right1[i].classList.remove("active");
                }
                this.audio.src = this.data[this.curIndex].src;
                right1[this.curIndex].classList.add("active");
                if (this.curIndex <= 0) {
                    console.log(this.curIndex, "上一首临界点")
                    this.curIndex = right1.length;
                }
                clearInterval(this.timer)
                this.initBar();
                this.barMove()
            }
            //点击按钮暂停
            let flag = true;
            center.onclick = () => {

                if (center.classList.contains("icon-weibiaoti102")) {
                    center.classList.remove("icon-weibiaoti102");
                    center.classList.add("icon-zanting2");
                    if (this.curIndex == 0) {
                        this.audio.src = this.data[0].src;
                        right1[0].classList.add("active");
                        clearInterval(this.timer);
                        if (flag) {
                            this.initBar();
                            console.log("几次")
                            flag = false;
                        }

                        this.barMove();
                        return;
                    }

                    this.audio.play();
                } else {
                    center.classList.remove("icon-zanting2");
                    center.classList.add("icon-weibiaoti102");
                    //console.log(audio[this.curIndex+1])
                    this.audio.pause();
                    clearInterval(this.timer)
                }

            }
        }
        speed() {
            //设置倍速
            let beiChild = document.querySelectorAll(".bei span");
            beiChild.forEach(item => {
                item.onclick = () => {
                    let tet = item.innerText * 1;
                    this.audio.playbackRate = tet;
                    this.curTime = this.curTime/tet;
                    clearInterval(this.timer)
                    //this.initBar();
                    this.barMove()
                }
            })
        }
        initBar() {
            //初始化进度条
            let endTime = document.querySelector(".four .right");
            let start = document.querySelector(".four .left");
            start.innerText=this.cycle(this.startTime)
            //console.log(22)
            this.a = audio.currentTime; //初始状态的时间
            //console.log(audio.currentTime)
            this.audio.onplay = () => { //必须在onplay方法里获取当前时间 不然得不到
                console.log(this.audio.readyState)
                if (this.audio.readyState == 4) {
                   
                    let tet = this.audio.duration; //把此时得到的时间转换成分钟赋值给进度条的结束时间
                    //console.log(tet)
                    this.endTime=this.cycle(tet);
                    endTime.innerText = this.cycle(tet);
                    this.a = audio.currentTime; //初始状态的时间
                    start.innerText=this.cycle(this.a)
                    //console.log(this.a)
                }
            }
        }
        barMove() {
            console.log(this.a,"移动的时候进来的变量")

            this.audio.onplay = () => {
                //console.log(this.a,"11")
                //在调用进度条移动的函数的时候获取一个这首歌的时长 然后根据盒子的总长度除上时长==每一秒走的长度
                let bar = document.querySelector(".hui");
                let ball = document.querySelector(".yuan");
                let rate = document.querySelector(".lan");
                let startTime = document.querySelector(".four .left");
                let speed = (bar.offsetWidth -ball.offsetWidth)/ this.audio.duration;
                this.audio.currentTime = this.a;
                let count = Math.ceil(this.audio.currentTime);
                let curL = this.audio.currentTime * speed;
                console.log(curL,"---------------初始位置")
                this.timer = setInterval(() => {
                    console.log(curL,speed,"每次加的单位")
                    curL += speed * 1;
                    //console.log(this.audio.currentTime,"-----------")
                    count++;
                    this.a = count;
                    this.startTime=count;
                    //console.log(count,curL)
                    ball.style.left = curL + "px";
                    rate.style.width = curL + "px";
                    startTime.innerText = this.cycle(count);
                    //console.log(count,this.audio.duration)
                    if (count >= this.audio.duration) {
                        clearInterval(this.timer)
                    }
                }, this.curTime)
            }

        }
        cycle(time) {
            //时间转换函数
            let min = parseInt(time / 60);
            let sec = parseInt(time % 60);
            min = min < 10 ? "0" + min : min;
            sec = sec < 10 ? "0" + sec : sec;
            return min + ":" + sec;
        }
        drag() {
            let bar = document.querySelector(".hui");
            let ball = document.querySelector(".yuan");
            let rate = document.querySelector(".lan");
            let startTime = document.querySelector(".four .left");
            ball.onmousedown=(e)=>{
                bar.x=e.clientX-ball.offsetLeft;
                //再按下的时候让音乐停止播放
                this.audio.pause();
                clearInterval(this.timer)
                document.onmousemove=(e)=>{
                    let l=e.clientX-bar.x;
                    // l/总长度 等于初始时间除上总时间
                    if(l>=(bar.offsetWidth-ball.offsetWidth)){
                        l=bar.offsetWidth-ball.offsetWidth;
                    }
                    if(l<=0){
                        l=0;
                    }
                    this.startTime=l/(bar.offsetWidth-ball.offsetWidth)*this.endTime;
                    this. initBar();
                    console.log(this.startTime)
                    this.a=this.startTime;

                    ball.style.left=l+"px";
                    rate.style.width=l+"px";
                   
                }
                document.onmouseup=()=>{
                    
                    console.log(this.a,"抬起的时候这个变量值")
                    this.barMove();
                    this.audio.play()
                  
                   document.onmousemove=null;
                   document.onmouseup=null;
                }
                return false;
            }
        }
    }

    return musicRender;
});