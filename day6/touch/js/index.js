(function (window) {
    const jQuery = function (select) {
        return jQuery.prototype.init(select)
    }
    jQuery.prototype = {
        constructor: jQuery,
        init(select) {
            if (typeof select == "string") {
                //如果传入的东西是字符串的话 就获取这个元素
                this.box = document.querySelector(select);
                return this;
            }
        },
        tap(callBack) {
            //封装一个短按事件
            this.box.addEventListener("touchstart", Touch);
            this.box.addEventListener("touchend", Touch);
            let startTime = 0;

            function Touch(e) {
                if (e.type == "touchstart") {
                    //如果这个事件是按下事件的话执行记录下按下的时间
                    startTime = e.timeStamp;

                } else if (e.type == "touchend") {
                    //如果是抬起的话让抬起的时间减去按下的时间和500相比 如果小于的话就让其执行短按的回调函数
                    let time = e.timeStamp - startTime;

                    if (time < 500) {
                        callBack.call(this)
                    }
                }
                //console.log(e.timeStamp)
            }
        },
        long(callBack) {
            //封装一个长按事件
            this.box.addEventListener("touchstart", Touch);
            this.box.addEventListener("touchmove", Touch);
            this.box.addEventListener("touchend", Touch);
            //声明一个延时定时器来判断按下的时间是多久
            let timer = null;

            function Touch(e) {
                switch (e.type) {
                    case "touchstart":
                        timer = setTimeout(function () {
                            //如果按下后时间得到了500毫秒调用这个回调函数
                            callBack.call(this);
                        }, 500)
                        break;
                    case "touchmove":
                        //在移动的时候把其清除掉
                        clearTimeout(timer)
                        break;
                    case "touchend":
                        //在抬起的时候把他清除掉
                        clearTimeout(timer)
                        break;
                    default:
                        break;
                }
            }
        },
        move(callBack) {
            //封装一个手指移动事件
            this.box.addEventListener("touchstart", Touch);
            this.box.addEventListener("touchmove", Touch);
            this.box.addEventListener("touchend", Touch);
            let startLocationX, startLocationY, endLocationX, endLocationY;
            function Touch(e) {
                
                switch (e.type) {
                    case "touchstart":
                        startLocationX =e.touches[0].clientX;
                        startLocationY = e.touches[0].clientY;
                        break;
                    case "touchmove":
                        endLocationX = e.touches[0].clientX;
                        endLocationY = e.touches[0].clientY;
                        break;
                    case "touchend":
                        //再按下和移动的分别赋值位置后再离开的判断滑动的方向
                        if (Math.abs(endLocationY - startLocationY) < 20) {
                            //判断左滑右滑的时候不能让Y轴方向偏移太大
                            if (endLocationX - startLocationX > 20) {
                                    callBack.call(this,"right");
                            } else {
                                callBack.call(this,"left");
                            }
                        }
                        if (Math.abs(endLocationX - startLocationX) < 20) {
                            //如果在X轴方向没有偏移的话 判断Y轴的滑动方向
                            if (endLocationY - startLocationY < 20) {
                                callBack.call(this,"top");
                            } else {
                                callBack.call(this,"bottom");
                            }
                        }
                        break;

                }
            }
        }
    }
    window.$ = window.jQuery = jQuery;
})(window)