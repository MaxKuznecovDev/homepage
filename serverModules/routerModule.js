const fs = require("fs");
const error = require("./errorModule");

function routing(request,response) {
    if (request.url.endsWith(".css")) {
        getFile("assets" + request.url, response,{'Content-Type':'text/css'});
    } else if (request.url.endsWith(".js")) {
        getFile("assets" + request.url, response,{'Content-Type':'text/javascript'});
    } else if (request.url.endsWith(".jpg")|| request.url.endsWith(".png")) {
        getFile("assets" + request.url, response,{'Content-Type':'image/jpg'},'');
    } else {

        getPage(request.url, response);
    }
}
function getPage(url,response, statusCode = 200) {
    fs.readFile("assets/layout/default.html",'utf8',(err,layoutData)=>{
        if(!err) {
            getHeader(layoutData, url, response, statusCode);
        }else {
            error.errorHandler(err,response);
        }
    } );
}

function getHeader(layoutData,url,response,statusCode) {
    fs.readFile("assets/elem/header.html",'utf8',(err,headerData)=>{
        if(!err){
            layoutData = layoutData.replace('{{get header}}',headerData);
            getContent(layoutData,url,response,statusCode);
        }else {
            error.errorHandler(err,response);
        }
    });
}
function getContent(layoutData,url,response,statusCode) {
    if(url == "/"){
        url = "/home";
    }
    fs.readFile(`assets/elem${url}.html`,'utf8',(err,content)=>{
        if(!err){
            layoutData = layoutData.replace('{{get content}}',content);
            layoutData = setTitleInLayout(layoutData,content);
            getFooterAndSend(layoutData,content,response,statusCode);
        }else{
            getPage("/404",response,404);
        }
    });
}
function getFooterAndSend(layoutData,content,response,statusCode) {
    fs.readFile("assets/elem/footer.html",'utf8',(err,footerData)=>{
        if(!err) {
            layoutData = layoutData.replace('{{get footer}}', footerData);
            send(response,layoutData,statusCode,{'Content-Type':'text/html'});
        }else{
            error.errorHandler(err,response);
        }
    });
}
function setTitleInLayout(layoutData,pageContent) {
    let title = pageContent.match(/{{set title: "(.*?)"}}/g);
    if(title){
        layoutData = layoutData.replace(/{{set title: "(.*?)"}}/g,"");
        layoutData = layoutData.replace(/{{get title}}/g,title[0]);
        layoutData = layoutData.replace(/{{set title: "/g,"");
        return  layoutData.replace(/"}}/g,"");


    }

}

function getFile(url,response,headers,coding = 'utf8') {
    fs.readFile(url,coding,(err,data)=>{
        if(!err){
            send(response,data,200,headers);
        }else{
            error.errorHandler(err,response);
        }
    } );
}

function send(response,data,statusCode,headers) {

    response.writeHeader(statusCode,headers);
    response.write(data);
    response.end();
}
exports.routing = routing;
