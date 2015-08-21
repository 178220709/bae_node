/**
 * Created by Administrator on 2015/4/7.
 */






var FindProxyForURL = function(init, profiles) {
    return function(url, host) {
        "use strict";
        var result = init, scheme = url.substr(0, url.indexOf(":"));
        do {
            result = profiles[result];
            if (typeof result === "function") result = result(url, host, scheme);
        } while (typeof result !== "string" || result.charCodeAt(0) === 43);
        return result;
    };
}("+SS socks", {
    "+SS socks": function(url, host, scheme) {
        "use strict";
        if (host === "[::1]" || host === "localhost" || host === "127.0.0.1") return "DIRECT;";



        return "SOCKS5 127.0.0.1:1080;";
    }
});



