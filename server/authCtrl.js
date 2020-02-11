const bcrypt = require('bcrypt.js')


module.exports = {
    register: async(req, res) => {
        const {email, password} = req.body
        const {db} = req.app.get('db')
        const {session} = req



        let user = await db.user.check_customer(email)
        if(user[0]){
            return res.status(400).send('customer already exists')
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        let newUser = await db.cart.create_order(newUser[0].customer_id);
        let sessionUser = {...newUser[0], ...userCart[0]};
        session.user = sessionUser
        res.status(201).send(session.user)
    },
    login: async(req, res) => {
        const {email, password} = req.body
        const {db} = req.app.get('db')
        const {session} = req

        let user = await db.user.check_customer(email)
        if(!user[0]){
            return res.status(400).send('user not found')
        }
        const authorized = bcrypt.compareSync(password, user[0])
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