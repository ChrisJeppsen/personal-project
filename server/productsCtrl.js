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
    }

}