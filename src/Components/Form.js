import React, { Component } from "react"
import '../Styling/Form.css'
import axios from "axios"
import {withRouter} from 'react-router-dom'
import { getCustomer } from "../ducks/auth_reducer"
import {connect} from 'react-redux'

    
class Form extends Component{
    constructor(){
        super()

        this.state = {
            email: '',
            password: ''
        }
    }

    handleInput = (e) => {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }
    handleRegister = () => {
        const {email, password} = this.state
        axios.post('/auth/register', {email, password}).then(res => {
            getCustomer(res.data)
            this.props.history.push('/')
            this.setState({
                email: '',
                password: ''
            })
        })
    }
    handleLogin = () => {
        const {email, password} = this.state
        axios.post('/auth/login', {email, password}).then (res => {
            this.props.getCustomer(res.data)
            this.props.history.push('/')
            this.setState({
                email: '',
                password: ''
            })
        })
    }
    render(){
        return(
            <div className= 'form_container'>
                <div className = 'form_box'>
                    <div id='login'>Login</div>
                    <div id='email_password_box'>
                        <input onChange={(e) => this.handleInput(e)} value={this.state.email} name='email' placeholder='Email'/>
                        <input onChange={(e) => this.handleInput(e)} type='password' value={this.state.password} name='password'placeholder='Password'/>
                        <button onClick={() => this.handleRegister()}>Register</button>
                        <button onClick={() => this.handleLogin()}>Login</button>
                    </div>

                </div>
            </div>
        )
    }
}
export default connect(null, {getCustomer})(withRouter(Form))