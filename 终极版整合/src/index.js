class Index {
    constructor() {
        //这个函数和构造函数一样能看懂吗
        this.init()
    }
    init() {
        $.ajax({
            url: './data.json'
        }).then((res) => {
            this.render(res);
            this.click(res);//不得用数据吗 对 放里面嘻嘻
        })
        this.autoplay();
        this.bs();

    }
    autoplay() {
        let span = document.querySelectorAll(".nav span")
        let swiper = new Swiper(".swiper-container", {
            autoplay: {
                disableOnInteraction: false
            },
            on: {
                slideChange: function () {
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
            <div class="item-left">图片</div>
            <div class="item-right">
                <p  class="price">价格<span>${item.price}</span>元</p>
                <p  class="xiaoliang">销量<span>${item.xiaoliang}</span>份</p>
                <p  class="juli">距离<span>${item.juli}</span>分钟</p>
            </div>
        </div>`;
        }).join("");
        let str1 = `<div class="loadUp">正在加载中。。。。</div>`
        content.innerHTML += str;//知道为什么+=吗
        content.innerHTML += str1;
    }
    bsRender(data) {
        //再写一个拖动渲染 和那个区分下
        let content = document.querySelector(".content");
        let str = data.map(item => {
            return `  <div class="item">
            <div class="item-left">加载</div>
            <div class="item-right">
                <p  class="price">价格<span>${item.price}</span>元</p>
                <p  class="xiaoliang">销量<span>${item.xiaoliang}</span>份</p>
                <p  class="juli">距离<span>${item.juli}</span>分钟</p>
            </div>
        </div>`;
        }).join("");
        let str1 = `<div class="loadUp">正在加载中。。。。</div>`
        content.innerHTML += str;//知道为什么+=吗
    }
    downRender(data) {
        let contents = document.querySelector(".content");
        //let str1 = `<div class="loadUp">正在加载中。。。。</div>`
        // contents.insertBefore(str, $(".item")[0]);//知道为什么+=吗
        // contents.innerHTML += str
        //你知不知道insetBefore这个属性是干嘛的 知道
        // 添加节点的  添加节点所读一所以str不行  对 想办法解决想不到 傻子吗 你把它转换成节点不就行了吗咋转啊 想想什么东支持str这种字符想不到啊我的天呢  一个盒子的innerHTML不就支持吗 创建一个容器 
        data.forEach(item => {
            var box = document.createElement("div");
            box.className = "item";
            box.innerHTML = ` <div class="item-left">刷新</div>
            <div class="item-right">
                <p  class="price">价格<span>${item.price}</span>元</p>
                <p  class="xiaoliang">销量<span>${item.xiaoliang}</span>份</p>
                <p  class="juli">距离<span>${item.juli}</span>分钟</p>
            </div>`//用+=吗？自己是 发现问题再改
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
                    let clone = loadUp.cloneNode(true)
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
        bs.on("pullingDown", function () {
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
        //做排序功能  如果你不去吃饭就写完 回来我看 从这里写 你 写吧好
        let price=document.querySelector(".priceSort");

        price.onclick=()=>{
            let newData=data.sort((a,b)=>{
                return
            })
        }
}
}