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
        pageNum:1,
        pageSize:1000,
        typeId:null, //当前选择的类型
        tableData: [], //当前 展示的数据
        solutionTypeList:[], //解决方案类型
    },
    created() {
        this._getSolution();
        this._getSolutionType();
    },
    mounted() {
        lazySizes.init();
    },
    methods: {
        //选择类型
        checkType(id){
            this.typeId=id;
            this._getSolution();
        },
        //获取解决方案
        _getSolution() {
            let options = {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                typeId:this.typeId,
            };
            server.getSolution(options).then(res => {
                let { code } = res;
                if (code == 200) {
                    let { records } = res.data;
                    this.tableData = records.reverse();
                } else if (code == 300) {
                    this.tableData = [];
                }
            });
        },
        //获取解决方案类型列表
        _getSolutionType(){
            server.getSolutionType().then(res=>{
                let { code } = res;
                if (code == 200) {
                    this.solutionTypeList = res.data;
                } else if (code == 300) {
                    this.solutionTypeList = [];
                }
            })
        }
    }
})