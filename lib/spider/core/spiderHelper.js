
var http = require('http');

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
                callback(data);
            });
        }).on("error", function(err,p2,p3) {
            callback(null);
        });
}




module.exports = help;


