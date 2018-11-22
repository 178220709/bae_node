// ==UserScript==
// @name         下载种子 去广告
// @author      me
// @description
// @namespace
// @icon        http://img.duoluohua.com/appimg/script_dupanlink_icon_48.png
// @license     GPL version 3
// @encoding    utf-8
// @date        26/08/2013
// @modified    05/09/2014
// @include     *
// @require     http://cdn.bootcss.com/jquery/2.1.4/jquery.js
// @grant       unsafeWindow
// @run-at      document-end
// @version     0.0.1
// ==/UserScript==

String.prototype.format = function () {
    var args = arguments;
    var reg = /\{(\d+)}/g;
    return this.replace(reg, function (g0, g1) {
        return args[+g1];
    });
};

var url = document.location.href;


//document.getElementById("down_btn").removeAttribute("onclick");
//下载站点，去点击广告
if (url.indexOf("happytogether2015") >= 0) {
    $("#down_btn").removeAttr("onclick");
}
//下载站点，列举出下载链接
if (url.indexOf("dygod") >= 0) {
    console.log("recognize dygod ");
    var a = $("a[title='迅雷专用高速下载']");
    var table = a.closest("table");
    table.append("<tr>  <td> <input style='width: 100%'  type='text' value='{0}' />   </td></tr>".format(a.html()))
}
//下载站点，列举出下载链接
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

//填充密码问题
if (url.indexOf("avlang") >= 0) {
    $(".index-info .tac a").remove();
    $(".index-info .tac").css("height", 10);
    var question = $("select[name=question]")
    if (question.is() || true) {
        question.val(3)
        question.closest("tbody").find("input[name=answer]").val("123123")
    }
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

//知乎 去掉头部pin
if (url.indexOf("www.zhihu.com/question") >= 0) {
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

if (/btso.pw/.test(url)) {
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







