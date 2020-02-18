module.exports = {
    allProducts: async (req, res) => {
        const db = req.app.get('db')

        const products = await db.products.get_products()
        res.status(200).send(products)
    }

}