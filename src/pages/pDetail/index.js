import "./index.less"
import main from "../../common/main"
import server from "../../utils/api"
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
        activeData: "",
        id: null
    },
    created() {
        this.id = main.getUrlParam("id");
        this._getSolutionInfo(this.id);
    },
    mounted() {
        lazySizes.init();
    },
    computed: {
        bannerTitle() {
            return this.activeData.title
        },
        bannerUrl() {
            return require(`@/assets/images/pDetails/id_${this.id}.png`);
        }
    },
    methods: {
        //获取解决方案详情
        _getSolutionInfo(id) {
            server.getSolutionInfo(id).then(res => {
                const { code } = res;
                if (code === 200) {
                    this.activeData = res.data;
                    //设置页面title
                    $("title").html(this.activeData.title + "解决方案详情-欧朗博");
                } else if (code === 300) {
                    this.activeData = "";
                }
            })
        },
    }
})