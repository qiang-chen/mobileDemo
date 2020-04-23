class Home{
    constructor(){
        if(localStorage.getItem("home")){
            this.arr=JSON.parse(localStorage.getItem("home"))
        }else{
            this.arr=[];
        }
        this.btn = document.querySelector("button");
        this.user = document.querySelector(".user");
        this.pwd = document.querySelector(".pwd");
        this.init();
    }
    init(){
        this.event();
    }
    event(){
        this.btn.onclick = () => {
            let userValue = this.user.value;
            let pwdValue = this.pwd.value;
            if (userValue && pwdValue) {
                for(let i=0;i<this.arr.length;i++){
                    if (this.arr[i].userValue == userValue) {
                        alert("登录成功");
                        return;
                    }
                }
               console.log(11)
                location.href=`login.html`
            }
        }
    }
}