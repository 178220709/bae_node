// ==UserScript==
// @name        zhihu增强
// @author      me
// @description
// @namespace
// @icon        http://img.duoluohua.com/appimg/script_dupanlink_icon_48.png
// @license     GPL version 3
// @encoding    utf-8
// @date        26/08/2013
// @modified    05/09/2014
// @include     *
// @include     *.zhihu.com*
// @require     https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @grant       unsafeWindow
// @run-at      document-body
// @version     0.0.2
// ==/UserScript==


(function ($, url) {
    let o = {
        //btn{name:string,fn:cb}
        initBtn(names, cb) {
            $('body').on("click", "#myBtnPop button", (e) => {
                let index = $(e.currentTarget).index()
                console.log(`#myBtnPop button ${index} is clicked `)
                cb(index)
            });
            let btnStr = names.map(a => `<button style="margin: 5px 0 5px 0;">${a}</button>`).join(" ");
            $("body").append(`<div style="width: 50px;position: fixed;  display: block; left: 1px; bottom: 134px;font-size: 12px;" id="myBtnPop"> 
                    ${btnStr} 
                              </div>`)

        },
        bindBtn() {
            let cursor = 0;
            $('body').on("click", "#QuestionAnswers-answers .List-item", (e) => {
                cursor = $(e.currentTarget).index();
            });
            o.initBtn(["清除标题", "清除内容"], (i) => {
                switch (i) {
                    case 0: {
                        $(".QuestionHeader-title").text(" ");
                        break
                    }
                    case 1: {
                        console.log("开始清理 , cursor: " + cursor);
                        for (let i = 0; i < cursor; i++) {
                            $("#QuestionAnswers-answers .List-item").eq(0).remove()
                        }
                        break
                    }
                }
            })
        }
    };

    if (!$.fn.jquery) {
        console.log("没有找到jquery!")
    } else {
        $$ = $;
        console.log("加载jquery,版本" + $.fn.jquery)
    }


    if (url.indexOf("www.zhihu.com/question") >= 0) {
        setTimeout(() => o.bindBtn(), 1000);
    } else {
        console.log("判断失败")
    }


})($ ? $.noConflict() : JQuery, document.location.href);





