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
        banner:{
            typeId01:[
                {
                    pcImg:require("@/assets/images/hotel/banner@2x.png"),
                    mobileImg:require("@/assets/images/hotel/banner@2x.png"),
                    title:"智能家居解决方案",
                    desc:``
                }
            ],
            typeId02:[
                {
                    pcImg:require("@/assets/images/hotel/banner@2x.png"),
                    mobileImg:require("@/assets/images/hotel/banner@2x.png"),
                    title:"智慧城市",
                    desc:` 以“效率、舒适和节能”为导向，通过整合酒店的照明系统、遮阳系统、影音系统、环境系统<br>
                    实现系统设备的智能互联和全闭环的智能服务和管理`
                }
            ],
            typeId03:[
                {
                    pcImg:require("@/assets/images/hotel/banner@2x.png"),
                    mobileImg:require("@/assets/images/hotel/banner@2x.png"),
                    title:"智慧酒店系统",
                    desc:` 以“效率、舒适和节能”为导向，通过整合酒店的照明系统、遮阳系统、影音系统、环境系统<br>
                    实现系统设备的智能互联和全闭环的智能服务和管理`
                }
            ],
        }, 
        activeData:"",
        typeId:null,
        id:null
    },
    created(){
        this.id=main.getUrlParam("id");
        this._getSolutionInfo(this.id);
    },
    mounted() {
        lazySizes.init();
    },
    computed:{
        bannerActive(){
            return this.banner["typeId0"+this.typeId];
        },
        bannerTitle(){
            return this.activeData.title
        }
    },
    methods:{
        //获取解决方案详情
        _getSolutionInfo(id) {
            server.getSolutionInfo(id).then(res => {
                const { code } = res;
                if (code === 200) {
                    this.activeData = res.data;
                    this.typeId = res.data.typeId;
                     //设置页面title
                     $("title").html(this.activeData.title+"解决方案详情-欧朗博");
                } else if (code === 300) {
                    this.activeData = "";
                    this.typeId = null;
                }
            })
        },
    }
})