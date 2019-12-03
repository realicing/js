
(function () {
    const list = [
        "https://api.lhh.la/vip/?url=",
        "http://www.82190555.com/index/qqvod.php?url=",
        "http://jiexi.071811.cc/jx2.php?url=",
        "http://beaacc.com/api.php?url=",
        "https://www.administratorw.com/admin.php?url=",
        "http://www.lvxingjiaju.com/jiexi/?url=",
        "http://jx.xiaozhaoyy.cn/?url=",
        "http://vip.77o.net/jiexi/?v=",
        "https://by.dybhn.com/index.php?url=",
        "https://www.playm3u8.cn/jiexi.php?url=",
        "http://vip.jlsprh.com/index.php?url=",
    ];
    let list2 = [];
    const URL_START_LIST = [
        "https://www.iqiyi.com/v_",
        "https://v.qq.com/x/cover/",
        "https://v.youku.com/v_show/",
        "https://video.tudou.com/v/",
        "https://www.mgtv.com/b/",
        "http://www.le.com/ptv/vplay/",
        "https://tv.sohu.com/v/",
        // "",
    ];
    let videoPanel;
    let buttonsPanel;
    let curUrl = window.location.toString();
    let needInitVideo = false;
    main();
    function main() {
        URL_START_LIST.forEach(item => {
            needInitVideo |= curUrl.startsWith(item);
        });

        if (needInitVideo) {
            initVideo(curUrl);
            initButtons(curUrl);
            listenUrlChange((curUrl, newUrl) => {
                // alert("listenUrlChange curUrl = " + curUrl);
                // alert("listenUrlChange newUrl = " + newUrl);
                initVideo(newUrl);
                initButtons(newUrl);
            });
        }
    }

    //监听url变化
    function listenUrlChange(callBack) {
        setTimeout(() => {
            let newUrl = window.location.toString();
            if (curUrl !== newUrl) {
                callBack && callBack(curUrl, newUrl);
                curUrl = newUrl;
            }
            listenUrlChange(callBack);
        }, 500);
    }


    //生成右下角dom按钮
    function initButtons(srcLink) {
        if (buttonsPanel == null){
            buttonsPanel = document.createElement('div');
            buttonsPanel.setAttribute("style", `
                position: fixed;
                z-index: 10000;
                left: 45vw;
                top: 2vw;
                background: #3385ff;
                padding: 10px;
                box-shadow: 0 0 10px #002761;
                border-radius: 3px;
                color: white;`);
        }
        let html = `<div class="btn-area">`;
        list.forEach(item => {
            let link = item + srcLink;
            html += `<a href="` + link + `">
                        <button>` + item + `</button>
                     </a></br>`
        });
        list2.forEach(({name, value}) => {
            let link = value + srcLink;
            html += `<a href="` + link + `">
                        <button>` + name + `</button>
                     </a></br>`
        });
        html += `</div>`;
        buttonsPanel.innerHTML = html;
        document.body.appendChild(buttonsPanel);
    }

    //播放
    function initVideo(link) {
        if (videoPanel == null) {
            videoPanel = document.createElement('div');
            videoPanel.setAttribute("style", `
                position: fixed;
                z-index: 100000000001;
                width: 40vw;
                height: 30vw;
                left: 5vw;
                top: 2vw;
                background: #3385ff;
                padding: 0;
                box-shadow: 0 0 10px #002761;
                border-radius: 1px;
                color: white;`);
        }
        document.body.appendChild(videoPanel);
        let html = `<iframe position="sticky" top="30px" right="5px" width="100%" height="100%" src="https://api.tv920.com/vip/?url=` + link +
            `" frameborder="0" border="0" marginwidth="0" marginheight="0" scrolling="no" allowfullscreen="allowfullscreen"  mozallowfullscreen="mozallowfullscreen"  msallowfullscreen="msallowfullscreen" oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen" ></iframe>
	`;
        videoPanel.innerHTML = html;
    }

})();