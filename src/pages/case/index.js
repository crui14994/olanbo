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
        pageNum: 1,//当前的页数
        total: 0, //数据总量
        pageSize: 7, //每一页显示的数量
        activeIndex: null, //用于判断鼠标进入移出事件
        transitionName: "",
        isShow: true,
        caseList: null,
        mark: 0
    },
    created() {
        this._getExampleList();
    },
    mounted() {
        lazySizes.init();
    },
    computed: {
        num() {
            let start = ((this.mark) * this.pageSize) + 1;
            let end = (this.mark + 1) * this.pageSize;
            let pageN = Math.ceil(this.total / this.pageSize);
            if (this.mark + 1 == pageN) {
                let n = this.total % this.pageSize;
                if (n != 0) {
                    end = (this.mark) * this.pageSize + n;
                }
            }
            return `${start} - ${end}`;
        }
    },
    methods: {
        leave() {
            this.activeIndex = null;
        },
        enter(index) {
            this.activeIndex = index;
        },
        //获取案列列表
        _getExampleList() {
            let options = {
                pageNum: this.pageNum,
                pageSize: 500
            }
            new Promise((resolve, reject) => {
                server.getExampleList(options).then(res => {
                    const { code, data } = res;
                    if (code === 200) {
                        this.caseList = this.chunk(data.records.reverse(), this.pageSize);
                        this.total = data.total;
                        resolve();
                    }
                })
            }).then(res => {
                setTimeout(() => {
                    $(".ulTest").height($(".ulTest li").height() + "px")
                }, 500)

            })

        },
        nextCase() {
            this.transitionName = "image"
            this.mark++;
            if (this.mark >= Math.ceil(this.total / this.pageSize)) {
                this.mark = 0;
            }
        },
        prevCase() {
            this.transitionName = "image02";
            if (this.mark <= 0) {
                this.mark = Math.ceil(this.total / this.pageSize);
            }

            this.mark--;
        },
        //将一个数组按指定长度分割，组成一个新的数组集合
        chunk(array, size) {
            //获取数组的长度，如果你传入的不是数组，那么获取到的就是undefined
            const length = array.length
            //判断不是数组，或者size没有设置，size小于1，就返回空数组
            if (!length || !size || size < 1) {
                return []
            }
            //核心部分
            let index = 0 //用来表示切割元素的范围start
            let resIndex = 0 //用来递增表示输出数组的下标

            //根据length和size算出输出数组的长度，并且创建它。
            let result = new Array(Math.ceil(length / size))
            //进行循环
            while (index < length) {
                //循环过程中设置result[0]和result[1]的值。该值根据array.slice切割得到。
                result[resIndex++] = array.slice(index, (index += size))
            }
            //输出新数组
            return result
        },
        goToPage(id){
            window.location.href = '/cDetail.html?id='+id;
        },
    }
})