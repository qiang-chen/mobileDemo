define(['jquery'], function($) {
    /**
     * @function[历史记录功能]
     */

        class History{
            constructor(){
                if(localStorage.getItem("his")){
                    this.arr=JSON.parse(localStorage.getItem("his"))
                }else{
                    this.arr=[];
                }
                this.init();
                
            }
            init(){
                $.ajax({
                    url:'../src/app/data/format.json'
                }).then((res)=>{
                     this.acquire(res.Data);
                })
               this.back();
               this.hisRender();
               this.city();
            }
            hisRender(){
                let his=document.querySelector(".his");
                his.innerHTML=this.arr.map(item=>{
                    return `<span>${item}</span>`;
                }).join("");
            }
            render(data){
                //数据渲染
                let list=document.querySelector(".c-list");
                list.innerHTML=data.map(item=>{
                    return `<div class="c-item">${item.Name}</div>`
                }).join("")
            }
            acquire(data){
                //获取文本框的值
                let input=document.querySelector(".form input");
                let m_one=document.querySelector(".m-one");
                let m_two=document.querySelector(".m-two");
                let fixed=document.querySelector(".fixed");
                let qu=document.querySelector(".qu");
                //当文本框获得焦点的其他东西隐藏
                input.onfocus=()=>{
                    m_one.classList.add("none");
                    fixed.classList.add("none");
                    m_two.classList.remove("none");
                    qu.classList.add("active");
                    input.classList.add("active")
                }
                qu.onclick=()=>{
                    m_one.classList.remove("none");
                    fixed.classList.remove("none");
                    m_two.classList.add("none");
                    qu.classList.remove("active");
                    input.classList.remove("active")
                }
                input.oninput=()=>{
                    let val=input.value;
                    let newData=data.filter(item=>{
                        let flag1=item.Name.slice(0,1)==val;
                        let flag2=item.EName.slice(0,1)==val.toUpperCase();
                        
                        return flag1||flag2
                    });
                    this.render(newData)
                }
                
            }
            back(){
                //返回主页面
                let back=document.querySelector(".back");
                back.onclick=()=>{
                    location.href="index.html";
                }
                let list=document.querySelector(".c-list");
                //搜索出来的东西添加点击事件
                list.onclick=(ev)=>{
                    let e=ev||window.event;
                    let target=e.target||e.srcElement;
                    if(target.classList.contains("c-item")){
                        this.arr.unshift(target.innerText);
                        this.add();
                        this.city(target.innerText)
                    }
                }
                let list1=document.querySelector(".list");
                list1.onclick=(ev)=>{
                    let e=ev||window.event;
                    let target=e.target||e.srcElement;
                    if(target.tagName=="P"){
                        this.arr.unshift(target.innerText);
                        this.add();
                        this.city(target.innerText)
                    }
                }
                let area=document.querySelectorAll(".area");
                area.forEach(item=>{
                    item.onclick=(ev)=>{
                        let e=ev||window.event;
                        let target=e.target||e.srcElement;
                        if(target.tagName=="SPAN"){
                            this.arr.unshift(target.innerText);
                            this.add();
                            this.city(target.innerText)
                        }
                    }
                })
            }
            add(){
                location.href="index.html";
                this.arr=Array.from(new Set(this.arr));
                localStorage.setItem("his",JSON.stringify(this.arr))
            }
            city(city){
                localStorage.setItem("city",city);
            }
        }

        return History;
});