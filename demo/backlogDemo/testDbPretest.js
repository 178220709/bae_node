const _ = require('lodash');
const dbconfig = require('../../config').test_db;

let moment = require("moment");

async function getConn() {
    // get the client
    const mysql = require('mysql2/promise');
    return await mysql.createConnection(_.extend(dbconfig, {database: 'role_permission_system'}));
}


let SqlObj = {
    SelSql: ` 
SELECT RRI.ROLE_ID               roleId,
       CAST(RRI.ROLE_ID AS CHAR) roleIdExt,
       RRI.ROLE_CODE             roleCode,
       RRI.ROLE_NAME             roleName,
       RRI.ROLE_DESCRIBE         roleDescribe,
       RRI.PRODUCT_ID            productId,
       RFI.FUNCTION_ID           functionId,
       RFI.FUNCTION_NAME         functionName,
       RFI.FUNCTION_CODE         functionCode,
       RFI.FUNCTION_TAG          functionTag,
       RFI.FUNCTION_DESCRIBE     functionDescribe,
       REI.ELEMENT_ID            elementId,
       REI.ELEMENT_CODE          elementCode,
       REI.ELEMENT_NAME          elementName,
       REI.DISPLAY_NAME          displayName,
       REI.ELEMENT_TYPE          elementType,
       REI.ELEMENT_ORDER         elementOrder,
       REI.ELEMENT_URI           elementUri,
       REI.IS_ENABLE             isEnable,
       REI.IS_MAIN_PAGE          isMainPage,
       REI.LANGUAGE_VERSION      languageVersion,
       REI.PARENT_ELEMENT_ID     parentElementId
FROM RP_ROLE_INFO RRI
       JOIN RP_USER_ROLE RUR ON RRI.ROLE_ID = RUR.ROLE_ID
       LEFT JOIN RP_ROLE_FUNCTION RRF ON RRF.ROLE_ID = RRI.ROLE_ID
       LEFT JOIN RP_FUNCTION_INFO RFI ON RFI.FUNCTION_ID = RRF.FUNCTION_ID AND RFI.DELETE_FLAG = 0
       LEFT JOIN RP_FUINCTION_ELEMENT RFE ON RFE.FUNCTION_ID = RFI.FUNCTION_ID AND RFE.DELETE_FLAG = 0
       LEFT JOIN RP_ELEMENT_INFO REI ON REI.ELEMENT_ID = RFE.ELEMENT_ID AND REI.DELETE_FLAG = 0
WHERE RUR.USER_ID = 201854
  AND RUR.DELETE_FLAG = 0
  AND RRI.DELETE_FLAG = 0;   `,
    GetNoDeleted: `    `,
}

//epl/pur/exeplan/viewExeplan.htm

async function getTest() {
    const connection = await getConn()
    const [roles] = await connection.execute(SqlObj.SelSql);
    console.log(`query size ${roles.length}`)
}

function main() {
    _.range(0, 10).map(async i => {
        let str = `start ${i} at ${moment().format("mm:ss_SSS")}  ===>  `;
        await getTest()
        console.log(str + `end ${i} at ${moment().format("mm:ss_SSS")}`)
    })
}

main()