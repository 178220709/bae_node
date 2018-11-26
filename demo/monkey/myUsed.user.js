// ==UserScript==
// @name         下载种子 去广告 多功能
// @author      me
// @description
// @namespace
// @icon        http://img.duoluohua.com/appimg/script_dupanlink_icon_48.png
// @license     GPL version 3
// @encoding    utf-8
// @date        26/08/2013
// @modified    05/09/2014
// @include     *
// @exclude     https://www.zhihu.com/*
// @exclude     https://*.zhihu.com/*
// @require     https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @grant       unsafeWindow
// @run-at      document-body
// @version     0.0.2
// ==/UserScript==

String.prototype.format = function () {
    let args = arguments;
    let reg = /\{(\d+)}/g;
    return this.replace(reg, function (g0, g1) {
        return args[+g1];
    });
};

(function ($, url) {

    if (!$.fn.jquery) {
        console.log("没有找到jquery!")
    } else {
        $$ = $
        console.log("加载jquery,版本" + $.fn.jquery)
    }

    //document.getElementById("down_btn").removeAttribute("onclick");
    if (url.indexOf("happytogether2015") >= 0) {
        $("#down_btn").removeAttr("onclick");
    }

    if (url.indexOf("dygod") >= 0) {
        console.log("recognize dygod ");
        var a = $("a[title='迅雷专用高速下载']");
        var table = a.closest("table");
        var htmlStr = "<a about=''  > "

        table.append("<tr>  <td> <input style='width: 100%'  type='text' value='{0}' />   </td></tr>".format(a.html()))
    }

    if (url.indexOf("quanji") >= 0 || url.indexOf("loldytt") >= 0) {
        $(".downurl").each(function () {
            var ul = $(this);
            var urls = [];
            ul.find(".dwon_xl a").each(function () {
                urls.push($(this).attr("href"))
            });
            urls.push($(this).attr("href"));
            var result = urls.join("\n");
            ul.siblings(".ckall").append("<textarea type='button' name='btnShowResult'  > </textarea>")
            ul.siblings(".ckall").find("textarea[name=btnShowResult]").html(result)
            console.log(result)
        });
    }

    if (url.indexOf("avlang") >= 0) {
        $(".index-info .tac a").remove();
        $(".index-info .tac").css("height", 10);
        var question = $("select[name=question]")
        if (question.is() || true) {
            question.val(3)
            question.closest("tbody").find("input[name=answer]").val("123123")
        }
    }

    if (url.indexOf("dms.console.aliyun.com") >= 0) {
        setTimeout(() => {
            document.getElementById("connectStr-itemInputBox").value = document.getElementById("connectStr-itemInputBox").value.replace("shumixian-bms-", "")
            console.log(' document.getElementById("connectStr-itemInputBox").value = document.getElementById("connectStr-itemInputBox").value .replace("shumixian-bms-","")')
        }, 4000)
    }

    if (/downsx.|downsx./.test(url)) {
        setTimeout(() => {
            //$(".dlboxbg a").prop("onclick", "");
            $(".dlboxbg a:eq(0)").text("去广告下载");
            document.querySelector(".dlboxbg a").removeAttribute("onclick");
            document.querySelector(".dlboxbg a").click()
        }, 1000)
    }

    //http://www.gongkou.net/gongkou/4773.html 下一页绑定右键
    if (url.indexOf("gongkou.net") >= 0) {
        $(document).keyup(function (e) {
            console.log("keyCode" + e.keyCode)
            if (e.keyCode == 39) {
                $("div.tg_pages").find("a:last")[0].click()
            }
        });
        $("#scrolltop").click(function () {
            $("div.tg_pages").find("a:last")[0].click()
        })
    }

    if (url.indexOf("m.ppmh8.com") >= 0) {
        $("body").css("width", "500px");

    }

    //直接显示下载链接
    if (url.indexOf("www.btbttv.net") >= 0) {
        $(".downloadlist li").each(function (i, li) {
            $(li).append("<a style=\"cursor: pointer\" class=\"my_download\">start_download</a>");
        });
        $(".downloadlist .my_download").click(function (e) {
            console.log("click");
            let url = $(e.currentTarget).closest("li").find("a.action").prop("href");
            if (url) {
                $.get(url, function (res) {
                    $(res).find(".right .tab a.current").each((i, el) => {
                        let url = $(el).prop("href")
                        if (/magnet/.test(url)) {
                            window.location.href = url
                        }
                    });
                });
            }
        });
    }

    if (/avmoo.net|downsasdasdasdx./.test(url)) {
        let code = $("body > div.container > div.row.movie > div.col-md-3.info > p:nth-child(1) > span:nth-child(2)").text();
        let url = `https://m.zhongzimei.com/list/${code}/1`;
        $(".hidden-xs").append(`<div> <a href="${url}" target="_blank">${url}</a>  </div>`)
    }

    if (/btso.pw\/search/.test(url)) {
        console.log("check has pwCount");
        let count = localStorage.getItem("pwCount") || 3;
        $(".data-list a").each((i, e) => {
            if (i >= count) return;
            $.get($(e).attr("href")).then(res => {
                let mxStr = $(res).find("#magnetLink").text();
                console.log(mxStr)
                $(e).closest(".row").append(`<div> <input type="text" value="${mxStr}" style="width: 1200px"></div>`)
            })
        });
    }

    if (/m.zhongzimei.com\/list/.test(url)) {
        $('body').on('click', '.list-group .btnCopyMx', function (e) {
            let url = $(e.currentTarget).closest(".list-group").find("li a.text-success ").attr("href");
            $.get(url).then(res => {
                let mxStr = $(res).find("#copytext").text();
                console.log(mxStr);
                $(e.currentTarget).closest(".list-group").append(`<li style="width: 70%"><input class="txtMx" type="text" value="${mxStr}" style="width: 1200px">  </li>`)
                $(e.currentTarget).closest(".list-group").find(".txtMx").select();
                console.log("copy :" + document.execCommand('copy'))
                setTimeout(() => console.log("copy :" + document.execCommand('copy')), 100);
            });
        });
        $(".list-group").each((i, e) => {
            $(e).find("li.title ").append(`<span style="margin-left: 300px;">  <button class="btnCopyMx">btnCopyMx</button> </span>`)
        });
    }


})($ ? $.noConflict() : JQuery, document.location.href);





