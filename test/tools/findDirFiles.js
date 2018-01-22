let _ = require("lodash");
const fs = require("fs")

function getPortalHost() {
    var path = window.location.href;
    var index = path.indexOf("/portal");
    if (index > 0) {
        return path.substring(0, index)
    } else {
        return path
    }
}

console.log(getPortalHost())