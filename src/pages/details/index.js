import "./index.less"
import main from "../../common/main"
import server from "../../utils/api"

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