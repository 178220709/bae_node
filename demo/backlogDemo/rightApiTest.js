// let file = "/root/jenkins_home/workspace/uat-arch-tools-web/build/temp/pro.back.html";
let file = "/root/jenkins_home/workspace/uat-coop-web/build/temp/pro.purchaser.html";
let name = file.substring(file.lastIndexOf("pro.") + 4, file.lastIndexOf(".html"));

let {parse} = require("url");

let axios = require("axios");
let moment = require("moment");
let _ = require("lodash");

let url = "http://116.62.108.49:8080/onelink.mdata.rights.api/role/findRolesByUserId?userId=201853";

function testRpc() {
    let doGet = async (i) => {
        let str = `start ${i} at ${moment().format("mm:ss_SSS")}  ===>  `;
        try {
            let res = await axios.get(url);
            console.log(res.data)
        } catch (e) {
            console.error(e)
        }
        console.log(str + `end ${i} at ${moment().format("mm:ss_SSS")}`)
    };
    _.range(0, 10).forEach(i => doGet(i))
}


testRpc()
