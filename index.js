const fs = require("fs");
const http = require("http");
const post = require("./serverModules/postModule");
const router = require("./serverModules/routerModule");

http.createServer(function (request,response) {
    if(request.method == "POST"){
        post.getPOST(request,response);
    }
    router.routing(request,response)

}).listen("8888");


