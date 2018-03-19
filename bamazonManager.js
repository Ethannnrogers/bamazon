var mysql = require('mysql');
var inquirer = require('inquirer');
var table = require('console.table');

var connection =  mysql.createConnection({
    
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "damazon"
    
    });
    
    connection.connect(function(err){
        if (err) throw err;
       managerSelect();
    
    });

function managerSelect() {
    inquirer.prompt([
        {
            name: 'selection',
            type: 'list',
            message: '+*****+ what would you like to do? +*****+',
            choices: ["VIEW PRODUCTS", "VIEW LOW INVENTORY", "ADD TO INVENTORY", "ADD A PRODUCT", "EXIT"],
            defualt: ["VIEW PRODUCTS"]
        }
    ]).then(function(answer) {

        switch(answer.selection){
            case "VIEW PRODUCTS":
            showProducts();
            break;
            case "VIEW LOW INVENTORY":
            showInventory();
            break;
            case "ADD TO INVENTORY":
            addInventory();
            break;
            case "ADD":
            addProduct();
            break;
            case "EXIT":
            exitServer();
            break;
            default:
            console.log("Select an option");
        }
    })
};

function showProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++){
            console.table([
                {
                    item_id: res[i].item_id,
                    product_name: res[i].product_name,
                    department_name: res[i].department_name,
                    price: res[i].price,
                    stock_quantity: res[i].stock_quantity
                }
            ])
        }
        managerSelect();
    });
};

function showInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity BETWEEN ? and ?", [0,100], function(err, res) {

        if (res <= 0) {
            console.log("\n +*****+ Items are all fully stocked +*****+")
            managerSelect();
        } else{ 
            for (var i = 0; i < res.length; i++) {
                console.table([
                    {
                        item_id: res[i].item_id,
                        product_name: res[i].proudct_name,
                        department_name: res[i].department_name,
                        price: res[i].price,
                        stock_quantity: res[i].stock_quantity
                    }
                ])
            }
            managerSelect();
        }

    });
};


function addInventory() {
    connection.query("SELECT * FROM products", function(err, res){
        inquirer.prompt([
            {
                name: "selection",
                type: "input",
                message: "+*****+ Select the id of the item being stocked +*****+",
                validate: function (value) {
                    if (isNaN(value) === false)
                        return true;
                }
            }, {
                name: "quantity",
                type: "input",
                message: "+*****+ enter the amount of inventory being stocked +*****+",
                default: 1,
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                }
            }
        ]).then(function(answer){
            var selectedItem;
            for (var i = 0; i < res.length; i++){
                if (res[i].item_id === parseInt(answer.selection)){
                    selectedItem = res[i];

                }
            }

            var addStock = parseInt(selectedItem.stock_quantity) + parseInt(answer.quantity);
            if (addStock >= 0){
                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: addStock
                }, {
                    item_id: selectedItem.item_id
                }
                ]);

            }

            managerSelect();
        })
    });

};


function addProduct() {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "+*****+ What is the name of the product? +*****+",
            validate: function(value) {
                if (value !== null) {
                    return true;
                }else {
                    console.log("+*****+ You must enter the product name +*****+");
                    return false;
                }
            }
        }, 
        {
            name: "department",
            type: "input",
            message: " +*****+ Which department is this item in? +*****+",
            validate: function(value) {
                if (value !== null) {
                    return true;
                }else {
                    console.log("+*****+ You must enter the department name +*****+");
                    return false;
                }
            }
        },
        {
            name: "price",
            type: "input",
            message: "+*****+ What is the listing price? +*****+",
            validate: function(value) {
                if (value !== null) {
                    return true;
                }else {
                    console.log("+*****+ You must enter the listing price +*****+");
                    return false;
                }
            }
        },
        {
            name: "qty",
            type: "input",
            message: "+*****+ How many items will be in stock? +*****+",
            validate: function(value) {
                if (value !== null) {
                    return true;
                }else {
                    console.log("+*****+ You must enter the stock +*****+");
                    return false;
                }
            }
        }
    ]).then(function(answer){
        connection.query("INSERT INTO products SET ?", {
            product_name: answer.name,
            department_name: answer.department,
            price: answer.price,
            stock_quantity: answer.qty
        }, function(err, res) {
            if(err) throw err;
        });
        managerSelect();
    });
};

function exitServer() {
    connection.end();
}