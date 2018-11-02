/// <reference path="../../lib/dts/jquery.d.ts" />
import * as $ from "jquery"


function teste1() {
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
