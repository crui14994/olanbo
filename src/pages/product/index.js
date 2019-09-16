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
        // active: 0, //当前导航的序列
        nowPage: 1,//当前显示的页码
        pageNum: 6,//每一页要显示的数量
        total: 0, //总共有多少条数据
        SysType: [], //设备类型数组
        sysTypeId: null, //选中的设备类型
        activeData: null, //当前 展示的数据
        nextData: null //预加载的下一页数据
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
        //获取下一页设备列表
        _getNextDevList(){
            let options = {
                pageNum: this.nowPage+1,
                pageSize: this.pageNum,
                sysTypeId: this.sysTypeId
            };
            server.getDevList(options).then(res => {
                const { code } = res;
                if (code === 200) {
                    this.nextData = res.data.records;
                } else if (code === 300) {
                    this.nextData = null;
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
            server.getDevList(options).then(res => {
                const { code } = res;
                if (code === 200) {
                    this.activeData = res.data.records;
                    this.total = res.data.total;
                    // 获取下一页设备列表
                    this._getNextDevList();
                } else if (code === 300) {
                    this.activeData = [];
                    this.total = 0;
                }
            })
        },
        //选择分类
        checkSysType(id) {
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
                if (this.nextData != null) {
                    this.activeData = this.nextData;
                    this._getNextDevList();
                }

            }
        },
        prevPage() {
            if (this.nowPage > 1) {
                this.nowPage--;
                this._getDevList();
            }
        }
    }
})