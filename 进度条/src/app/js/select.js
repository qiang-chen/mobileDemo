define([], function() {
    /**
     * @function[此函数主要是通过改变下拉菜单来改变上方滚动条的样式]
     */
    class Select{
        constructor(){
            this.color=document.querySelector(".color");
            this.bar=document.querySelector(".bar")
            this.select=document.querySelector("select");
            this.ball1=document.querySelector(".ball1");
            this.ball2=document.querySelector(".ball2")
            this.init()
        }
        init(){
            this.change();
        }
        change(){
            this.select.onchange=()=>{
               
                let option=this.select.querySelectorAll("option")[this.select.selectedIndex];
                let optionValue=option.innerHTML;
                if(optionValue=="样式二"){
                    // let barColor=getComputedStyle(this.bar).backgroundColor;
                    // console.log(barColor)
                    // this.color.style.backgroundColor=barColor;
                    // this.bar.style.backgroundColor="yellow";
                    this.bar.classList.add("bg");
                    this.color.classList.add("colorBg");
                    this.ball1.classList.add("active");
                    this.ball2.classList.add("active");
                    window.index.initColor();
                }else if(optionValue=="样式一"){
                    this.bar.classList.remove("bg");
                    this.color.classList.remove("colorBg");
                    this.ball1.classList.remove("active");
                    this.ball2.classList.remove("active");
                }
            }
        }
    }
    return Select;
});