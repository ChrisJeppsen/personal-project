update customers 
set password = $1
returning *;
    