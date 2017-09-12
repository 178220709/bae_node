const _ = require('lodash');
const dbconfig = require('../../config').onedb;


async function getConn() {
    // get the client
    const mysql = require('mysql2/promise');
    return await mysql.createConnection(_.extend({database: 'temp_en_name'}, dbconfig));
}


async function main() {
    const connection = await getConn()
    try {
        const [rows, fields] = await  connection.execute('SELECT * FROM f ');
        rows.forEach(a => {
            let ename = _.trim(a.ename);
            if (ename !== a.ename) {
                connection.execute(' update  f  set ename = ? where id =   ', [ename, a.id]);
                console.log(ename)
            }
        });

    } catch (e) {
        console.log(e)
    }
    console.log("over \n")
}

function comEName(a, b) {

    if (a.toLowerCase() === b.toLowerCase()) return true

    if (a.toLowerCase().replace(" ", "-") === b.toLowerCase().replace(" ", "-")) return true

    return false

}

async function main2() {
    const connection = await getConn();
    const [fw] = await  connection.execute('SELECT * FROM f ');
    const [ws] = await  connection.execute('SELECT * FROM w ');

    let result = [];
    fw.forEach(a => {
        let match = ws.find(b => comEName(a.ename, b.ename))
        if (match) {
            result.push(a)
        }
    });
    console.log("over \n")
}

main2();