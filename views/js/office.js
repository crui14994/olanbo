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
                imgUrl:'images/office/p4-01.png',
                hoverUrl:"images/office/p4-01a.png",
                txt:'电脑控制平台',
                alt:"电脑控制平台"
            },
            {
                imgUrl:'images/office/p4-02.png',
                hoverUrl:"images/office/p4-02a.png",
                txt:'手机APP',
                alt:"手机APP"
            },
            {
                imgUrl:'images/office/p4-03.png',
                hoverUrl:"images/office/p4-03a.png",
                txt:'智能面板',
                alt:"智能面板"
            },
            {
                imgUrl:'images/apartment/p4-06.png',
                hoverUrl:"images/apartment/p4-06.png",
                txt:'智能云',
                alt:"智能云"
            },
            {
                imgUrl:'images/office/p4-05.png',
                hoverUrl:"images/office/p4-05a.png",
                txt:'ZigBee网关',
                alt:"ZigBee网关"
            },
            {
                imgUrl:'images/office/p4-06.png',
                hoverUrl:"images/office/p4-06a.png",
                txt:'Wi-Fi',
                alt:"Wi-Fi"
            },
            {
                imgUrl:'',
                hoverUrl:"",
                txt:'照明系统<br>智能化管控',
                alt:""
            },
            {
                imgUrl:'',
                hoverUrl:"",
                txt:'空调和环境<br>系统智能化',
                alt:""
            },
            {
                imgUrl:'',
                hoverUrl:"",
                txt:'门窗&遮阳<br>智能化管控',
                alt:""
            }
            ,
            {
                imgUrl:'',
                hoverUrl:"",
                txt:'低成本<br>能源监控',
                alt:""
            }
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