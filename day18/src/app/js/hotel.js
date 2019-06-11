class Hotel {
    constructor() {
        this.curMonth = new Date().getMonth();
        this.curDate = new Date().getDate();
        this.curDay = new Date().getDay();
        this.curyear = new Date().getFullYear();
        this.ruzhu = document.querySelector(".ruzhu");
        this.likai = document.querySelector(".likai");
        this.ruDay = document.querySelector(".ruDay");
        this.liDay = document.querySelector(".liDay");
        this.index = 0; //用来确定当前span元素下标的
        this.curText = this.curDate; //当前入住下的文字
        this.endText = 0; //几号离店的文字
        // this.curindex = 0; //用来存放当前入住日期的下标
        // this.endindex = 0; //用来存放结束日期的下标
        //console.log(this.curindex)
        this.arr = [0, undefined]; //用来存放当前两个加active的类名下标 0是开始下标 1是结束 下面进行赋值去
        this.init();
    }
    init() {
        this.border();
        this.homeRender();
        this.alert();
        this.render(this.curyear, this.curMonth);
        //此时传入的月份比实际月份小1
        this.render(this.curyear, this.curMonth + 1);
        this.click();
        this.initDate();
    }
    dispose(n) {
        //此函数处理数字
        if (n < 10) {
            return "0" + n
        } else {
            return n
        }
    }
    border() {
        //点击tab切换border

        let border = document.querySelector(".border");
        let t = document.querySelectorAll(".t");
        t.forEach((item, index) => {
            item.onclick = () => {
                let w = item.parentNode.parentNode.offsetWidth * 0.05;
                let tW = item.offsetWidth;
                let none = document.querySelector(".none");
                border.style.left = w + index * tW + "px";
                if (item.innerHTML == "钟点房") {
                    none.previousElementSibling.classList.add("active")
                    none.style.display = "none";
                } else {
                    none.previousElementSibling.classList.remove("active")
                    none.style.display = "block";
                }
            }
        })
    }
    homeRender() {
        //首页面默认事件的渲染
        this.ruzhu.innerHTML = `${this.dispose(this.curMonth)}月${this.dispose(this.curDate)}日`;
        this.likai.innerHTML = `${this.dispose(this.curMonth+1)}月${this.dispose(this.curDate+1)}日`;
        let arr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
        this.ruDay.innerHTML = arr[this.curDay] + "入住";
        if (this.curDay == 7) {
            this.liDay.innerHTML = arr[0] + "离店";
        } else {
            this.liDay.innerHTML = arr[this.curDay + 1] + "离店";
        }

    }
    alert() {
        //点击弹框让遮罩慢慢出来
        let h = document.querySelector(".wrap").offsetHeight;
        let mask = document.querySelector(".mask");
        let container = document.querySelector(".container");
        let time = document.querySelector(".p");
        time.onclick = () => {
            container.style.height = h * 0.72 + "px";
            mask.style.height = h + "px";
        }
        //点击遮罩恢复原样
        mask.onclick = (e) => {
            if (e.target.classList.contains("mask")) {
                container.style.height = 0 + "px";
                mask.style.height = 0 + "px";
            }

        }
    }
    render(year, month) {
        //渲染日历表
        let content = document.querySelector(".content");
        //获取当前月份有多少天
        let allDate = new Date(year, month + 1, 0).getDate();

        //获取每个月一号是星期几
        let week = new Date(year, month, 1).getDay();

        //console.log(allDate,week)
        //创建span用来存放日期 
        //创造span的时候要根据每月一号是星期来判断需要多创造几个span
        //原因是会空出前几个span不使用
        let str = `<div class="c-item">
        <div class="title">
            ${year}年${month+1}月
        </div><div class="date">`;
        //console.log(allDate+week)
        for (let i = 0; i < allDate + week; i++) {
            str += `<span></span>`;
        }
        str += `</div></div>`;
        content.innerHTML += str;

        //获取所有的span给其添加内容
        let spans = document.querySelectorAll(".date span");

        //console.log(spans.length,this.index,"....")
        for (let i = this.index; i < spans.length; i++) {

            if (i >= (week + this.index)) {
                //如果当前下标在当前日期到总日期之间在填充内容
                spans[i].innerText = i - this.index - week + 1;
                if (i == this.curDate) {
                    spans[i].classList.add("active");
                    spans[i].innerText = "今天入住";
                }
            }
        }
        this.index = allDate + 1;
        this.arr[0] = this.getIndex(document.querySelector(".active"));
    }
    click() {
        //给所有的span添加点击事件加高亮
        let content = document.querySelector(".content");
        let spans = document.querySelectorAll(".content span");
        let is_click = true;
        content.onclick = (e) => {
            let target = e.target || e.srcElement;
            if (target.tagName == "SPAN") {

                // 点击时 判断是第一次还是第二次
                // 第一次点击时，初始化开始文字、下标

                //第二次点击 判断点击的时间 是否是 在第一次点击之前
                // 之前就全部初始化
                // 之后就添加离店操作

                //在初始日期之前的都处于不可点击状态
                if (this.getIndex(target) < this.curDay) {
                    return;
                } else {
                    if (is_click = !is_click) {

                        if (this.getIndex(target) == this.getIndex(document.querySelector(".active"))) {
                            for (let i = 0; i < spans.length; i++) {
                                spans[i].classList.remove("f");
                            }

                        }
                        //第二次点击的情况
                        //console.log(this.arr,"是在这里出现的错误吗")
                        this.rudianLight(target);
                        //console.log("进来了吗")
                        for (let i = 0; i < spans.length; i++) {
                            spans[i].classList.remove("f");
                        }
                    } else {
                        if (this.getIndex(target) == this.getIndex(document.querySelector(".active"))) {
                            console.log(1)
                            return;
                        }
                        //如果是第一次点击的话要添加离店

                        //判断与入店时候的下标比较 如果之后则住店 之前则取消改成入店

                        //获取离店时的下标 
                        this.arr[1] = this.getIndex(target);

                        if (this.arr[1] > this.arr[0]) {
                            this.endText = target.innerText;
                            target.innerText = this.endText + "号离店";
                            target.classList.add("active");
                            for (let i = 0; i < spans.length; i++) {
                                spans[i].classList.remove("f");
                                if (i > this.arr[0] && i < this.arr[1]) {
                                    if (spans[i].innerText.length != 0) {
                                        spans[i].classList.add("f")
                                    }
                                }
                            }

                        } else {
                            console.log(3)
                            //这个else的目的就是单纯的初始值 但是要注意把结尾文字改了
                            this.endText = target.innerText;
                            this.rudianLight(target)
                            is_click = !is_click;

                            for (let i = 0; i < spans.length; i++) {
                                spans[i].classList.remove("f");
                            }
                        }
                    }
                }


            }
        }
    }
    rudianLight(target) {
        //入店高亮效果操作
        let spans = document.querySelectorAll(".content span");
        spans[this.arr[0]].innerText = this.curText;
        if (this.arr[1]) {
            spans[this.arr[1]].innerText = this.endText;
        }
        for (let i = 0; i < spans.length; i++) {
            spans[i].classList.remove("active");
        }
        target.classList.add("active");
        this.curText = target.innerText;
        if (this.curText == this.curDate) {
            target.innerText = "今日入住";
        } else {
            target.innerText = `${this.curText}号入住`;
        }
        //获取下次入店时候的下标
        this.arr[0] = this.getIndex(target);

    }
    getIndex(el) {
        //封装一个获取spans下标的方法
        let spans = document.querySelectorAll(".content span");

        for (let i = 0; i < spans.length; i++) {
            if (el == spans[i]) {
                return i;
            }
        }
    }
    initDate(){
        //初始化字体颜色
        let spans=document.querySelectorAll(".content span");
        for (let i = 0; i < spans.length; i++) {
            if(i<this.curDay){
                spans[i].style.color = "#ccc";
            }
            
        }
    }
}