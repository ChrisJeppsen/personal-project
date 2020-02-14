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
    },
    editPassword: async (req, res) => {
        const db = req.app.get('db')
        const {newPassword} = req.body

        if(req.session.user){
            
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(newPassword, salt)
            const user = await db.users.edit_customer(hash)

            delete user[0].password
            res.status(200).send(req.session.user)
            
        }
    },
    editImg: async (req, res) => {
        const db = req.app.get('db')
        const {profileImg} = req.body
        if(req.session){
            console.log(req.session)
        const id = req.session.user.customer_id

        req.session.user.image_url = profileImg
        console.log(req.session)
        await db.users.edit_profile_img(profileImg, id)
        res.status(200).send(req.session.user)
        }
        // res.status(400).send('no session found')
    },
    checkPassword: async (req, res) => {
        const db = req.app.get('db')
        const {currentPassword} = req.body
        console.log(currentPassword)
        const {email} = req.session.user

        const user = await db.users.check_customer(email)
        const authorized = bcrypt.compareSync(currentPassword, user[0].password)
        if(!authorized){
             res.status(200).send('password does not match')
        }
        delete user[0].password
        req.session.user = user
        res.status(200).send(req.session.user)
    },
    customerOnSess: (req, res) => {
        if(req.session){
            res.status(200).send(req.session.user)
        } else {
        res.status(400).send('no user logged in')
        }
    }
}