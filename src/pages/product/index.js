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
        cacheData:{}, //缓存的数据
    },
    created() {
        this._getSysType();
        this._getDevList();

    },
    mounted() {
        lazySizes.init();
    },
    computed: {
        totalPage() { //总共要分的页数
            return Math.ceil(this.total / this.pageNum);
        }
    },
    methods: {
        //获取设备类型列表
        _getSysType() {
            server.getSysType().then(res => {
                const { code } = res;
                if (code === 200) {
                    this.SysType = res.data;
                }
            })
        },
        //获取下一页设备列表缓存进入数据中
        _getNextDevList(){
            let options = {
                pageNum: this.nowPage+1,
                pageSize: this.pageNum,
                sysTypeId: this.sysTypeId
            };
            server.getDevList(options).then(res => {
                const { code } = res;
                if (code === 200) {
                    this._cacheData(options.pageNum,res.data.records)
                }
            })
        },
        //获取设备列表
        _getDevList() {
            let options = {
                pageNum: this.nowPage,
                pageSize: this.pageNum,
                sysTypeId: this.sysTypeId
            };
            //如果缓存数据中有当前页的数据就从缓存数据中获取，否则去请求数据
            if(this.cacheData[this.nowPage] !== undefined){
                this.activeData = this.cacheData[this.nowPage];
                return;
            }
            server.getDevList(options).then(res => {
                const { code } = res;
                if (code === 200) {
                    this.activeData = res.data.records;
                    //缓存当前页的数据
                    this._cacheData(this.nowPage,this.activeData);
                    this.total = res.data.total;
                    //获取下一页数据进行缓存
                    this._getNextDevList();
                } else if (code === 300) {
                    this.activeData = [];
                    this.total = 0;
                }
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
        _cacheData(num,datas){
            this.cacheData[num] = datas;
        },
        scrollTo(){
            $("html,body").animate({
                scrollTop: "0px"
            }, 300);
        }
    }
})