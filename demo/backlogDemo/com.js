const _ = require('lodash');
const dbconfig = require('../../config').uat_db;


async function getConn() {
    // get the client
    const mysql = require('mysql2/promise');
    return await mysql.createConnection(_.extend({database: 'ebidding'}, dbconfig));
}

let obj = {
    business_code: "",
    msg_title: "",
    msg_content: "",
    todo_url: "",
}

let SqlObj = {
    GetUrl: `  SELECT DISTINCT substring_index(todo_url,"?",1) as path  FROM msg_record WHERE type = 3 and is_deleted = 0    `,
    GetNoDeleted: `   SELECT  * FROM msg_record WHERE type = 3  and is_deleted=0    `,
}

//epl/pur/exeplan/viewExeplan.htm

async function main() {
    const connection = await getConn()
    const [sourceUrls] = await  connection.execute(SqlObj.GetUrl);
    let urls = sourceUrls.filter(a => a.todo_url && !_.startsWith(a.todo_url, "null") && !_.startsWith(a.todo_url, "&emId"));
    urls.forEach(a => console.log(``))
    console.log(urls)
    console.log("over \n")
}

async function main2() {
    const connection = await getConn()
    const [rows] = await  connection.execute(SqlObj.GetNoDeleted);
    const [sourceUrls] = (await  connection.execute(SqlObj.GetUrl));
    let paths = sourceUrls.map(a => a.path)
        .filter(path => path && !_.startsWith(path, "null") && !_.startsWith(path, "&emId"));
    let results = paths.map(path => {
        let find = rows.find(a => _.startsWith(a.todo_url, path))
        if (!find) {
            console.log(path)
            return null
        } else {
            return {
                business_code: find.business_code,
                msg_title: find.msg_title,
                msg_content: find.msg_content,
                todo_url: find.todo_url,
                path,
            }
        }
    }).filter(a => a);
    let categorys = ["审批", "采购", "提醒"];
    let caResult = {
        purchase: [],
        confirm: [],
        remind: [],
        other: []
    };
    results.forEach(row => {
        let key = categorys.find(c => row.msg_title.includes(c));
        switch (key) {
            case "审批" :
                caResult.confirm.push(row);
                break;
            case "采购" :
                caResult.purchase.push(row);
                break;
            case "提醒" :
                caResult.remind.push(row);
                break;
            default:
                caResult.other.push(row);
        }
    });
    //分类
    let str1 = JSON.stringify(caResult);

    //all
    let str = JSON.stringify(results);
    console.log(str);

    console.log("over \n")
}

main2();