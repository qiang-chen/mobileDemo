define(['swiper'], function(swiper) {
    /**
     * @function[此函数是写swiper轮播]
     */
    
     class MySwiper{
        constructor(el){
            this.init(el);
        }
        init(el){
            let Swiper=new swiper(el,{
                autoplay:true,
                loop:true
            })
        }
     }
     return MySwiper
});