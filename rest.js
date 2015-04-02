/**
 * Created by sj on 2015-03-07.
 */
var restify = require('restify');





function respond(req, res, next) {
    res.send('hello' + req.params.name);
}

function postRes(req, res, next) {
    var paras = req.content;
    var result = "";
    for(var item in paras ){
        result+=item +":"+paras[item];
   }
    res.send('post is : ' + req.params.name);
}

var server = restify.createServer();

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

server.get('/hello/:name', respond);
server.head('/hello/:name', respond2);
server.post('/hello2/:name', postRes);

server.listen(3900, function() {
    console.log('%s listening at %s', server.name, server.url);
});