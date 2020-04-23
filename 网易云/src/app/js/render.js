define(['jquery'], function ($) {
    /**
     * @function[此函数是往页面渲染歌曲信息的]
     */

    class musicRender {
        constructor() {
            this.data = null;
            this.audio = document.querySelector("#audio");
            this.right = document.querySelector(".right");
            this.end = document.querySelector(".four .right"); //进度条的结束位置
            this.start = document.querySelector(".four .left"); //进度条的开始位置
            this.bar = document.querySelector(".hui"); //进度条
            this.ball = document.querySelector(".yuan"); //小球
            this.rate = document.querySelector(".lan"); //进度条走的颜色
            this.curL = 0; //小球默认左边距离和进度条走的距离
            this.endTime = null; //进度条的在移动的时候结束位置
            this.startTime = 0; //进度条在移动的时候初始位置
            this.beiChild = document.querySelectorAll(".bei span"); //倍速
            this.arr = ["iconfont icon-suijibofang3 random", "iconfont icon-single random", "iconfont icon-shunxubofang  random"]
            this.curIndex = 0; //当前歌曲在播放的下标
            this.curTime = 1000; //定时器初始化时间
            this.timer = null;
            this.a = 0; //再点击暂停时保存一下当前进度的时间
            this.flag=0;//判断播放方式
            this.init();

        }
        init() {
            $.ajax({
                url: './app/common/index.json',
            }).then((res) => {
                this.data = res;
                this.render(res);
                this.leftRender(res)
            });
            this.drag();
            this.volume();
            this.random();
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

            //双击事件
            right1.forEach((item, index) => {
                item.ondblclick = () => {
                    this.initBar(); //让进度条的时间对应起来
                    //双击的时候加个样式
                    // if (item.classList.contains("active")) {
                    //     //如果在播放的时候在一次双击就让这首歌从头开始播放
                    //     console.log("第二次点击")
                    //     this.audio.currentTime = 0; //从0秒的时候开始播放

                    // } else {

                    // }
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
                    console.log(11)
                    clearInterval(this.timer);
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
                        this.barMove();
                        if (flag) {
                            this.initBar();
                            flag = false;
                        }

                        return;
                    }
                    console.log("播放")
                    this.audio.play();
                    // this.audio.onplay=()=>{
                    //     console.log("888888888888888888888888")
                    //     this.barMove();
                    // }
                    this.barMove();
                } else {
                    center.classList.remove("icon-zanting2");
                    center.classList.add("icon-weibiaoti102");
                    //console.log(audio[this.curIndex+1])
                    this.audio.pause();
                    clearInterval(this.timer);
                    console.log(88888)
                    this.barMove();
                }

            }
        }
        speed() {
            //设置倍速
            this.beiChild.forEach(item => {
                item.onclick = () => {
                    let tet = item.innerText * 1;
                    this.audio.playbackRate = tet;
                    this.curTime = this.curTime / tet;
                    clearInterval(this.timer);
                    console.log(this.audio.duration)
                    //在歌曲进行播放的时候动态改变进度条的长度和时间
                    //首先获取初始位置时间就是这个标签的currentTime
                    //求出每一秒的走的进度
                    let speed = ((this.bar.offsetWidth - this.ball.offsetWidth) / this.audio.duration) * 1;
                    //console.log(this.curTime)
                    this.startTime = this.audio.currentTime;
                    this.timer = setInterval(() => {
                        //定时器每次执行的时候让起始时间加一下
                        this.startTime++;
                        

                        this.start.innerText = this.cycle(this.startTime);
                        this.curL += speed;
                        this.rate.style.width = this.curL + "px";
                        this.ball.style.left = this.curL + "px";
                        console.log(this.audio.ended,"再点击了倍速后的状态")
                        if (this.audio.ended) { //如果这首歌加载完毕后让其执行一个自动播放功能
                            this.autoplay()
                        }
                        if (this.startTime >= this.audio.duration) {
                            //如果起始时间大于或者等于这首歌的总时长的时候清除这个定时器
                            this.startTime = parseInt(this.audio.duration)
                            if(!this.audio.ended){
                                this.autoplay()
                            }
                            clearInterval(this.timer)
                        }
                    }, this.curTime)
                }
            })
        }
        initBar() {
            this.startTime = 0;
            this.curL = 0;
            this.start.innerText = this.cycle(0);
            this.rate.style.width = this.curL + "px";
            this.ball.style.left = this.curL + "px";
            this.audio.oncanplay = () => { //必须在oncanplay方法里获取当前时间 不然得不到
                console.log(this.audio.duration, "初始总时间")
                //初始化进度条的意思是把进度条的起始事件每次设置成0把结束位置设置成这首歌的长度
                let musicTime = this.audio.duration; //把此时得到的时间转换成分钟赋值给进度条的结束时间
                //console.log(musicTime);
                this.end.innerText = this.cycle(musicTime); //把歌曲的长度赋值给这个位置

            }
        }
        barMove() {
            //console.log(this.a,"移动的时候进来的变量")
            console.log(111)
            this.audio.onplay = () => {
                //在歌曲进行播放的时候动态改变进度条的长度和时间
                //首先获取初始位置时间就是这个标签的currentTime
                //求出每一秒的走的进度
                let speed = ((this.bar.offsetWidth - this.ball.offsetWidth) / this.audio.duration) * 1;
                //console.log(this.curTime)
                this.curTime = 1000
                this.timer = setInterval(() => {
                    //定时器每次执行的时候让起始时间加一下
                    this.startTime++;
                    this.start.innerText = this.cycle(this.startTime);
                    this.curL += speed;
                    this.rate.style.width = this.curL + "px";
                    this.ball.style.left = this.curL + "px";
                   
                    console.log(this.audio.ended)
                    if (this.audio.ended) { //如果这首歌加载完毕后让其执行一个自动播放功能
                        this.autoplay()
                    }

                    if (this.startTime >= this.audio.duration) {
                        //如果起始时间大于或者等于这首歌的总时长的时候清除这个定时器
                        this.startTime = parseInt(this.audio.duration);
                        if(!this.audio.ended){
                            this.autoplay()
                        }
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
            this.ball.onmousedown = (e) => {
                this.bar.x = e.clientX - this.ball.offsetLeft;
                //再按下的时候让音乐停止播放
                this.audio.pause();
                clearInterval(this.timer)
                document.onmousemove = (e) => {
                    let l = e.clientX - this.bar.x;
                    // l/总长度 等于初始时间除上总时间
                    if (l >= (this.bar.offsetWidth - this.ball.offsetWidth)) {
                        l = this.bar.offsetWidth - this.ball.offsetWidth;
                    }
                    if (l <= 0) {
                        l = 0;
                    }
                    console.log(this.audio.duration)
                    this.curL = l * 1;
                    this.startTime = (l / (this.bar.offsetWidth - this.ball.offsetWidth)) * this.audio.duration;
                    this.ball.style.left = l + "px";
                    this.rate.style.width = l + "px";

                }
                document.onmouseup = () => {

                    this.audio.currentTime = this.startTime;
                    this.barMove();
                    this.audio.play()

                    document.onmousemove = null;
                    document.onmouseup = null;
                }
                return false;
            }

        }
        volume() {
            let volumeBar = document.querySelector(".bai");
            let volumeBall = document.querySelector(".tiao");
            let volumeRate = document.querySelector(".yin");
            volumeBall.onmousedown = (e) => {
                volumeBall.y = e.clientY - volumeBall.offsetTop - volumeBall.offsetHeight;
                //console.log(volumeBall.y)
                document.onmousemove = (e) => {
                    //console.log(e.clientY)
                    let t = e.clientY - volumeBall.y;
                    let newT = volumeBar.offsetHeight - t;
                    if (newT >= (volumeBar.offsetHeight - volumeBall.offsetHeight)) {
                        newT = volumeBar.offsetHeight - volumeBall.offsetHeight;
                    }
                    if (newT < 0) {
                        newT = 0;
                    }
                    let barVolume = newT / (volumeBar.offsetHeight - volumeBall.offsetHeight) * 100;
                    console.log(barVolume)
                    console.log(this.audio.volume)
                    this.audio.volume = barVolume / 100;
                    //console.log(t-volumeBar.offsetHeight)
                    volumeBall.style.bottom = newT + "px";
                    volumeRate.style.height = newT + "px";
                    volumeRate.style.bottom = 0;

                }
                document.onmouseup = () => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                }
            }
        }
        random() {
            let random = document.querySelector(".random");
            let count = 0;
            //console.log(random)
            random.onclick = () => {
                count++;
                if (count == this.arr.length) {
                    count = 0
                }
                this.arr.forEach((item, index) => {
                    if (count == index) {
                        random.className = item;
                       this.flag=index;
                    }
                })
            }
        }
        autoplay() {
            //音乐自动播放下一首
            this.curTime = 1000
            let center = document.querySelector(".center");
            let right1 = document.querySelectorAll(".right1");
            console.log(this.flag)
            switch (this.flag){
                case 1:
                this.curIndex=this.curIndex;
                break;
                case 2:
                this.curIndex++;
                break;
                case 0:
                this.curIndex=Math.floor(Math.random()*right1.length)
                break;
                default:
                break;
            }
            
            if (this.curIndex >= right1.length){
                this.curIndex=0;
            }
                this.audio.src = this.data[this.curIndex].src;
            this.initBar();
            clearInterval(this.timer)
            this.barMove();
            center.classList.remove("icon-weibiaoti102");
            center.classList.add("icon-zanting2");
            for (let i = 0; i < right1.length; i++) {
                right1[i].classList.remove("active")
            }
            right1[this.curIndex].classList.add("active");

        }
        leftRender(data){
            //左边内容的渲染
            let str="";
            let left2=document.querySelector(".left .left2");
            console.log(data)
            data.forEach(item=>{
                str+=`<span>${item.name}</span>`;
            });
        console.log(left2)
            left2.innerHTML=str;
        }
    }

    return musicRender;
});