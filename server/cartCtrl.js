module.exports = {
    addToCart: async (req, res) => {
        const db = req.app.get('db')
        console.log(req.body)
        const {customer_order_id, product_id, qty, price} = req.body
         

        const cart = await db.cart.add_to_cart(customer_order_id, product_id, qty, +price)
        res.status(200).send(cart)
    }
}