
//在分线程中接受主线程的命令

addEventListener("message",function(e){
    console.log(e.data);
    console.log(this,"分线程中的this指向")
    let data=[];
    if(e.data=="请求数据"){
        for(let i=0;i<10;i++){
            //我们随机创造10个数发送给主线程
            data.push(parseInt(Math.random()*1000))
        }
    }

    setTimeout(()=>{
        //发送数据
        postMessage(data)
      //随机时间发送过去  
    },Math.random()*4000)
})