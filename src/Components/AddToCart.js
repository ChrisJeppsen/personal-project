import React, { useState } from 'react'

function AddToCart({e, qty, addToCart, handleInput}) {
    const [addToggle, setAddToggle] = useState(false)
    
    return (
        <div className='product_inner_container'>
            <img className='product_image' src={e.product_image} />
            <div className='add_to_cart'>
                {!addToggle ? (
                    <button id={e.product_id} className='add_button' onClick={() => setAddToggle(!addToggle)}>Add To Cart</button>
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