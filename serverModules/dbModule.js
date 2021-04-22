const mysql = require("mysql2");
const error = require("./errorModule");

function addDataToDB(userData,response) {
    const connection = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        database: "feedback",
        password: "root"
    });
    for (let prop in userData) {
        if(!userData[prop]){
            userData[prop] = "User did not enter data";
        }
    }

    const user = [userData.name, userData.email,userData.message];
    const sql = "INSERT INTO users(name, email,text) VALUES(?, ?, ?)";

    connection.query(sql, user, function(err, results) {
        if(!err) {
            console.log("Add data");
        }else {
            error.errorHandler(err,response);
        }
    });
    connection.end();
}

exports.addDataToDB = addDataToDB;