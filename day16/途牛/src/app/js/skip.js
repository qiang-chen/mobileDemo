define([], function() {
    'use strict';
    class Skip{
        constructor(){
            this.init();
            this.city();
        }
        init(){
            let area=document.querySelector(".a");
            area.onclick=()=>{
                location.href='addr.html'
            }
        }
        city(){
            let city=localStorage.getItem("city");
            if(city!="undefined"){
                document.querySelector(".a").innerHTML=city
            }
        }
    }
    return Skip;
});