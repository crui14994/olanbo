$(function () {
    //切换导航状态
    $($(".nav-list >ul>li")[4]).addClass("nav-active").siblings().removeClass("nav-active");
    $($(".menu >ul>li")[4]).addClass("nav-active").siblings().removeClass("nav-active");
    main.init();
    $('.carousel').carousel();
    new WOW().init();

    $(".focus").on("click", function () {
        $(this).addClass("blur");
    })
    $(".focus").on("mouseout", function () {
        $(this).removeClass("blur");
    })

    // licenseIMg();

    //点击提交
    // $("#subBtn").on("click", function () {
    //     var uploadFormData = new FormData($('#joinFrom')[0]);
    //     console.log(uploadFormData);
    // })

    // // 营业执照,名片 预览
    // function licenseIMg() {
    //     // 营业执照
    //     var fileInput = $("#fileInput")[0];
    //     var previewImg = $("#fileImg")[0];
    //     fileInput.addEventListener('change', function () {
    //         var file = this.files[0];
    //         var reader = new FileReader();
    //         reader.addEventListener('load', function () {
    //             previewImg.src = reader.result;
    //         }, false);
    //         reader.readAsDataURL(file);
    //     }, false);
    //     // 名片
    //     var fileInput2 = $("#cardInput")[0];
    //     var previewImg2 = $("#cardImg")[0];
    //     fileInput2.addEventListener('change', function () {
    //         var file = this.files[0];
    //         var reader = new FileReader();
    //         reader.addEventListener('load', function () {
    //             previewImg2.src = reader.result;
    //         }, false);
    //         reader.readAsDataURL(file);
    //     }, false);
    // }


});

var app = new Vue({
    el: '#app',
    data: {
        joinFrom: { //表单数据
            name: "",
            tel: "",
            company: "",
            province: null,
            address: "",
            msgInfo: "",
            pic:""
        },
        ruls: {
            nameMsg: "",
            telMsg: "",
            companyMsg: "",
            provinceMsg: "",
            addressMsg: "",
            msgInfoMsg: ""
        },
        province: [
            "北京", "天津", "上海", "重庆", "河北", "山西", "辽宁", "吉林", "黑龙江", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南",
            "湖北", "湖南", "广东", "海南", "四川", "贵州", "云南", "陕西", "甘肃", "青海", "内蒙古", "广西", "西藏", "宁夏", "新疆维吾尔自治区", "香港",
            "澳门", "台湾"
        ]
    },
    computed: {

    },
    created() {

    },
    mounted() {
        lazySizes.init();
    },
    methods: {

        //表单验证提交
        fromVal() {
            this.nameVal(); this.telVal(); this.companyVal(); this.provinceVal(); this.addressVal(); this.msgInfoVal();
            let val = this.nameVal() && this.telVal() && this.companyVal() && this.provinceVal() && this.addressVal() && this.msgInfoVal()
            if (val) { //验证通过
                server.addCoopMsg(this.joinFrom).then(res=>{
                    $('#myModal').modal('show');
                    $('#myModal').on('hidden.bs.modal', function () {
                        window.location.reload();
                    })
                })
            }
        },
        nameVal() {
            if (!this.joinFrom.name) {
                this.ruls.nameMsg = "用户名不能为空！"
                return false;
            } else {
                this.ruls.nameMsg = "";
                return true;
            }
        },
        telVal() {
            let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|)+\d{8})$/;
            if (!this.joinFrom.tel) {
                this.ruls.telMsg = "电话不能为空！";
                return false;
            } else if (!reg.test(this.joinFrom.tel)) {
                this.ruls.telMsg = "请输入11位手机号码!";
                return false;
            } else {
                this.ruls.telMsg = "";
                return true;
            }
        },
        companyVal() {
            if (!this.joinFrom.company) {
                this.ruls.companyMsg = "公司名称不能为空！";
                return false;
            } else {
                this.ruls.companyMsg = "";
                return true;
            }
        },
        provinceVal() {
            if (!this.joinFrom.province) {
                this.ruls.provinceMsg = "省份必须选择！";
                return false;
            } else {
                this.ruls.provinceMsg = "";
                return true;
            }
        },
        addressVal() {
            if (!this.joinFrom.address) {
                this.ruls.addressMsg = "详细地址不能为空！";
                return false;
            } else {
                this.ruls.addressMsg = "";
                return true;
            }
        },
        msgInfoVal() {
            if (!this.joinFrom.msgInfo) {
                this.ruls.msgInfoMsg = "留言内容不能为空！";
                return false;
            } else {
                this.ruls.msgInfoMsg = "";
                return true;
            }
        }

    }
})