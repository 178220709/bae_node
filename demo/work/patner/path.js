const _ = require('lodash');
// 导入战略协议

const dbconfig = require('../../../config').uat_db;


async function getConn() {
    // get the client
    const mysql = require('mysql2/promise');
    return await mysql.createConnection(_.extend({database: 'ebidding'}, dbconfig));
}


let str = `
复地战略-阀门-oventrop	阀门
集团战略-电子锁-云盯	电子锁
集团战略-可视对讲-罗格朗	可视对讲
集团战略-机械车位	机械车位
集团战略-电子锁-耶鲁	电子锁
集团战略-开关插座-西门子	开关插座
集团战略-开关插座-施耐德	开关插座
集团战略-开关插座-龙胜	开关插座
集团战略-可视对讲-狄耐克	可视对讲
复地战略-阀门-渤海	阀门
集团战略-室内墙地砖-诺贝尔	室内墙地砖
集团战略-室内墙地砖-圣凡尔赛	室内墙地砖
集团战略-电子锁-第吉尔	电子锁
上海复星高科技（集团）有限公司与百世物流科技（中国）有限公司战略合作框架协议	快递服务
上海复星高科技（集团）有限公司与深圳广田装饰集团股份有限公司战略合作框架协议	装饰／装修
上海复星高科技(集团)有限公司与乐金电子(中国)有限公司战略合作框架协议	商用电视／显示器
复星集团国际及国内快递服务战略采购协议	快递服务
复星集团办公用品战略采购协议	办公用品
上海复星高科技(集团)有限公司与亚美亚（上海）企业管理有限公司战略合作框架协议	办公用品
上海复星高科技(集团)有限公司与大北欧通讯设备贸易（上海）有限公司 战略合作框架协议	会议耳机
复印机、打印机租赁框架合作协议（复星医药-普丽-香港一修哥）	复印打印机租赁
全时电话会议框架合同	电话会议
复星医药办公用品战略采购协议--晨光	办公用品
上海复星高科技（集团）有限公司与三星（中国）投资有限公司战略合作框架协议	商用电视／显示器
复星集团国际及国内快递服务战略采购协议	快递服务
复星集团2015年办公电脑全球战略采购协议（惠普）	办公电脑
复星集团办公用品战略采购协议	办公用品
复星集团2015年文印管理服务全球战略采购协议	文印服务
上海复星高科技(集团)有限公司与英格索兰(中国)工业设备制造有限公司战略采购框架协议	高尔夫球车
复星集团与柯莱特IT人员外包框架协议	IT人力外包
复星集团与腾邦IT人员外包框架协议	IT人力外包
复星集团与合肥凯捷IT人员外包框架协议	IT人力外包
复星集团与上海新致IT人员外包框架协议	IT人力外包
复星集团与深圳法本IT人员外包框架协议	IT人力外包
文印设备租赁与全包服务框架协议	文印服务
复星医药集团国际快递（DHL）战略合作协议	快递服务
复星医药办公用品战略采购协议-史泰博	办公用品
复星医药一惠普电脑战略采购合作框架协议	办公电脑
复星医药一联想电脑战略采购合作框架协议	办公电脑
复星集团与上海移动战略合作框架协议	行政服务
上海复星高科与联想战略合作框架协议	办公电脑／服务器
集团战略-VRV空调、冷水机组、家用分体机、生活电器	生活电器／空调
集团战略-电梯	电梯
集团战略-防水工程-东方雨虹	防水工程
集团战略-防水工程-凯伦	防水工程

`

function getItems() {
    let results = str.split("\n").map(a => _.trim(a)).filter(a => a)
        .map(a => {
            let arr = a.split("\t");
            return {
                name: arr[0],
                category: arr[1]
            }
        });
    return results
}

async function main2() {
    let items = getItems();
    let checkSqlItems = items.map(a => a.name).reduce((a, b) => a + `'${b}',`, "");
    let checkSql = ` select  * from epl_pur_protocol WHERE protocol_name in ( ${_.trimEnd(checkSqlItems, ",")} )`;
    const connection = await getConn()
    const [checkItems] = await  connection.execute(checkSql);
    let checkNames = checkItems.map(a => a.protocol_name)
    items.forEach(a => {
        if (!_.some(checkNames, cname => cname === a.name)) {
            console.log("no match name:" + a.name)
        }
    });
    console.log(items.length);
    let sqlResult = "";
    items.forEach(a => sqlResult += `update epl_pur_protocol set supply_category = '${a.category}' WHERE protocol_name = '${a.name}' ; \n `)
    console.log(sqlResult)
}


main2()