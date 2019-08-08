$(function () {
    //切换导航状态
    $($(".nav-list >ul>li")[1]).addClass("nav-active").siblings().removeClass("nav-active");
    $($(".menu >ul>li")[1]).addClass("nav-active").siblings().removeClass("nav-active");
    main.init();
    $('.carousel').carousel();
    new WOW().init();

    //导航缩略图
    $('#myCarousel').on('slide.bs.carousel', function () {
        $(".crs-item").each(function (i) {
            var b = $(this).attr("class").indexOf("active");
            if (b != -1) {
                $($("#crsUl li")[i]).show().siblings().hide();
            }
        })
    });
});

var app = new Vue({
    el: '#app',
    data: {
        //banner
        // bannerImg: [
        //     {
        //         imgUrl: {
        //             pc: "images/product/banner02.png",
        //             mobile: "images/product/banner02.png"
        //         },
        //         alt: "欧朗博"
        //     },
        //     {
        //         imgUrl: {
        //             pc: "images/product/banner02.png",
        //             mobile: "images/product/banner02.png"
        //         },
        //         alt: "欧朗博"
        //     },
        //     {
        //         imgUrl: {
        //             pc: "images/product/banner02.png",
        //             mobile: "images/product/banner02.png"
        //         },
        //         alt: "欧朗博"
        //     },
        // ],
        // productDetail: {
        //     tit: "新款简约沙发凳",
        //     introduce: "做一个有品质、有气质，受人喜欢、受人尊敬的品牌，这在LifeVC，是最核心的价值观。珍惜品牌声誉，用心为她们设计、生产最优质的产品。珍惜品牌声誉，用心为她们设计、生产最优质的产品。珍惜品牌声誉，用心为她们设计、生产最优质的产品。珍惜品牌声誉，用心为她们设计、生产最优质的产品。",
        //     params: ['颜色：白色 / 黑色', '尺寸：40*60', '价格：￥1666.00'],
        //     funList: [
        //         '1. 室内温度设置的准确性:好的温控器能够准确的调节温度,准确的判断室内温度,主要通过探头来实现的;',
        //         '2. 温控器与电地暖系统的使用:温控器有多种,有机械旋钮型的,有可编程数字液晶型的,不同温控器的使用相差很大。选择温控器时要考虑到使用的方便性;                ',
        //         '3.温控器与房间用途的关系:应注意根据房间的用途来选择温控器,例如:在卫生间中不应采用室温性的温控器;',
        //         '4.温控器与能耗的关系:选择合适的温控器有可以在用户日后的使用过程中,有效的节约能耗。'
        //     ]
        // }
        activeData:"",
        id:null
    },
    created(){
        this.id=main.getUrlParam("id");
        this._getDevList(this.id);
    },
    mounted() {
        lazySizes.init();
    },
    methods:{
        //获取设备列表
        _getDevList(id) {
            server.getItem(id).then(res => {
                const { code } = res;
                if (code === 200) {
                    this.activeData = res.data;
                    //设置页面title
                    $("title").html(this.activeData.devName+"商品详情-在线商城");
                } else if (code === 300) {
                    this.activeData = "";
                }
            })
        },
    }
})