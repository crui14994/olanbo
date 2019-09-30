import server from "../utils/api"

//必须放在lazysizes.js加载前，设置lazysizes不自动执行，等数据加载后执行lazySizes.init();
window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.init = false;

//引入懒加载
import 'lazysizes';

import { loadingEvent } from "../utils/index";

//值为是否显示加载动画
loadingEvent(false);

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
                menu.animate({ left: "0%" }, 200, function () {
                    //禁止页面滚动
                    $('body').css({ 'position': 'fixed', "width": "100%" });
                });
                n = 1;

            } else {
                containerBox.animate({ left: "0%" }, 200);
                headerNav.animate({ left: "0%" }, 200);
                menu.animate({ left: "-80%" }, 200, function () {
                    //开启页面滚动
                    $("body").css({ "position": "initial", "height": "auto" });                  
                });
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
        $('#userTel').bind('input propertychange', function () { utelCheck() });
        $('#userEmail').bind('input propertychange', function () { uemailCheck() });

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

let main = new Main();

export default main;