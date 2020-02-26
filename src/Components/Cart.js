import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {getProducts} from '../ducks/product_reducer'
import {getCustomer} from '../ducks/auth_reducer'
import { render } from '@testing-library/react'
import axios from 'axios'
import {connect} from 'react-redux';
import '../Styling/Cart.css';
import stripeKey from './StripeKey'
import StripeCheckout from 'react-stripe-checkout'

class Cart extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            cart: [],
            totalPrice: null
        }
    }

    componentDidMount(){
        console.log(this.props)
        const {customer_order_id} = this.props.customer

        
         axios.get(`/api/cart/${customer_order_id}`).then(res => {
             console.log(res.data)
             this.setState({
                cart: res.data
            })
            this.getTotal()
        })
    }
    getTotal = () => {
        const {cart} = this.state;
        const total = cart.reduce((acc, cur) => parseFloat(acc) + parseFloat(cur.price * cur.qty), 0)
        this.setState({totalPrice: total})
    }
    onToken = (token) => {
        token.card = void 0
        let cost = this.state.totalPrice.toFixed(2)
        console.log(cost)
        axios.post('/api/payment', {token, amount: cost, customer_order_id: this.props.customer.customer_order_id, customer_id: this.props.customer.customer_id}).then(res => {
            this.props.getCustomer(res.data)
            alert('payment complete')
            this.props.history.push('/allPrints')
        })
    }
    render(){

        const mappedCart = this.state.cart.map((e, i) => {
            return(
                <div className='cart_container'>
                    <div className='img_container'>
                        <img src={e.product_image}/>
                    </div>
                    <div className='info_container'>
                        <p>Price: ${e.price * e.qty}</p>
                        <p>Quantity: {e.qty}</p>
                        <button>Remove</button>
                    </div>
                </div>
            )
        })
        
         
        return(
            <div className='all_container'> 
                <div>Your Cart</div>
                {mappedCart}
                <div>Total: ${this.state.totalPrice}</div>
                {/* <div  className='purchase'> Purchase</div> */}
                <StripeCheckout 
                className='purchase' 
                token={this.onToken} 
                stripeKey='pk_test_hnvj6el1mybT3XWAU47a8GFP00b9hNCl3F'
                amount={this.state.price *100}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return ({
        products: state.productreducer.products,
        customer: state.authreducer.customer
    })
}   

export default withRouter(connect(mapStateToProps, {getProducts, getCustomer})(Cart))