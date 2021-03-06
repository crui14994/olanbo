//必须放在lazysizes.js加载前，设置lazysizes不自动执行，等数据加载后执行lazySizes.init();
window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.init = false;

//是否显示加载动画
let isLoading = true;
//loading加载动画
$(document).ajaxSend(function (event, xhr) {
    xhr.setRequestHeader("devType", "web");
}).ajaxStart(function (event, xhr) {
    if (isLoading) {
        let str = `
        <div id="loadingBox" tabindex="-1">
            <div class="loading">
                <div class="pswp__preloader__icn">
                    <div class="pswp__preloader__cut">
                        <div class="pswp__preloader__donut"></div>
                    </div>
                </div>
                <p class="loading-text">正在加载...</p>
            </div>
        </div>
        `;
        $('body *:first').before(str);
        //禁止页面滚动
        $('body').css({ 'position': 'fixed', "width": "100%" });
    }

}).ajaxStop(function () {
    $('#loadingBox').remove();
    //开启页面滚动
    $("body").css({ "position": "initial", "height": "auto" });
})



// api
// const BASE_URL = "http://127.0.0.1:1010";
// const BASE_URL = "http://192.168.101.110:8888";
const BASE_URL = "http://doc.52pkmir.cn";

class Main {
    constructor() {
    }
    init() {
        this.navToggle();
        this.floatBox();
        this.addMNsg();
    }
    //导航事件
    navToggle() {
        var menu = $(".menu");
        var containerBox = $(".container-box");
        var headerNav = $(".headerNav");
        var n = 0; //0为未激活 1为激活状态
        $("#rectangle").on("click", function () {
            $(this).toggleClass("icon-close");
            if (n == 0) {
                containerBox.animate({ left: "80%" }, 200);
                headerNav.animate({ left: "80%" }, 200);
                menu.animate({ left: "0%" }, 200);
                n = 1;
            } else {
                containerBox.animate({ left: "0%" }, 200);
                headerNav.animate({ left: "0%" }, 200);
                menu.animate({ left: "-80%" }, 200);
                n = 0;
            }
        })
    }
    //右下角事件
    floatBox() {
        var floatMessage = $(".float-message");
        var closeBtn = $("#closeBtn");
        var contact = $("#contact");
        var scrollTop = $("#scrollTop");

        closeBtn.on("click", function () {
            floatMessage.hide();
        })
        contact.on("mouseenter", function () {
            floatMessage.show();
        })
        contact.on("mouseleave", function () {
            floatMessage.hide();
        })
        scrollTop.on("click", function () {
            $("html,body").animate({
                scrollTop: "0px"
            }, 800);
        })
    }
    //跳转页面
    goTo(str) {
        window.location.href = str;
    }
    //执行留言提交
    addMNsg() {
        let helpMsg = $(".help-msg");
        $('#userName').change(unameCheck);
        // $('#userEmail').change(uemailCheck);
        // $('#userTel').change(utelCheck);
        $('#content').change(contentCheck);
        $('#userTel').bind('input propertychange', function() {   utelCheck()  }); 
        $('#userEmail').bind('input propertychange', function() {   uemailCheck()  }); 

        //点击提交表单
        $("#addMsg").on("click", function () {
            let val = unameCheck() && uemailCheck() && utelCheck() && contentCheck;
            if (val) {
                let options = {
                    name: $.trim($('#userName').val()),
                    email: $.trim($('#userEmail').val()),
                    tel: $.trim($('#userTel').val()),
                    content: $.trim($('#content').val())
                }
                server.submitMsg(options).then(res => {
                    $('#myModal').modal('show');
                    $('#myModal').on('hidden.bs.modal', function () {
                        $('#userName').val(null);
                        $('#userEmail').val(null);
                        $('#userTel').val(null);
                        $('#content').val(null)
                    })
                })
            }
        })
        //验证姓名
        function unameCheck() {
            var uname = $.trim($('#userName').val());
            if (!uname) {//当用户名为空的时候
                helpMsg.text('* 姓名不能为空');
                return false;
            } else {
                helpMsg.text('');
                return true;
            }
        }
        //验证邮箱
        function uemailCheck() {
            let uEmail = $.trim($('#userEmail').val());
            let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");

            if (!uEmail) {//当用户名为空的时候
                helpMsg.text('* 邮箱不能为空');
                return false;
            } else if (!reg.test(uEmail)) { //正则验证不通过，格式不对
                helpMsg.text("* 请输入正确的邮箱!");
                return false;
            } else {
                helpMsg.text('');
                return true;
            }
        }
        //验证电话
        function utelCheck() {
            let userTel = $.trim($('#userTel').val());
            let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|)+\d{8})$/;
            if (!userTel) {//当用户名为空的时候
                helpMsg.text('* 电话不能为空');
                return false;
            } else if (!reg.test(userTel)) { //正则验证不通过，格式不对
                helpMsg.text("* 请输入11位手机号码!");
                return false;
            } else {
                helpMsg.text('');
                return true;
            }
        }
        //验证内容
        function contentCheck() {
            var content = $.trim($('#content').val());
            if (!content) {
                helpMsg.text('* 内容不能为空');
                return false;
            } else {
                helpMsg.text('');
                return true;
            }
        }

    }
    //获取url参数
    getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    }
}


