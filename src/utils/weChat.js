const WeChatConfig = {
	url: "https://api.olanboa.com/wxJsSign/signData",
	appId: "wx349f5d70ee90b572"
}

class weChat {
	constructor() {
	}
	share(obj) {
		// 请求签名
		$.ajax({
			url: WeChatConfig.url,
			type: 'get',
			data: {
				url: location.href.split('#')[0]
			},
			success: function (reslove) {
				const res = JSON.parse(reslove)
				if (res.code == 200) {
					let data = JSON.parse(res.data)
					wx.config({
						debug: false,
						appId: WeChatConfig.appId,
						timestamp: data.timestamp,
						nonceStr: data.nonceStr,
						signature: data.signature,
						jsApiList: [
							'checkJsApi',
							'onMenuShareTimeline',
							'onMenuShareAppMessage',
							'onMenuShareQQ'
						]
					});
					wx.ready(function () {
						var shareData = {
							title: obj.title,
							desc: obj.desc,
							link: location.href.split('#')[0],
							imgUrl: obj.imgUrl
						};
						wx.onMenuShareAppMessage(shareData);
						wx.onMenuShareTimeline(shareData);
						wx.onMenuShareQQ(shareData);
					});
					wx.error(function (res) {
						console.log(res.errMsg); // 正式环境记得关闭啊！！！！
					});
				}

			}
		});
	}
}

export default new weChat();