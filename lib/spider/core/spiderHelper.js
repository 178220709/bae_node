
var http = require('http');
var then = require('thenjs');
var cheerio = require('cheerio');
function contentModel(){
    this.url = "";
    this.AddedTime = new Date();
}
var help = {};
help.getUrlHtml = function( url,callback){

    // Utility function that downloads a URL and invokes
    // callback with the data.
        http.get(url, function(res) {
            var data = ""
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on("end", function() {

                var encoder =   res.headers['content-type'];
                if(!data){
                    var str =  "";
                }
                callback(data);
            });
        }).on("error", function(err,p2,p3) {
            callback(null);
        });
}

help.getUrlThen = function( url){
    // Utility function that downloads a URL and invokes
    // callback with the data.
    return then(function(cont){
        http.get(url, function(res) {
            var data = ""
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on("end", function() {
                cont(null,data);
            });
        }).on("error", cont);
    });
};
help.log = console.log;

help.showExist = function(str){
    if(process.env.USER_ShowExist && process.env.USER_ShowExist=="1" ){//配置，关掉api说明
        help.log(str)
    }
};

help.load = function(html){
   return cheerio.load(html, {decodeEntities: false});
}

module.exports = help;


