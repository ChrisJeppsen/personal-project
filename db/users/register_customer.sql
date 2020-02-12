insert into customers 
(email, password, admin)
values 
($1, $2, false)
returning customer_id, email;