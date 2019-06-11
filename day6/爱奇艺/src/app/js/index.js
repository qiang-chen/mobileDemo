define(['mySwiper','Icon'], function(mySwiper,Icon) {
    'use strict';
    new Icon({
        el:'.list-icon',
    });
    new mySwiper({
        el: '.banner'
    })
});