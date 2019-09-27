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
        caseN:0,//当前显示案例的序列号
        leftImg:[
            {
                imgUrl:require("@/assets/images/case/p1-lg.png"),
                alt:"成功案例"
            },
            {
                imgUrl:require("@/assets/images/case/p1-lg.png"),
                alt:"成功案例"
            },
            {
                imgUrl:require("@/assets/images/case/p1-lg.png"),
                alt:"成功案例"
            },
            {
                imgUrl:require("@/assets/images/case/p1-lg.png"),
                alt:"成功案例"
            },
            {
                imgUrl:require("@/assets/images/case/p1-lg.png"),
                alt:"成功案例"
            },
            {
                imgUrl:require("@/assets/images/case/p1-lg.png"),
                alt:"成功案例"
            },
        ],
        rightImg:[
            {
                imgUrl:require("@/assets/images/case/p1.png"),
                alt:"成功案例",
                tit:"智能声控龙头",
                txt:"抽拉厨房龙头AEO2B1202"
            },
            {
                imgUrl:require("@/assets/images/case/p2.png"),
                alt:"成功案例",
                tit:"智能声控龙头",
                txt:"抽拉厨房龙头AEO2B1202"
            },
            {
                imgUrl:require("@/assets/images/case/p3.png"),
                alt:"成功案例",
                tit:"智能声控龙头",
                txt:"抽拉厨房龙头AEO2B1202"
            },
            {
                imgUrl:require("@/assets/images/case/p4.png"),
                alt:"成功案例",
                tit:"智能声控龙头",
                txt:"抽拉厨房龙头AEO2B1202"
            },
            {
                imgUrl:require("@/assets/images/case/p5.png"),
                alt:"成功案例",
                tit:"智能声控龙头",
                txt:"抽拉厨房龙头AEO2B1202"
            },
            {
                imgUrl:require("@/assets/images/case/p6.png"),
                alt:"成功案例",
                tit:"智能声控龙头",
                txt:"抽拉厨房龙头AEO2B1202"
            },
        ]
    },
    created(){
           
    },
    mounted() {
        lazySizes.init();
    },
    methods:{
        nextCase(){
            this.caseN++;
            if(this.rightImg.length<=this.caseN){
                this.caseN=0;
            }
        },
        prevCase(){
            this.caseN--;
            if(this.caseN<0){
                this.caseN=this.rightImg.length-1;
            }
        }
    }
})