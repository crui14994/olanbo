import "./index.less"
import main from "../../common/main"
import server from "../../utils/api"

$(function () {
    //切换导航状态
    $($(".nav-list >ul>li")[3]).addClass("nav-active").siblings().removeClass("nav-active");
    $($(".menu >ul>li")[3]).addClass("nav-active").siblings().removeClass("nav-active");
    main.init();
    $('.carousel').carousel();
    new WOW().init();

});

var app = new Vue({
    el: '#app',
    data: {
        banner:{
            pcUrl:require("@/assets/images/caseDetail/c1-banner.png"),
            mobileUrl:require("@/assets/images/caseDetail/c1-banner.png"),
            alt:'智能检测仪',
        }, 
        activeData:"",
        id:null
    },
    created(){
        this.id=main.getUrlParam("id");
        this._getExampleInfo(this.id);
    },
    mounted() {
        lazySizes.init();
    },
    methods:{
        //获取设备列表
        _getExampleInfo(id) {
            server.getExampleInfo(id).then(res => {
                const { code } = res;
                if (code === 200) {
                    this.activeData = res.data;
                     //设置页面title
                     $("title").html(this.activeData.title+"成功案例详情-欧朗博");
                } else if (code === 300) {
                    this.activeData = "";
                }
            })
        },
    }
})