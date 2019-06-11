define(['jquery'], function($) {
    'use strict';
    class RENDER{
        constructor(){
            this.fixed=document.querySelector(".fixed");
            this.list=document.querySelector(".list");
            this.main=document.querySelector("main");
            this.arr=[];
            this.init();
        }
        init(){
            $.ajax({
                url:'../src/app/data/format.json'
            }).then((res)=>{
                this.render(res.Data);
                this.contentRender(res.Data);
            });
            this.scroll();
        }
        render(data){
            data.forEach((item,index)=>{
                this.arr.push(item.PrefixEName);
            });
            this.arr=Array.from(new Set(this.arr)).sort();
            this.arr.unshift("定位","历史","热门");
            //左边固定导航的渲染
            let str=this.arr.map((item)=>{
                return `<span>${item}</span>`;
            }).join("");
            this.fixed.innerHTML=str;
        }
        contentRender(data){
            let str="";
            this.arr.splice(0,3);
            str=this.arr.map(item=>{
                return `<div class="list-title">
                ${item}
            </div>
            <div class="list">${
                data.map(ele=>{
                   if(ele.PrefixEName==item){
                    return `<p>${ele.Name}</p>`;
                   }
                }).join("")}
            </div>`;  
            }).join("");
            this.list.innerHTML=str;
        }
        scroll(){
            this.fixed.onclick=(ev)=>{
                let e=ev||window.event;
                let target=e.target||e.srcElement;
                if(target.tagName=="SPAN"){
                    let text=target.innerText;
                    let title=this.list.querySelectorAll(".list-title");
                    if(target.innerText=="定位"||target.innerText=="历史"||target.innerText=="热门"){
                        this.main.scrollTop=0;
                    }
                    title.forEach((item,index)=>{
                        if(item.innerText==text){
                            let t=item.offsetTop;
                            this.main.scrollTop=t-46;
                        }
                    })
                }
            }
        }
    }

    return RENDER;
});