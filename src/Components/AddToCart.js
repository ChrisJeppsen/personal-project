import React, { useState } from 'react'
import { PresignedPost } from 'aws-sdk/clients/s3'

function AddToCart({ e, qty, addToCart, handleInput, customer, handleEditToggleFn }) {
    const [addToggle, setAddToggle] = useState(false)

    return (
        <div className='product_inner_container'>
            <img className='product_image' src={e.product_image} />
            <div className='add_to_cart'>
                {!addToggle ? (
                    <div>
                        <button id={e.product_id} className='add_button' onClick={() => setAddToggle(!addToggle)}>Add To Cart</button>
                        {customer.admin && (<button onClick={() => handleEditToggleFn(e.product_id, e.product_image)}>Edit</button>)}
                    </div>

                ) : (
                        <div>
                            <input name='qty' value={qty} placeholder='quantity' onChange={(e) => handleInput(e)} />
                            <button onClick={() => addToCart(e.product_id, e.price)}>prints</button>
                        </div>
                    )}
            </div>
        </div>
    )
}
export default AddToCart

