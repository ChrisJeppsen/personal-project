require('dotenv').config()
const express = require('express'),
        massive = require('massive'),
        session = require('express-session'),
        {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
        app = express(),
        authCtrl = require('./authCtrl')
        productCtrl = require('./productsCtrl')
        cartCtrl = require('./cartCtrl')

        
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

//AUTH ENDPOINTS

const aws = require('aws-sdk');

const {
    S3_BUCKET,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY
} = process.env

app.get('/sign-s3', (req, res) => {

  aws.config = {
    region: 'us-west-1',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  }
  
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
       return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };

    return res.send(returnData)
  });
});


app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.post('/auth/checkPassword', authCtrl.checkPassword)
app.post('/auth/logout', authCtrl.logout)
app.post('/auth/changePassword', authCtrl.editPassword)
app.get('/auth/customer', authCtrl.getCustomer)
app.get('/auth/customerOnSess', authCtrl.customerOnSess)
app.put('/auth/editImg', authCtrl.editImg)

//PRODUCT ENDPOINTS

app.get('/api/products', productCtrl.allProducts)
app.post('/api/addProducts', productCtrl.addProducts)
app.delete('/api/deleteProduct/:id', productCtrl.deleteProduct)
app.post('/api/printsToggle', productCtrl.printsToggle)
app.put('/api/editProducts', productCtrl.editProducts)

//CART ENDPOINTS 

app.post('/api/addToCart', cartCtrl.addToCart)
app.post('/api/payment', cartCtrl.payment)
app.get('/api/cart/:id', cartCtrl.getCart)
app.delete('/api/deleteItem/:id', cartCtrl.deleteItem)


