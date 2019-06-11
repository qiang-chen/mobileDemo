define([], function() {
    /**
     * @function[此函数写各种显示隐藏]
     */
    class Show{
        constructor(){
            this.left1=document.querySelectorAll(".left1");
            this.seven=document.querySelector(".seven");
            this.five=document.querySelector(".five");
            this.init()
        }
        init(){
            this.show()
        }
        show(){
            this.left1.forEach(item=>{
                item.onclick=()=>{
                    if(getComputedStyle(item.children[1]).display=="none"){
                        item.children[1].style.display="block"
                    }else{
                        item.children[1].style.display="none"
                    }
                    
                }
            });
            this.seven.onclick=function(){
                if(getComputedStyle(this.children[1]).display=="none"){
                    this.children[1].style.display="block"
                }else{
                    this.children[1].style.display="none"
                }
            }
            this.five.onclick=function(){
                if(getComputedStyle(this.children[1]).display=="none"){
                    this.children[1].style.display="block"
                }else{
                    this.children[1].style.display="none"
                }
            }
        }
    }

    return Show;
});