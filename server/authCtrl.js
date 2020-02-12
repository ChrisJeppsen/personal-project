const bcrypt = require('bcryptjs')


module.exports = {
    getCustomer: (req, res) => {
        console.log('hit')
        if(req.session.user) {
            res.status(200).send(req.session.user)
        } else {
            res.status(200).send('no user logged in')
        }

    
    },
    register: async(req, res) => {
        const {email, password} = req.body
        const db = req.app.get('db')
        

console.log(email)

        let user = await db.users.check_customer(email)
        if(user[0]){
            console.log(user)
            return res.status(400).send('customer already exists')
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const newUser = await db.users.register_customer(email, hash)

        let userCart = await db.cart.create_order(newUser[0].customer_id);
        let sessionUser = {...newUser[0], ...userCart[0]};
        req.session.user = sessionUser
        res.status(201).send(req.session.user)
    },
    login: async(req, res) => {
        const {email, password} = req.body
        const db = req.app.get('db')
        const {session} = req

        let user = await db.users.check_customer(email)
        if(!user[0]){
            return res.status(400).send('email not found')
        }
        const authorized = bcrypt.compareSync(password, user[0].password)
        if(!authorized){
            return res.status(401).send('password is incorrect')
        }
        delete user[0].password
        session.user = user[0]
        res.status(202).send(session.user)
    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }
}