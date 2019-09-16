// loading动画
export function loadingEvent(isLoading) {
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
}