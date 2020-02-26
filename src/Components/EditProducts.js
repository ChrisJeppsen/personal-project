import React, {useState} from 'react'
import useEditForm from '../hooks/useEditForm'
import axios from 'axios'
function EditProducts({id, image, editToggleFn}){

    const [values, handleChange] = useEditForm({
        productDescription: '',
        productPrice: ''
    })

    
    const handleSubmit = () => {
        axios.put('/api/editProducts', {id, description: values.productDescription, price: values.productPrice}).then(
            editToggleFn()
        )
    }

    return(
        <div id='container'>
            <div className='edit_img_container'>
                <img id='edit_img'src={image}></img>
            </div>
            <div className='information_container'>
                <input id='info_input'onChange={(e) => handleChange(e)} name='productDescription' value={values.productDescription} placeholder='Product Description'/>
                <input input id='info_input'onChange={(e) => handleChange(e)} name='productPrice' value={values.productPrice} placeholder='Product Price'/>
                <button onClick={() => handleSubmit(id)}>Submit</button>
                <button id='info_button'>Remove From Prints</button>
            </div>
        </div>
        
    )
}
export default EditProducts