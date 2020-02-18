create table customers
customer_id serial primary key
email varchar(150)
password varchar(150);

create table customer_order
customer_order_id serial primary key
customer_id int references customers(customer_id)
paid boolean;

create table products 
product_id serial primary key
product_name varchar(150)
product_image varchar(250)
product_description varchar(150)
price decimal;

create table order_items 
order_item_id serial primary key
customer_order_id int references customers(customer_id)
product_id int references products(product_id)
qty int
price int;

insert into products
(product_name, product_image, description, price)
values
('image 1', '../../src/assets/IMG_1694_edited.jpg', 'this is a test image', 50.00);