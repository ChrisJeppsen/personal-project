
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { getProducts } from '../ducks/product_reducer'
import { connect } from 'react-redux'
import '../Styling/Products.css'
import axios from 'axios'
import AddToCart from './AddToCart'
import EditProducts from './EditProducts'

class Products extends Component {
    constructor(props) {
        super(props)

        this.state = {
            addToggle: false,
            qty: '',
            editToggle: false
        }
    }
    componentDidMount() {
        axios.get('/api/products').then(res => {
            console.log(res.data)
            this.props.getProducts(res.data)
        })
    }
    handleToggle = (id, ) => {
        this.setState({
            addToggle: !this.state.addToggle
        })
    }
    handleEditToggle = (id, image) => {

        this.setState({
            editToggle: !this.state.editToggle,
            id,
            image
        })
    }

    handleInput = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    addToCart = (product_id, price) => {
        const { customer_order_id } = this.props.customer
        const { qty } = this.state
        {
            this.props.customer.email ? (
                axios.post('/api/addToCart', { customer_order_id, product_id, qty, price }).then(res => {
                    this.setState({
                        qty: ''
                    })
                    this.props.history.push('/cart')
                })
            ) : (
                    this.props.history.push('/form')
                )
        }
    }
    render() {
        //maps over products where prints boolean is true
        const image = this.props.products.map((e, i) => {
            if (e.prints) {
                return (
                    <div className='product_inner_container'>
                        <img className='product_image' src={e.product_image} />
                        <div className='add_to_cart'>
                            {!this.state.addToggle ? (
                                // this.props.customer.admin === 'true'
                                true ?
                                    <div>
                                        {/* <button id={e.product_id} className='add_button' onClick={() => this.handleToggle()}>Add To Cart</button> */}
                                        <button >Edit</button>
                                    </div>
                                    : <button id={e.product_id} className='add_button' onClick={() => this.handleToggle()}>Add To Cart</button>

                            ) : (
                                    <div>
                                        <input name='qty' value={this.state.qty} placeholder='quantity' onChange={(e) => this.handleInput(e)} />
                                        <button onClick={() => this.addToCart(e.product_id, e.price)}>prints</button>
                                    </div>
                                )}
                        </div>
                    </div>
                )
            }
        })
        console.log(this.state.editToggle)
        return (

            <div>
                <div className='product_container'>
                    <button onClick={() => this.props.history.push('/')}id='product_back_button'>Back</button>
                    {this.props.products.map((e, i) => (
                        <>
                            {e.prints && (
                                <AddToCart
                                    handleEditToggleFn={this.handleEditToggle}
                                    customer={this.props.customer}
                                    e={e} key={e.product_id}
                                    handleInput={this.handleInput}
                                    addToCart={this.addToCart}
                                />
                            )}</>
                    ))}
                </div>
                {this.state.editToggle && (
                    <EditProducts
                        id={this.state.id}
                        image={this.state.image}
                        editToggleFn={this.handleEditToggle} />
                )}
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


export default withRouter(connect(mapStateToProps, { getProducts })(Products))