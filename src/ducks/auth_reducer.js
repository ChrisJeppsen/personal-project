 
const initialState= {
    customer: {

    }
}

const GET_CUSTOMER = 'GET_CUSTOMER'

export const getCustomer = (customer) => {
    console.log(customer)
    return {
        type: GET_CUSTOMER,
        payload: customer
    }
}

export default function (state = initialState, action) {
    const {type, payload} = action
    switch(type){
        case GET_CUSTOMER:
            return {...state, customer: payload}
        default: 
            return state
    }
}
