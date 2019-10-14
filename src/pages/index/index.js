import "./index.less"
import main from "../../common/main"
import server from "../../utils/api"

$(function () {
    main.init();
    new WOW().init();

    //切换导航状态
    $($(".nav-list >ul>li")[0]).addClass("nav-active").siblings().removeClass("nav-active");
    $($(".menu >ul>li")[0]).addClass("nav-active").siblings().removeClass("nav-active");
    
    $('.carousel').carousel();
    $('#myCarousel').on('slide.bs.carousel', function () {
        $(".crs-item").each(function (i) {
            var b = $(this).attr("class").indexOf("active");
            if (b != -1) {
                $($("#crsUl li")[i]).show().siblings().hide();
            }
        })
    });
})


var app = new Vue({
    el: '#app',
    data: {
        banner: [],
        videoUrl: "",
        player: null, //西瓜播放器
        recommendList01: [], //优质单品推荐
        recommendList02: [], //优质单品推荐
        exampleList: [], //案例列表
    },
    created() {

        this._getHomeInfo();
    },
    computed: {
    },
    mounted() {
        lazySizes.init();
    },
    methods: {
        //获取首页信息
        _getHomeInfo() {
            server.getHomeInfo().then(res => {
                let { code, data } = res;
                if (code === 200) {
                    // banner
                    this.banner = data.bannerList;
                    console.log(this.banner)
                    // video
                    this.videoUrl = data.videoInfo.url;
                    this.player = new Player({
                        id: 'mse',
                        url: this.videoUrl,
                        videoInit: true,
                        playsinline: true,
                        closeVideoDblclick:false,
                        height: "100%",
                        width: "100%",
                        poster: require('../../assets/images/home/pg-1-1.png')
                    });
                    this.contrlVodeo();
                    // 已推荐的优质单品
                    let dataArr = data.smartDevDbList.reverse();
                    this.recommendList01 = dataArr.slice(0, 3);
                    this.recommendList02 = dataArr.slice(3);
                    // 案例列表
                    this.exampleList = data.exampleList;


                }
            })
        },
        // 视频控制
        contrlVodeo() {
            if (this.videoUrl == "") { return false };
            let _this = this;
            $(document).scroll(() => {
                if (!this.isVisible(".viedeo-box")) {
                    this.player.pause();
                }
            }
            )
        },
        // 判断页面内的元素是否在浏览器的可视区域内
        isVisible(selectid) {
            var o;
            if ('object' === typeof selectid) {
                o = selectid;
            } else {
                o = $(selectid);
            }
            var of = o.offset();
            var w = $(window);
            return !(w.scrollTop() > (of.top + o.outerHeight()) || (w.scrollTop() + w.height()) < of.top);
        }
    }
})