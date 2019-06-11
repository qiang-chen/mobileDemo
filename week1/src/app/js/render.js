define(['jquery'], function($) {
    'use strict';
    class Render{
        constructor(){
            this.init();
        }
        init(){
            $.ajax({
                url:'./app/js/index.json'
            }).then((res)=>{
                this.render(res.movieList);
            })
            
        }
        render(data){
            const list=document.querySelector(".list")
            let str=data.map(item=>{
                let a=item.globalReleased==true?"购票":"预售";
                return `<div class="box">
                <div class="img">
                    <img src="./app/猫眼电影_files/${item.img}" alt="">
                </div>
                <div class="one">
                    <ul>
                        <li class="o"><span>${item.nm}</span><span><s>${item.version.slice(0,4)}</s>${item.version.slice(4)}</span></li>
                        <li class="t">观众评<span>${item.sc}</span></li>
                        <li class="three">主演: <span>${item.star}</span></li>
                        <li class="f"><span>${item.showInfo}</span></li>
                       
                    </ul>
                    <div class="two"><span>${a}</span></div>
                </div>
                
            </div>`
            }).join(" ");
            console.log(list)
            list.innerHTML=str;
        }
    }
    return Render;
});