class Servers {
    constructor(BASE_URL) {
        this.url = BASE_URL;
    }
    //获取首页信息
    getHomeInfo() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: this.url + "/smartHome/getHomeInfo",
                type: "GET",
                dataType: "json",
                success: res => {
                    resolve(res)
                }
            })
        })
    }
    //获取设备类型列表
    getSysType() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: this.url + "/smart/sysType/list",
                type: "GET",
                dataType: "json",
                success: res => {
                    resolve(res)
                }
            })
        })
    }
    //获取设备列表
    getDevList(options) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: this.url + "/web/devs/smartList",
                type: "GET",
                data: options,
                dataType: "json",
                success: res => {
                    resolve(res);
                }
            })
        })
    }
    //获取设备详情
    getItem(id) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: this.url + "/web/devs/getItem",
                type: "GET",
                data: { id },
                dataType: "json",
                success: res => {
                    resolve(res);
                }
            })
        })
    }
    //获取案例列表
    getExampleList(options) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: this.url + "/web/examples/getList",
                type: "GET",
                data: options,
                dataType: "json",
                success: res => {
                    resolve(res);
                }
            })
        })
    }
    // 获取案例详情
    getExampleInfo(id) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: this.url + "/web/examples/getItemInfo",
                type: "GET",
                data: { id },
                dataType: "json",
                success: res => {
                    resolve(res);
                }
            })
        })
    }
    //获取解决方案
    getSolution(options) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: this.url + "/web/solution/getList",
                type: "GET",
                data: options,
                dataType: "json",
                success: res => {
                    resolve(res);
                }
            })
        })
    }
    // 获取解决方案类型列表
    getSolutionType() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: this.url + "/web/solutiontype/getList",
                type: "GET",
                dataType: "json",
                success: res => {
                    resolve(res);
                }
            })
        })
    }
    // 获取解决方案详情
    getSolutionInfo(id) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: this.url + "/web/solution/getItem",
                type: "GET",
                data: { id },
                dataType: "json",
                success: res => {
                    resolve(res);
                }
            })
        })
    }
    // 提交申请信息
    addCoopMsg(options) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: this.url + "/coopMsg/addMsg",
                contentType: "application/json;",
                dataType: "json",
                data: JSON.stringify(options),
                success: res => {
                    resolve(res);
                }
            })
        })
    }
    //留言提交
    submitMsg(options) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: this.url + "/webMsg/addMsg",
                contentType: "application/json;",
                dataType: "json",
                data: JSON.stringify(options),
                success: res => {
                    resolve(res)
                }
            })
        })
    }
}

let main = new Main();
let server = new Servers(BASE_URL)
