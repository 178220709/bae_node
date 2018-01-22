let str = `
var data = []; 
data["A1"] = "9";
data["A10"] = "9.5";
data["A101"] = "19.5";
data["A11"] = "9.5";
data["A12"] = "10.5";
data["A13"] = "11";
`;

let err = require("./error.json");


console.log(err.trace);
console.log(err.message);