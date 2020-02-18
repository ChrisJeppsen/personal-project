import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProducts} from '../ducks/product_reducer'
import {getCustomer} from '../ducks/auth_reducer'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import '../Styling/Gallery.css'
import { render } from '@testing-library/react'
 
class Gallery extends Component{
    constructor(props){
        super(props)

        this.state = {
            name: '',
            description: '',
            price: 0,
            productImg: '',
             

        }
    }

    componentDidMount(){
        axios.get('/api/products').then(res =>{
            this.props.getProducts(res.data)
              
        })
         
    }

    handleInput = (e) => {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }
    handleSubmit = () => {
        const {name, productImg, description, price} = this.state
        axios.post('/api/addProducts', {name, productImg, description, price}).then(res => {
            this.props.history.push('/gallery')
        })
    }
    
    getSignedRequest = ([file]) => {
        this.setState({isUploading: true})
    
       const fileName = `nix-pix-products-${file.name.replace(/\s/g, '-')}`

       axios.get(`/sign-s3?file-name=${fileName}&file-type=${file.type}`)

    
       axios.get('/sign-s3', {
         params: {
           'file-name': fileName,
           'file-type': file.type
         }
       }).then( (response) => {
         const { signedRequest, url } = response.data 
         console.log(response.data)
         this.setState({
             productImg: url
         })
         this.uploadFile(file, signedRequest, url)
       }).catch( err => {
        })
    }
    uploadFile = (file, signedRequest, url) => {
       const options = {
         headers: {
           'Content-Type': file.type,
         },
       };
   
       axios
         .put(signedRequest, file, options)
         .then(response => {
           this.setState({ isUploading: false, url });
           // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
         })
         .catch(err => {
           this.setState({
             isUploading: false,
           });
           if (err.response.status === 403) {
             alert(
               `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
                 err.stack
               }`
             );
           } else {
             alert(`ERROR: ${err.status}\n ${err.stack}`);
           }
         });
     };
     render(){ 
        
            const product = this.props.products.map((e, i) =>  (

                    <div className='gallery_container'>
                         <img className='gallery_img' src={e.product_image}/>
                    </div>
                ))
             return (
                  
                    <div>
                        {this.props.customer.admin === true ? (
                        <div> 
                        <input onChange={(e) => this.handleInput(e)} name='name' value={this.state.name}/>
                        <input type='file' onChange={(e) => this.getSignedRequest(e.target.files)}/>
                        <input onChange={(e) => this.handleInput(e)} name='description' value={this.state.description}/>
                        <input onChange={(e) => this.handleInput(e)} name='price' value={this.state.price}/>
                        <button onClick={() => this.handleSubmit()}>add photo</button>
                        <div className='gallery_container' > 
                            <div >{product} </div>
                            <button>edit</button>
                            <button>delete</button>
                        </div>
                        </div>
                        ) : (
                        
                        <div className='gallery_container' > 
                            <div >{product} </div>
                        </div>
                         
                        
                        ) }
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
export default withRouter(connect(mapStateToProps, {getProducts, getCustomer})(Gallery))