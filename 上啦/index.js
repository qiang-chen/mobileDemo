
addEventListener("message",function(e){
    console.log(e.data)
    if(e.data=="请求数据"){
        let arr=[];
        for(let i=0;i<8;i++){
            arr.push(i)
        }

        setTimeout(function(){
            postMessage(arr)
        },Math.random()*4000)
       

    }
})