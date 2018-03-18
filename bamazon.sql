DROP DATABASE IF EXISTS damazon;
CREATE DATABASE damazon;
USE damazon;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(80),
department_name VARCHAR(80),
price DECIMAL(10,3),
stock_quantity INT NOT NULL,
primary key(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES( "Hammock", "Outdoors", 19.98, 461);


INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES( "Tennis Racket", "Outdoors", 8.49, 203);


INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Brush Kit", "Beauty", 12.99, 1197);


INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Jeans", "Clothing", 32.98, 63);


INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Hoodie", "Clothing", 24.18, 172);


INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Controller", "Electronics", 5.86, 222);


INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Charger", "Electronics", 7.89, 1023);


INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("TV", "Electronics", 238.01, 29);


INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Spatula", "Kitchen", 4.98, 239);


INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES( "Knife Set", "Kitchen", 42.98, 36);


