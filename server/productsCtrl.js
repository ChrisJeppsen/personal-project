module.exports = {
    allProducts: async (req, res) => {
        const db = req.app.get('db')

        const products = await db.products.get_products()
        res.status(200).send(products)
    },
    addProducts: async (req, res) => {
        const db = req.app.get('db')
        const {productImg, name, description, price} = req.body

        product = await db.products.add_product(name, productImg, description, price)
        res.status(200).send(product)
    },
    deleteProduct: (req, res) => {
        const db = req.app.get('db')
        console.log(req.params)
        const {id} = req.params

        db.products.delete_product(id)
        res.sendStatus(200)
    },
    printsToggle: (req, res) => {
        const db = req.app.get('db')
         const {prints} = req.body
         console.log(prints)

        prints.forEach(e => {
            return db.products.prints_toggle(e)
        })
        
        res.sendStatus(200)
         
        }
         
    }

