define(['drag','drag1'], function(drag,drag1) {
    'use strict';
    let btn=document.querySelector(".btn");

    let box=document.querySelector(".len");
    let du=document.querySelector(".du");
    let duhtml=du.innerHTML*1;
    let one=document.querySelector(".one");


    // new drag(
    //     {
    //         btn,
    //         fn,
    //         box
    //     });



    new drag1(
        {
            btn,
            fn,
            box
        });

    function fn(l){
        //获取滚动的总长度
        let boxL=box.offsetWidth-btn.offsetWidth;
        //console.log(l)
        let html=parseInt((l/boxL)*360);
        let newHtml=duhtml+html;
        du.innerHTML=newHtml;
        one.style.transform=`rotate(${newHtml}deg)`;
    }
    


});