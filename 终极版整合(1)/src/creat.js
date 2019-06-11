//创造分线程
addEventListener("message",function(e){
    if(e.data=="请求数据"){
        //这里创造一个数据
        let arr=[
            {
                "price":15,
                "xiaoliang":102,
                "juli":30
            },{
                "price":45,
                "xiaoliang":152,
                "juli":50
            },{
                "price":15,
                "xiaoliang":102,
                "juli":50
            },{
                "price":5,
                "xiaoliang":12,
                "juli":80
            },{
                "price":95,
                "xiaoliang":182,
                "juli":80
            },{
                "price":95,
                "xiaoliang":82,
                "juli":380
            },{
                "price":75,
                "xiaoliang":532,
                "juli":302
            },{
                "price":159,
                "xiaoliang":132,
                "juli":35
            }
        ]

        setTimeout(function(){
            //想主线程发送数据

            postMessage(arr)


        },Math.random()*4000)
    }
})