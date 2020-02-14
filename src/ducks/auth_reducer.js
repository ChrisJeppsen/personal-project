 
const initialState= {
    customer: {

    }
}

const GET_CUSTOMER = 'GET_CUSTOMER'
const GET_CUSTOMER_ON_SESSION = 'GET_CUSTOMER_ON_SESSION'

export const getCustomer = (customer) => {
    console.log(customer)
    return {
        type: GET_CUSTOMER,
        payload: customer
    }
}
export const getCustomerOnSession = (customer) => {
    return {
        type: GET_CUSTOMER_ON_SESSION,
        payload: customer
    }
}
export default function (state = initialState, action) {
    const {type, payload} = action
    switch(type){
        case GET_CUSTOMER:
            return {...state, customer: payload}
        case GET_CUSTOMER_ON_SESSION:
            return {...state, customer: payload}
        default: 
            return state
    }
}
