import React, {Component} from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getCustomer} from '../ducks/auth_reducer'
import '../Styling/ProfileForm.css'



class ProfileForm extends Component{
    constructor(){
        super()

        this.state = {
            input: ''
        }
    }
    render(){
        return(
            <div className='profile_form'>
                <div className='settings_form'>
                    <div className='profile_pic'>
                        <img className='profile_img' src={this.props.customer.image_url || 'https://www.ibts.org/wp-content/uploads/2017/08/iStock-476085198.jpg'}/>        
                    </div> 
                    <div className='profile_change_container'>
                        <input placeholder='Profile Image Url' className= 'profile_change_inputs'/>
                        <input placeholder='Email'className= 'profile_change_inputs'/>
                        <input placeholder='Password'className= 'profile_change_inputs'/>
                    </div>                
                </div>
            </div>
        )
    }
}

function mapStatetoProps(state){
    return({
        customer: state
    })
}

export default withRouter(connect(mapStatetoProps, {getCustomer})(ProfileForm))
 
