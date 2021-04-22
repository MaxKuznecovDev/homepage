 function errorHandler(err,response){
    console.error(err);
     response.statusCode = 500;
     response.end("Server error!");
     return;
 }
 exports.errorHandler = errorHandler;