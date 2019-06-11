define([], function () {
    'use strict';

    class Dialog {
        constructor(opt) {
            this.title=opt.title;
            this.content=opt.content;
            this.cancelValue=opt.cancelValue;
            this.okValue=opt.okValue;
            this.okCallback=opt.okCallback;
            this.cancelCallback=opt.cancelCallback;
            this.box=opt.box;
            this.init();
        }
        init() {
            this.render();
        }
        render() {
            let str = `<div class="alert">
            <div class="alert-title">
                <h1>${this.title}</h1>
            </div>
            <div class="alert-content">
            ${this.content}
            </div>
            <div class="alert-bnt">
                <span class="remove">${this.cancelValue}</span>
                <span class="ok">${this.okValue}</span>
            </div>
        </div>`;
            this.box.innerHTML=str;
            this.event()
        }
        event() {
            let alert=document.querySelector(".alert");
            alert.style.animationPlayState="running";
            let ok=document.querySelector(".ok");
            let remove=document.querySelector(".remove");
            ok.onclick=()=>{
                this.okCallback();
                this.close()
            }
            remove.onclick=()=>{
                this.cancelCallback();
                this.close()
            }
        }
        close(){
            let alert=document.querySelector(".alert");
            this.box.removeChild(alert)
        }
    }
   

    return Dialog;
});