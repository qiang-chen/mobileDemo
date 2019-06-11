class Render {
    constructor() {
        this.init();
    }
    init() {
        $.ajax({
            url: "./data.json"
        }).then((res) => {
            this.render(res);
            this.search(res);
            this.sort(res);
        })
        this.scroll();

    }
    render(data) {
        let content = document.querySelector(".content");
        let str = data.map(item => {
            return `<div class="box">
            <div class="b-left">
                <img src=${item.img} alt="">
            </div>
            <div class="b-right">
                <div class="one">
                    ${item.title}
                </div>
                <div class="two">
                    <div class="t-l">
                        <span>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                        </span>
                        <span>4.7</span>
                        <span>月售3047</span>
                    </div>
                    <div class="t-r">
                        <span>${item.time}分钟</span>
                        <span>6.3km</span>
                    </div>
                </div>
                <div class="three">
                    <span>起送￥25</span><span>配送￥9</span><span>${item.price}</span>
                </div>
                <div class="four">
                    <i>减</i><span>满30减6、满50减12、满65减16</span>
                </div>
                <div class="five">
                    <i>折</i><span>折扣商品7.89折起</span>
                </div>
            </div>
        </div>`
        }).join("");

        content.innerHTML += str;
    }
    sortRender(data) {
        let content = document.querySelector(".content");
        let str = data.map(item => {
            return `<div class="box">
            <div class="b-left">
                <img src=${item.img} alt="">
            </div>
            <div class="b-right">
                <div class="one">
                    ${item.title}
                </div>
                <div class="two">
                    <div class="t-l">
                        <span>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                        </span>
                        <span>4.7</span>
                        <span>月售3047</span>
                    </div>
                    <div class="t-r">
                        <span>${item.time}分钟</span>
                        <span>6.3km</span>
                    </div>
                </div>
                <div class="three">
                    <span>起送￥25</span><span>配送￥9</span><span>${item.price}</span>
                </div>
                <div class="four">
                    <i>减</i><span>满30减6、满50减12、满65减16</span>
                </div>
                <div class="five">
                    <i>折</i><span>折扣商品7.89折起</span>
                </div>
            </div>
        </div>`
        }).join("");

        content.innerHTML = str;
    }
    scroll() {
        let wrap = document.querySelector(".wrap");
        let nav = document.querySelector(".nav");
        let h_right = document.querySelector(".h-right");
        let h_rightW = h_right.offsetWidth;
        let h_left = document.querySelector(".h-left");
        let h_leftW = h_left.offsetWidth;
        let hW = document.querySelector("header").offsetWidth;
        let bs = new BScroll("main", {
            probeType: 3,
            pullUpLoad: true,
            click: true
        })
        let clone = null;
        let count = 0;
        bs.on("scroll", function (e) {
            if (Math.abs(e.y) > nav.offsetTop) {
                if (count == 0) {
                    clone = nav.cloneNode(true);
                    clone.classList.add("fixed");
                    document.body.appendChild(clone);
                }
                h_right.style.width = hW + "px";
                count++;
            } else {
                h_right.style.width = h_rightW + "px";
                count = 0;
                if (document.querySelector(".fixed")) {
                    document.body.removeChild(clone)
                }

            }
        })

        //加载更多功能


        //利用work创造数据用于下拉加载中

        let work = new Worker("./creat.js")

        bs.on("pullingUp", (e) => {
            //console.log("上拉加载")
            let clone = document.querySelector(".load");
            //像work发送数据请求
            work.postMessage("请求数据");
            //console.log(main.transform,"上拉过程中距离顶部的距离")
            //接受分线程传过来的数据
            work.onmessage = (e) => {
                if (e.data.length != 0) {
                    wrap.removeChild(document.querySelector(".load"));
                    this.render(e.data);
                    wrap.appendChild(clone);
                    bs.finishPullUp();
                    bs.refresh()
                    //console.log(bs)
                }
            }
        })
        this.dingbu(bs);
    }
    search(data) {
        //模糊搜索功能

        let search = document.querySelector(".search");

        search.oninput = () => {
            let tet = search.value;
            let newData = data.filter(item => {
                return item.title.includes(tet)
            });
            this.render(newData)
        }
    }
    sort(data) {
        //点击排序功能
        let money = document.querySelectorAll(".money");
        console.log(money)
        money.forEach(item => {
            item.onclick = () => {
                let newData = data.sort((a, b) => {
                    let num1 = a.price.slice(3);
                    let num2 = b.price.slice(3)
                    return num2 - num1
                });
                this.sortRender(newData)
                console.log(333)
            }
        })

    }
    dingbu(bs){
        //返回顶部操作
        let dingbu=document.querySelector(".dingbu");
        dingbu.onclick=()=>{
            bs.scrollTo(0,0,1000)
        }
       
    }
}