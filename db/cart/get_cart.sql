select * from order_items oi 
join products p on oi.product_id = p.product_id
where oi.customer_order_id = $1;