define(['jquery'], function($) {
    //'use strict';
    /**
     * @function[封装一个拖拽插件]
     */
     
     class Drag{
         constructor(opt){
             this.btn=opt.btn;
             this.disX=0;
             this.a=0;
             this.b=0;
            this.init();
         }
         init(){
            this.Event();
         }
         Event(){
            var that = this;
            this.btn.addEventListener("mousedown",(ev)=>{
                let e=ev||window.event;
                // this.btn.l=e.clientX-this.btn.getBoundingClientRect().left
                this.disX=e.clientX-this.btn.offsetLeft;
                document.addEventListener("mousemove",this.a=this.move.bind(this));
                document.addEventListener("mouseup",this.b=this.up.bind(this));
                return false;
            })
         }
         move(ev){
            let e=ev||window.event;
            // console.log(this.btn.l);
            let l=e.clientX-this.disX;
            this.btn.style.left=l+"px";
         }
         up(){
             document.removeEventListener("mousemove",this.a);
             document.removeEventListener("mouseup",this.b);
             console.log(this.move)
         }
     }

     return Drag;
});