"use strict";
exports.__esModule = true;
/// <reference path="../../lib/dts/jquery.d.ts" />
var $ = require("jquery");
function teste1() {
    $(".downloadlist li").each(function (i, li) {
        $(li).append("<a style=\"cursor: pointer\" class=\"my_download\">start_download</a>");
    });
    $(".downloadlist .my_download").click(function (e) {
        console.log("click");
        var url = $(e.currentTarget).closest("li").find("a.action").prop("href");
        if (url) {
            $.get(url, function (res) {
                $(res).find(".right .tab a.current").each(function (i, el) {
                    var url = $(el).prop("href");
                    if (/magnet/.test(url)) {
                        window.location.href = url;
                    }
                });
            });
        }
    });
}
//# sourceMappingURL=temp.js.map