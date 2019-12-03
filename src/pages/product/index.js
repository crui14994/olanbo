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



});

var app = new Vue({
    el: '#app',
    data: {
        nowPage: 1,//当前显示的页码
        pageNum: 6,//每一页要显示的数量
        total: 0, //总共有多少条数据
        SysType: [], //设备类型数组
        sysTypeId: null, //选中的设备类型
        activeData: null, //当前 展示的数据
        cacheData: {}, //缓存的数据
        scrollTop: 0, //页面顶部到page03的距离
        svgIsShow: false
    },
    created() {
        this._getSysType();
        this._getDevList();

    },
    mounted() {
        lazySizes.init();
        this.scrollTop = $(".breadcrumb").offset().top;
    },
    computed: {
        totalPage() { //总共要分的页数
            return Math.ceil(this.total / this.pageNum);
        },
        //判断当前页是否要显示
        pagingShow(index) {
            return function (index) {
                /*
                默认第一页后最后一页显示
                中间只显示三页
                左右多出的页数以...显示
                */

                //在页面显示页面的个数(显示个数为奇数)
                let showNum = 5;
                //左右俩边的个数
                let around = parseInt(showNum / 2);
                //隐藏第一页和最后一页，在html中单独列出
                if(index == 1 || index == this.totalPage){
                    return false;
                }

                if (this.nowPage + around > index && index > this.nowPage - around) {
                    return true
                } else {
                    if (this.nowPage < showNum - 1 && index < showNum) {
                        return true;
                    }
                    else if (this.totalPage - index < showNum - 1 && this.nowPage > this.totalPage - (around + 1)) {
                        return true;
                    }
                    return false;
                }

            }
        }
    },
    methods: {
        //获取设备类型列表
        _getSysType() {

            const STATUS_NUM = {
                normal: 0, //正常
                del: 1, //正常
                disable: 2, //正常
            }
            let options = {
                status: STATUS_NUM.normal
            }
            server.getSysType(options).then(res => {
                const { code } = res;
                if (code === 200) {
                    this.SysType = res.data;
                }
            })
        },
        //获取下一页设备列表缓存进入数据中
        _getNextDevList() {
            let options = {
                pageNum: this.nowPage + 1,
                pageSize: this.pageNum,
                sysTypeId: this.sysTypeId
            };
            server.getDevList(options).then(res => {
                const { code } = res;
                if (code === 200) {
                    this._cacheData(options.pageNum, res.data.records)
                }
            })
        },
        //获取设备列表
        _getDevList() {

            this.svgIsShow = true;

            let options = {
                pageNum: this.nowPage,
                pageSize: this.pageNum,
                sysTypeId: this.sysTypeId
            };
            //如果缓存数据中有当前页的数据就从缓存数据中获取，否则去请求数据
            if (this.cacheData[this.nowPage] !== undefined) {

                this.svgIsShow = false;

                this.activeData = this.cacheData[this.nowPage];

                return;
            }
            server.getDevList(options).then(res => {
                const { code } = res;
                if (code === 200) {
                    this.activeData = res.data.records;
                    //缓存当前页的数据
                    this._cacheData(this.nowPage, this.activeData);
                    this.total = res.data.total;
                    //获取下一页数据进行缓存
                    this._getNextDevList();
                } else if (code === 300) {
                    this.activeData = [];
                    this.total = 0;
                }

                this.svgIsShow = false;
            })
        },
        //选择分类
        checkSysType(id) {
            //清空缓存数据
            this.cacheData = {};
            this.nowPage = 1;
            this.sysTypeId = id;
            this._getDevList();
        },
        goToPage(pageN) {
            this.nowPage = pageN;
            this._getDevList();
        },
        nextPage() {
            if (this.nowPage < this.totalPage) {
                this.nowPage++;
                this._getDevList();
                this.scrollTo();
            }
        },
        prevPage() {
            if (this.nowPage > 1) {
                this.nowPage--;
                this._getDevList();
                this.scrollTo();
            }
        },
        // 缓存数据
        _cacheData(num, datas) {
            this.cacheData[num] = datas;
        },
        scrollTo() {
            let _this = this;
            $("html,body").animate({
                scrollTop: _this.scrollTop + "px"
            }, 300);
        }
    }
})