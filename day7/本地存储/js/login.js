class Login {
    constructor() {
        this.btn = document.querySelector("button");
        this.user = document.querySelector(".user");
        this.pwd = document.querySelector(".pwd");
        if (localStorage.getItem("home")) {
            this.arr = JSON.parse(localStorage.getItem("home"));
        } else {
            this.arr = [];
        }
        this.init();
    }
    init() {
        this.event();
    }
    event() {
        //点击注册按钮的时候获取文本框的值
        this.btn.onclick = () => {
            let userValue = this.user.value;
            let pwdValue = this.pwd.value;
            if (userValue && pwdValue) {
                console.log(this.arr);
                for(let i=0;i<this.arr.length;i++){
                    if (this.arr[i].userValue == userValue) {
                        alert("该用户已经被注册");
                        return;
                    }
                }
                this.arr.push({
                    userValue,
                    pwdValue
                });
                localStorage.setItem("home", JSON.stringify(this.arr));
                location.href=`home.html`
            }
        }
    }
}