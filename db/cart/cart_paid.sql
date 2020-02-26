update customer_order
set paid = true
where customer_order_id = $1;

insert into customer_order 
(customer_id, paid)
values
($2, false)
returning customer_order_id, paid