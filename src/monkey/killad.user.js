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
            document.querySelector(".dlboxbg a").removeAttribute("onclick")
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

})($ ? $.noConflict() : JQuery, document.location.href);





