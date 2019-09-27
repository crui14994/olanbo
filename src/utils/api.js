// api
// const BASE_URL = "http://47.105.45.120:8888";
const BASE_URL = "http://api.olanboa.com";

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

let server = new Servers(BASE_URL);

export default server;