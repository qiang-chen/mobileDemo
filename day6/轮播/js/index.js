class Container{
    constructor(){
        this.oli=document.querySelectorAll("ul li");
        this.ball=document.querySelectorAll("a");
        this.box=document.querySelector(".container");
        this.timer=null;
        this.count=0;
        this.init()
    }
    init(){
        this.autoplay();
        this.click();
        this.mouse()
    }
    autoplay(){
        this.timer=setInterval(()=>{
            this.count++;
            if(this.count==this.oli.length){
                this.count=0;
            }
            this.change(this.count);
        },2000)
    }
    change(index){
        this.oli.forEach((item,i)=>{
            item.style.opacity=0;
           
            this.ball[i].classList.remove("active");
           
           
        });
    
         this.oli[index].style.opacity=1;
       
        this.ball[index].classList.add("active")
    }
    click(){
        //小圆点的点击事件
        this.ball.forEach((item,index)=>{
            item.onclick=()=>{
                this.count=index
                this.change(index)
            }
        })
    }
    mouse(){
        //鼠标移入停止定时器 离开继续
        this.box.onmouseover=()=>{
            clearInterval(this.timer)
        }
        this.box.onmouseout=()=>{
            this.autoplay()
        }
    }
}