const initialState= {
    products: [

    ]

}

const GET_PRODUCTS = 'GET_PRODUCTS'

export const getProducts = (products) => {
    console.log(products)
    return {
        type: GET_PRODUCTS,
        payload: products
    }
}

export default function productreducer (state = initialState, action) {
    const {type, payload} = action
    console.log(payload)
    switch(type){
        case GET_PRODUCTS:
            return {...state, products: payload}
        default:
            return state

    }
    
}