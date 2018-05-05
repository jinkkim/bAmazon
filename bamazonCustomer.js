var fs = require('fs');
var inquirer = require('inquirer');

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

function updateData(){
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
            console.log('======================= Items on sale! ========================');

            for (i=0; i<results.length;i++){
                console.log('Item ID:' + results[i].item_id +
                            '\tProduct Name: ' + results[i].product_name + 
                            '\t($' + results[i].price + ', '+ results[i].stock_quantity + ' left)');
                }
            console.log('===============================================================\n\n');
        
            purchase();
        }
    }) 
};

function purchase() {
    inquirer.prompt([
        {
            name: "ID",
            type: "input",
            message: "What is the item number you wish to purchase?"
        }, {
            name: 'Quantity',
            type: 'input',
            message: "How many would you like to buy?"
        }
    ]).then(function(answer){

        var purchaseQty = answer.Quantity;
        var purchaseID = answer.ID;
        connection.query('SELECT * FROM products WHERE item_id = ?', [purchaseID], function(err,results){

            if(purchaseQty > results[0].stock_quantity){
                console.log('Insufficient Quantity!');
                console.log('This order has been cancelled\n\n');
                connection.end();
                process.exit();
                return;
            } else{
                console.log('\n\nThanks for your order. You have to pay $' + results[0].price * purchaseQty + '\n\n');
                connection.query('UPDATE products SET stock_quantity = stock_quantity - '+ purchaseQty + ' WHERE item_id = ' + purchaseID);
                updateData();

                return;
            }
        });

    });

}

updateData();