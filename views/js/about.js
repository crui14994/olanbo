$(function () {
    //切换导航状态
    $($(".nav-list >ul>li")[5]).addClass("nav-active").siblings().removeClass("nav-active");
    $($(".menu >ul>li")[5]).addClass("nav-active").siblings().removeClass("nav-active");
    main.init();
    $('.carousel').carousel();
    new WOW().init();

});

var app = new Vue({
    el: '#app',
    data: {

    },
    mounted() {
        lazySizes.init();
    },
})