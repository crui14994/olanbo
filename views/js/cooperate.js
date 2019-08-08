$(function () {
    //切换导航状态
    $($(".nav-list >ul>li")[4]).addClass("nav-active").siblings().removeClass("nav-active");
    $($(".menu >ul>li")[4]).addClass("nav-active").siblings().removeClass("nav-active");
    main.init();
    $('.carousel').carousel();
    new WOW().init();

   
   
});

var app = new Vue({
    el: '#app',
    data: {

    },
    created(){
           
    },
    mounted() {
        lazySizes.init();
    },
    methods:{

    }
})