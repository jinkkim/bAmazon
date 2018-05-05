var fs = require('fs');

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
	port: 3306,
	user: 'web',
	password: '1234',
	database: 'bamazon'
  });

connection.connect(function(err){
    if (err){console.log(err)} ;
	console.log('Connected!');
});


connection.query("SELECT * FROM products", function(err, results) {
    //var content = JSON.stringify(results);
    //fs.writeFile("produce_list.json", content, 'utf8', function (err){
    //        if (err) {
    //            console.log("error occured");
    //        } else {
    //            console.log("JSON is saved");
    //        }       
    //});
    if (err) {
        console.log("error");
    }else{
        
    }
});
   
connection.end();