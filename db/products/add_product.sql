insert into products 
(product_name, product_image, product_description, price)
values 
($1, $2, $3, $4)
returning *