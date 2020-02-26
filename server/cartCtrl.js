stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
module.exports = {
    addToCart: async (req, res) => {
        const db = req.app.get('db')
        // console.log(req.body)
        const {customer_order_id, product_id, qty, price} = req.body
         

        const cart = await db.cart.add_to_cart(customer_order_id, product_id, qty, +price)
        res.status(200).send(cart)
    },
    deleteItem: async(req, res) => {
        const db = req.app.get('db')
        console.log(req.params)
        const {id} = req.params
        
        const cart = await db.cart.delete_from_cart(id)
        console.log
        res.status(200).send(cart)
    },
    getCart: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        // console.log(req.params)
        const cart = await db.cart.get_cart(id)
        res.status(200).send(cart)
    },
    payment: (req, res, next) => {
        // console.log(req.body)
        const amountArray = req.body.amount.toString().split('')
        const pennies = []
        for(var i = 0; i < amountArray.length; i++){
            if(amountArray[i] ==="."){
                if(typeof amountArray[i + 1] === 'string'){
                    pennies.push(amountArray[i+1])
                }else{
                    pennies.push('0')
                }
                if(typeof amountArray[i + 2]==='string'){
                    pennies.push(amountArray[i+2])
                }else{
                    pennies.push('0')
                }
                break;
            } else {
                pennies.push(amountArray[i])
            } 
        }
        const convertedAmt = parseInt(pennies.join(''))
        // console.log(convertedAmt)
        const charge = stripe.charges.create({
            amount: convertedAmt,
            currency: 'usd',
            source: req.body.token.id,
            description: 'test charge for react app'
        }, function(err, charge){
            // console.log(req.session.user)
            if(err) return res.sendStatus(500)
                const {customer_order_id, customer_id} = req.body
                const db = req.app.get('db')
                db.cart.cart_paid(customer_order_id, customer_id).then(cart => {
                    req.session.user.customer_order_id = cart[0].customer_order_id
                    // console.log(req.session.user)
                    res.status(200).send(req.session.user)
                })
        })
    }
}