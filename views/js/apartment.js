$(function () {
    //切换导航状态
    $($(".nav-list >ul>li")[2]).addClass("nav-active").siblings().removeClass("nav-active");
    $($(".menu >ul>li")[2]).addClass("nav-active").siblings().removeClass("nav-active");
    main.init();
    $('.carousel').carousel();
    new WOW().init();
});

var app = new Vue({
    el: '#app',
    data: {
        p4List:[
            {
                imgUrl:'images/apartment/p4-01.png',
                hoverUrl:"images/apartment/p4-01a.png",
                txt:'智能面板',
                alt:"智能面板"
            },
            {
                imgUrl:'images/apartment/p4-02.png',
                hoverUrl:"images/apartment/p4-02a.png",
                txt:'手机APP',
                alt:"手机APP"
            },
            {
                imgUrl:'images/apartment/p4-03.png',
                hoverUrl:"images/apartment/p4-03a.png",
                txt:'电脑控制平台',
                alt:"电脑控制平台"
            },
            {
                imgUrl:'images/apartment/p4-04.png',
                hoverUrl:"images/apartment/p4-04a.png",
                txt:'微信APP移动端',
                alt:"微信APP移动端"
            },
            {
                imgUrl:'images/apartment/p4-05.png',
                hoverUrl:"images/apartment/p4-05a.png",
                txt:'电脑控制后台',
                alt:"电脑控制后台"
            },
            {
                imgUrl:'images/apartment/p4-06.png',
                hoverUrl:"images/apartment/p4-06.png",
                txt:'智能云',
                alt:"智能云"
            },
            {
                imgUrl:'images/apartment/p4-07.png',
                hoverUrl:"images/apartment/p4-07a.png",
                txt:'智能网关',
                alt:"智能网关"
            },
            {
                imgUrl:'images/apartment/p4-08.png',
                hoverUrl:"images/apartment/p4-08a.png",
                txt:'智能门锁',
                alt:"智能门锁"
            },
            {
                imgUrl:'images/apartment/p4-09.png',
                hoverUrl:"images/apartment/p4-09a.png",
                txt:'智能水电表',
                alt:"智能水电表"
            },
            {
                imgUrl:'images/apartment/p4-10.png',
                hoverUrl:"images/apartment/p4-10a.png",
                txt:'空调/电视等家电',
                alt:"空调/电视等家电"
            },
            {
                imgUrl:'images/apartment/p4-11.png',
                hoverUrl:"images/apartment/p4-11a.png",
                txt:'灯光照明',
                alt:"灯光照明"
            },
            {
                imgUrl:'images/apartment/p4-12.png',
                hoverUrl:"images/apartment/p4-12a.png",
                txt:'窗帘等遮阳设备',
                alt:"窗帘等遮阳设备"
            },
        ]
    },
    created(){
           
    },
    mounted() {
        lazySizes.init();
    },
    methods:{
      
    }
})