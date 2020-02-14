import React, {Component} from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getCustomer} from '../ducks/auth_reducer'
import '../Styling/ProfileForm.css'
import axios from 'axios';



class ProfileForm extends Component{
    constructor(){
        super()

        this.state = {
            input: '',
            profileImg: '',
            currentPassword: '',
            newPassword: '',
            passwordToggle: false
        }
    }
    
    
    handleInput = (e) => {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    handleImgSubmit = () => {
        const {profileImg} = this.state
        axios.put('/auth/editImg',{profileImg}).then(res => {
           this.props.getCustomer(res.data)
           this.setState({
               profileImg: ''
           })
           this.props.history.push('/')
        })
    }
    checkPassword = () => {
        const {currentPassword, passwordToggle} = this.state
        console.log(currentPassword)
        axios.post('/auth/checkPassword', {currentPassword}).then(res => {
            this.setState({
                input: '',
                currentPassword: '',
                passwordToggle: !passwordToggle
            })
        })
    }
    changePassword = () => {
        const {newPassword} = this.state
        axios.post('/auth/changePassword', {newPassword}).then(res => {
            this.setState({
                input: '',
                newPassword: ''
            })
            this.props.history.push('/settings')
            alert('password successfully changed')
        })
    }
    render(){
        return(
            <div className='profile_form'>
                <div className='settings_form'>
                    <div className='profile_pic'>
                        <img className='profile_img' src={this.props.customer.authreducer.customer.image_url || 'https://www.ibts.org/wp-content/uploads/2017/08/iStock-476085198.jpg'}/>        
                    </div> 
                    <div className='profile_change_container'>
                        <input onChange={(e) => this.handleInput(e)} name='profileImg' value={this.state.profileImg} placeholder='Profile Image Url' className= 'profile_change_inputs'/>
                        <button onClick={() => this.handleImgSubmit(this.state.profileImg)}>Submit</button>
                         {!this.state.passwordToggle ? (
                        <div>

                            <input onChange={(e) => this.handleInput(e)} placeholder='Current Password'className= 'profile_change_inputs' name='currentPassword' value={this.state.currentPassword}/>
                            <button onClick={() => this.checkPassword()}>Check</button>
                        </div>
                         ) : (
                        <div>
                            <input onChange={(e) => this.handleInput(e)} name='newPassword' value={this.state.newPassword}/>
                            <button onClick={() => this.changePassword()}>Submit</button>
                        </div>
                         )}
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
 
