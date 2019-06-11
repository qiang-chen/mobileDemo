class Index {
    constructor() {
        //这个函数和构造函数一样能看懂吗
        this.data=null;
        this.init()
    }
    init() {
        $.ajax({
            url: './data.json'
        }).then((res) => {
            this.render(res);
            this.click(res); //不得用数据吗 对 放里面嘻嘻
        })
        this.autoplay();
        this.bs();
        this.touch();
        this.scroll();
    }
    autoplay() {
        let span = document.querySelectorAll(".nav span")
        let swiper = new Swiper(".swiper-container", {
            autoplay: {
                disableOnInteraction: false
            },
            on: {
                slideChange: function() {
                    for (let i = 0; i < span.length; i++) {
                        span[i].classList.remove("active")
                    }
                    //看出bug了吗 我手滑动了然后自动轮播就停了 会吗你亲你有没有在看
                    span[this.activeIndex].classList.add("active")
                },
            },
        });
        //忘了单词了 教你怎么找到  怎么不行呢
        console.dir(swiper)
    }
    render(data) {
        let content = document.querySelector(".content");
        let str = data.map(item => {
            return `  <div class="item">
            <div class="box">
            <div class="item-left">图片</div>
            <div class="item-right">
                <p  class="price">价格<span>${item.price}</span>元</p>
                <p  class="xiaoliang">销量<span>${item.xiaoliang}</span>份</p>
                <p  class="juli">距离<span>${item.juli}</span>分钟</p>
            </div>
            </div>
        </div>`;
        }).join("");
        let str1 = `<div class="loadUp">正在加载中。。。。</div>`
        content.innerHTML += str; //知道为什么+=吗
        content.innerHTML += str1;
    }
    bsRender(data) {
        //再写一个拖动渲染 和那个区分下
        let content = document.querySelector(".content");
        let str = data.map(item => {
            return `  <div class="item">
            <div class="box">
            <div class="item-left">加载</div>
            <div class="item-right">
                <p  class="price">价格<span>${item.price}</span>元</p>
                <p  class="xiaoliang">销量<span>${item.xiaoliang}</span>份</p>
                <p  class="juli">距离<span>${item.juli}</span>分钟</p>
            </div>
            </div>
        </div>`;
        }).join("");
        let str1 = `<div class="loadUp">正在加载中。。。。</div>`
        content.innerHTML += str; //知道为什么+=吗
    }
    downRender(data) {
        let contents = document.querySelector(".content");
        //let str1 = `<div class="loadUp">正在加载中。。。。</div>`
        // contents.insertBefore(str, $(".item")[0]);//知道为什么+=吗
        // contents.innerHTML += str
        //你知不知道insetBefore这个属性是干嘛的 知道
        // 添加节点的  添加节点所读一所以str不行  对 想办法解决想不到 傻子吗 你把它转换成节点不就行了吗咋转啊 想想什么东支持str这种字符想不到啊我的天呢  一个盒子的innerHTML不就支持吗 创建一个容器 
        this.data=data;
        this.data.forEach(item => {
            var box = document.createElement("div");
            box.className = "item";

            box.innerHTML = ` 
            <div class="box">
            <div class="item-left">刷新</div>
            <div class="item-right">
                <p  class="price">价格<span>${item.price}</span>元</p>
                <p  class="xiaoliang">销量<span>${item.xiaoliang}</span>份</p>
                <p  class="juli">距离<span>${item.juli}</span>分钟</p>
            </div>
            </div>` //用+=吗？自己是 发现问题再改
            contents.insertBefore(box, $(".item")[0]);
        })

    }
    bs() {
        //做上拉加载
        let content = document.querySelector(".content");
        //连接分线程
        var that = this
        let work = new Worker("./creat.js");
        let bs = new BScroll(".list", {
            pullUpLoad: true,
            pullDownRefresh: {
                threshold: 50,
                stop: 10,
            },
            click:true,
            //做控制法制的 停在一个位置的sha?  算了 按你的想法
        })
        bs.on("pullingUp", () => {
            console.log("上拉加载中")
                //在这里触发了上拉加载事件 我们利用work获取数据还是直接写work好 看着
            work.postMessage("请求数据");

            //接受分线程数据
            work.onmessage = (e) => {
                let arr = e.data;
                if (arr) {
                    //在渲染之前要干什么？？问你呢 回答直接宣 错  渲染之前要把之前写的loadup盒子删除为什么 因为数据出来了这个盒子就不需要了删了还怎么啦啊 等数据加载完毕再重新家还是那个好 看着点
                    let loadUp = document.querySelector(".loadUp");
                    let clone = loadUp.cloneNode(true);
                    console.log(loadUp)
                        //content的用处来了
                    content.removeChild(loadUp);
                    this.bsRender(arr);
                    //发现什么问题了？没  自己去没问题呀 打死你算了 你没发现脱一次后没发生了没加那个盒子吧不是好吧 上拉事件只触发了一次 看控制台那个
                    //知道问为什么吗
                    //得刷新吧  这个不是 得结束
                    //结束我忘了怎么写了 教你怎么找
                    //我不会写我去找找 你知道就看着
                    bs.finishPullUp();
                    //结束后要干什么刷新 刷新你个大头鬼 盒子删除了不加上啊
                    content.appendChild(clone);
                    bs.refresh();
                    //懂了吗/dong  hao 
                    //下面左下拉刷新我做吧 好你敲我看着
                }
            }
        })
        bs.on("pullingDown", function() {
            //把上面合住  写吧
            var div = document.createElement("div");
            div.className = "loadDown"
            div.innerHTML = "正在加载"
                // 怎么没有啊  自己检查问题 首先看事件有没有触发
            content.insertBefore(div, $(".item")[0])
            work.postMessage("请求数据");

            //接受分线程数据

            work.onmessage = (e) => {
                let arr = e.data;
                if (arr) {

                    //content的用处来了
                    // console.log($(".loadDown")) 获取不 到   搞清你的逻辑 是先加这个盒子等渲染完 再删除还是先删除在家

                    that.downRender(arr);
                    //发现什么问题了？没  自己去没问题呀 打死你算了 你没发现脱一次后没发生了没加那个盒子吧不是好吧 上拉事件只触发了一次 看控制台那个
                    //知道问为什么吗
                    //得刷新吧  这个不是 得结束
                    //结束我忘了怎么写了 教你怎么找
                    //我不会写我去找找 你知道就看着
                    bs.finishPullDown();
                    //结束后要干什么刷新 刷新你个大头鬼 盒子删除了不加上啊
                    console.log($(".loadDown"))
                    content.removeChild($(".loadDown")[0])
                        //把你的逻辑写一下 在对应的你代码看下
                        //下拉添加盒子渲染删除盒子 对 看你的代码怎么写的  好了  真是心累你就不能自己演示下看看问题吗 这不是好了吗 你整整看了二十多分钟 不给你演示出你还没发现 不让你复制非要复制
                    bs.refresh();
                    //没了  废话 没有为啥看好我给你演示
                    //为啥  你知道你在干嘛？ 你调用我渲染的bsrender这个函数你觉得能看出效不会  你不是自己写乐一个渲染函数吗 把图片两个改成刷新不就行吗在前面添加那个不对肯定 

                }
            }
        })
    }
    click(data) {
        //做排序功能  如果你不去吃饭就写完 回来我看 从这里写 你 写吧好   bug在哪里了没判断如果就是有两个相同的会渲染两边   你写的什么鬼东西 sort让你看 你一起一直这么写？我不会  看好
        let prices = document.querySelector(".priceSort");
        // console.log(price)
        // price.onclick = () => {
        //     let newData = data.sort((a, b) => {
        //         return b - a
        //     })
        // }
        let xiaoliangSort = document.querySelector(".xiaoliangSort");
        let kmSort = document.querySelector(".kmSort");
        let that = this;
        prices.onclick = () =>{
            //这里是按销量价格  好 看着
            //声明一个新数据
            let newData = data.sort((a, b) => {
                        return b.price - a.price
                    });
            this. sortRender(newData);
            //看懂了吗？   如果我点了下拉刷新你怎么排 点了下拉刷新就把刷新过来的数据先排序在渲染怎么写
            //定义一个全局变量
            //不对 这个歌题没法这么写  应该在下拉舒心或者上拉加载的时候判断一个这些按钮是否被点击过 如果被点击过让他出来的数据就是有顺序的  太麻烦了 一般排序后就不刷新了 因为我们没有数据 人家正规的刷新是让页面重新向服务器请求一次数据 把整个页面的数据替换了 不是我们这种加上一些 懂？  我写的是获取页面所有的比如价格放到数组里排序拍好和数据判断相同渲染出来但是会渲染重复的  你写的那个就是以前的封装排序 正规的没有操作DOM的都是处理数据  把数据处理好直接往页面 恩恩  下回你用sort这个方法直接拍 这样方便 一分钟就行 做下一个吧   做个touch事件吧 把这个列表往做一划出来一个删除 我们点击能把这一行删除了  吸顶吧  那个我会 周考考了我知道考了 吸顶在这个better-scroll事件中没法做 因为他的scroll-top 失效 有一种能模仿的方法 我要让你找到原因后告诉你 很简单 你找到原因后从哪里加两三句代码就能出来 那还做啥 touch事件 你写换一个我不会的吧 你什么不会 还有啥效果 还有画布和canvas 还有动画那还是这个吧基本上就是这几个效果没别的了 好吧  做touch？
        }
        xiaoliangSort.onclick = function() {
            that.mySort(".xiaoliang span", data, "xiaoliang")
        }
        kmSort.onclick = function() {
            that.mySort(".juli span", data, "juli", 1)
        }
    }
    sortRender(data){
        let content = document.querySelector(".content");
        let str = data.map(item => {
            return `  <div class="item">
            <div class="box>
            <div class="item-left">图片</div>
            <div class="item-right">
                <p  class="price">价格<span>${item.price}</span>元</p>
                <p  class="xiaoliang">销量<span>${item.xiaoliang}</span>份</p>
                <p  class="juli">距离<span>${item.juli}</span>分钟</p>
                </div>
            </div>
        </div>`;
        }).join("");
    
        content.innerHTML = str; //知道为什么+=吗
     
    }
    mySort(name, data, key, blo) {
        var el = document.querySelectorAll(name);
        var arr = [];
        var newArr = []

        function small(a, b) {
            return a - b;
        }

        function big(a, b) {
            return b - a;
        }
        el.forEach(item => {
            arr.push(item.innerHTML * 1)
        })
        if (blo) {
            console.log(1)
            arr.sort(small);
        } else {
            arr.sort(big);
        }
        arr.forEach(item => {
            data.forEach(v => {
                if (v[key] == item) {
                    newArr.push(v)
                }
            })
        })
        this.ren(newArr)
    }
    ren(data) {
        let content = document.querySelector(".content");
        let str = ""
        data.forEach(item => {
            str += `<div class="item">
                        <div class="item-left">图片</div>
                        <div class="item-right">
                            <p  class="price">价格<span>${item.price}</span>元</p>
                            <p  class="xiaoliang">销量<span>${item.xiaoliang}</span>份</p>
                            <p  class="juli">距离<span>${item.juli}</span>分钟</p>
                        </div>
                    </div>`
        })
        content.innerHTML = str;
        let str1 = `<div class="loadUp">正在加载中。。。。</div>`
        content.innerHTML += str1;
    }
    touch(){
        //你不先排版？不是划下面的item吗对 从右边出来个正方形 你不拍进去？一边写一边拍 本来厉害  那你来吧
        //你这样写你觉得能对？   item是不断渲染的 你这样后面的怎么能有  用时间委托 
        let startX,endX;
        var content=document.querySelector(".content");
        content.ontouchstart=function(e){
            if($(e.target).parents(".box")){
                var changedTouches=e.changedTouches[0]
                startX=changedTouches.clientX
            }
        }
        content.ontouchend=function(e){
            if($(e.target).parents(".box")){
                var changedTouches=e.changedTouches[0]
                endX=changedTouches.clientX
                var el=$(e.target).parents(".box")[0]
                // el.style.left="-1rem";
                // $(el).animate({
                //     left:"-1rem"
                // },1000)
                //用c3姐姐 你还真能偷懒 没要求真的是  行了吧 恩
               
                if(startX-endX<0){
                    el.style.transform="translateX(0)";
                    var deletes=el.querySelector(".deletes");
                    el.removeChild(deletes)
                }else if(startX-endX>0){
                    el.style.transform="translateX(-1rem)";
                    var div=document.createElement("div");
                    div.innerHTML="删除"; 
                    div.className="deletes"
                    el.appendChild(div)
                }
                    
            }
            var deletes=el.querySelector(".deletes");
                    var content=document.querySelector(".content")
                    //神奇吧 点击事件不生效  给你提个醒 你写的这里没错 原因在别处 哪啊  想想better-scroll  我就没用过那个  唉你不是说会吗 我之前就是这么写的对啊 这次让你写肯定有不一样的地方  考试你碰见是不是郁闷死了  在better-scroll中所有的点击事件失效不知道吗 我没引啊 咋回事 我都说了点击事件失效  去better-scroll加click：true 我没引 你没引怎么做的上落下啦 
                    deletes.onclick=function(){
                        console.log(1)
                        content.removeChild(el.parentNode)
                    }
        }
        
        //你是要给item添加事件 你现在再给添加？ 点的都不是item  对 因为事件委托委托所有元素 想办法判断没办法为什么没有办法因为想不到....这么灵性的回答？你考试怎么办 你我不是说会吗 我考试获取啊 放到渲染后面不就行了恩 那样太麻烦 找他们的公共点 父元素吗对 父元素也不是item  判断所有的父元素中有没有一个元素的名字叫做item 你还说我的麻烦你的更麻烦  jq中一个parentAll就出来没用过杂用啊....那你自己封装一个 zayong
    }
    scroll(){
        //说你什么好 你不是会吗 这个东西都不知道？这个月真的逛完了？  吸顶不会  你给title做吸顶 自己做 做到问题再说
        var title=document.querySelector(".title");
        //给谁家scroll  你想想 
        //我想让这个页面整体往上滑 包裹banner图 忽略之前做的 你想想怎么改才行 然后那个价格排序那一栏到头部底下后有吸顶效果  排版用变吗  加个盒子就行了 cssyangshi
        //还得再写一个 BScroll?en 
        var bs=new BScroll("main",{
            //什么type  你想问什么？ 单词天呢  你想干嘛 什么事  打印 咋了
            probeType:3,
        })
        bs.on("scroll",function(e){
            var y=e.y;
            console.log(y)
        })
        console.dir(bs)
    }
}