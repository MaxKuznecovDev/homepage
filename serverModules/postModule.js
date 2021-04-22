const db = require("./dbModule");
const {parse} = require("querystring");
function getPOST(request,response) {
    let body = '';
    request.on("data", chunk=>{
        body+= chunk.toString();
    })
    request.on("end",()=>{
        db.addDataToDB(parse(body),response);
    })
}
exports.getPOST = getPOST;