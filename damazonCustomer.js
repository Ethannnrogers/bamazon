var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "damazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
    displayProducts();
});

//display products (id, name, price)
function displayProducts() {
   
    connection.query("SELECT * FROM products", function(err, res) {
        console.log("\n==================================================");
        console.log("+*************+ WELCOME TO BAMAZON +*************+");
        console.log("==================================================\n");
        for(var i = 0; i < res.length; i++) {
            console.log("\n" + res[i].item_id + " | " + res[i].product_name + " | $" + res[i].price + "\n");
        }
        
        userInput();
    });

    
}

function userInput() {
    inquirer.prompt([
        {
            name: "selectedItem",
            type: "input",
            message: "Please enter the id number of the item you want to buy"
        },{
            name: "qty",
            type: "input",
            message: "How many would you like to buy?"
        }
    ]).then(function(answer){
       // console.log("You Are Purchasing Item: " + answer.selectedItem);

        connection.query("SELECT stock_quantity FROM products WHERE item_id = ?", [answer.selectedItem], function(err, res){
            //console.log("All results: " + res);
            //console.log("db qty: " + res[0].stock_quantity);
            if(res[0].stock_quantity > answer.qty){
                connection.query("UPDATE products SET ? WHERE ?",
                [
                 {
                     stock_quantity: (res[0].stock_quantity-answer.qty)
                 },
                 {
                    item_id: answer.selectedItem
                 }
                ]); 
                console.log("==============================================");
                console.log("+*************+ ITEM PURCHASED +*************+");
                console.log("==============================================");
               finalFunction();
                 
             }else{
                 console.log("+*************+ THIS ITEM IS SOLD OUT +*************+");
                finalFunction();
             }
            
        })
    })
}

function finalFunction() {
    inquirer.prompt([
        {
            name: "final",
            type: "list",
            message: "What would you like to do now?",
            choices: ["Shop", "Exit"]

        }
    ]).then(function(answer){
        if(answer.final === "Shop"){
            displayProducts();
        }else {
            connection.end();
        }
    })
}

