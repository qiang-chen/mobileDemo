define(['jquery'], function($) {
    'use strict';
    class Drag{
        constructor(opt){
            this.btn=opt.btn;
            this.fn=opt.fn;
            this.box=opt.box;
            this.init();
        }
        init(){
            this.Event();
        }
        Event(){
            $(this.btn).on("mousedown",(ev)=>{
                let e=ev||window.event;
                this.btn.l=e.clientX-this.btn.offsetLeft;
                $(document).on("mousemove",this.move.bind(this));
                $(document).on("mouseup",this.up.bind(this));
            })
        }
        move(ev){
            //console.log(this.btn)
            let e=ev||window.event;
            let x=e.clientX-this.btn.l;
            x=x<=0?0:e.clientX-this.btn.l;
            if(x>=this.box.offsetWidth-this.btn.offsetWidth){
                x=this.box.offsetWidth-this.btn.offsetWidth;
            }
            this.btn.style.left=x+"px";
            this.fn(x)
        }
        up(){
            $(document).off("mousemove");
            $(document).off("mouseup");
        }
    }
    return Drag;
});