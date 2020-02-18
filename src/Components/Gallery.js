import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import {getProducts} from '../ducks/product_reducer'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
 
const Gallery = (props) => {
    useEffect(() => {
        axios.get('/api/products').then(res => {
            
            props.getProducts(res.data)
        })
    }, [])
    
     return(
        <div>
            {props.products.map((e, i) => {
                // const path = './IMG_1694_edited.jpg'
                //  const image = require(path)
                return (
                    <div>
                        <div> 
                         <div >{e.product_name} </div>
                         </div>
                        <button className='cart_button'>Add to Cart</button>
                    </div> 
                )
            })}
         </div>
    )
}

function mapStateToProps(state) {
     return ({
        products: state.productreducer.products
    })
}
export default withRouter(connect(mapStateToProps, {getProducts})(Gallery))