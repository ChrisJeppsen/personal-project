require('dotenv').config()
const express = require('express'),
        massive = require('massive'),
        session = require('express-session'),
        {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
        app = express(),
        authCtrl = require('./authCtrl')

        
app.use(express.json())



app.use(session({
        resave: false,
        saveUninitialized: true,
        secret: SESSION_SECRET,
        cookie: {maxAge: 1000 * 60 * 60}
}))

massive(CONNECTION_STRING).then(db => {
        app.set('db', db)
        console.log('db connected')
        app.listen(SERVER_PORT, () =>  console.log(`server connected on ${SERVER_PORT}`))
})

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/customer', authCtrl.getCustomer)
app.get('/auth/customerOnSess', authCtrl.customerOnSess)
app.post('/auth/logout', authCtrl.logout)
app.post('/auth/changePassword', authCtrl.editPassword)
app.put('/auth/editImg', authCtrl.editImg)
app.post('/auth/checkPassword', authCtrl.checkPassword)
