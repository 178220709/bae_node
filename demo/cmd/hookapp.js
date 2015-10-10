/**
 * Created by jsons on 2015/10/10.
 */

'use strict';
/*global global, require, process, module, baejs*/
/*jslint node: true */

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var router = express.Router();
router.get('/', function (req, res, next) {
    console.log(req.params);
    res.send(req.params);
});
router.post('/baehook', function (req, res, next) {
    console.log(req.body);
    res.send(req.body);
});
app.use('/', router);


app.listen('4070');
console.log("baehook is start at 4070");
