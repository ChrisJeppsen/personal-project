import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import '../Styling/Dashboard.css'
import {connect} from 'react-redux'
import {getCustomer} from '../ducks/auth_reducer'
// import axios from 'axios'


class Dashboard extends Component{
    constructor(){
        super()

        this.state = {
            toggleProfile: false
        }
    }
componentDidMount(){
    console.log(this.props)
}
 
render(){
    
    const {customer} = this.props.customer.authreducer

        return(
            <div>
                <div className='dashboard_header'>
                    <div id='dashboard_title'>Nick's Pix</div>
                    {!customer.email ? (
                    <div>
                        <Link to='/form'><button id='dashboard_logo'>Login</button></Link>
                     </div>
                    ) : (
                    <div>
                        <div className='profile_pic' id='profile_pic' onClick={!this.state.toggleProfile}>
                            <img className='profile_img' id='profile_img'src={customer.image_url || 'https://www.ibts.org/wp-content/uploads/2017/08/iStock-476085198.jpg'}/>
                            <div id='drop_down'>
                                <div id='drop_down_filler'></div>
                                <p id='logo_script'>Profile</p>
                                <Link to='/settings'><p id='logo_script'y>Settings</p></Link>
                                 
                            </div>
                        </div>
                        {/* <button  onClick={() => axios.post('/auth/logout').then(() => this.props.history.push('/about'))}>Logout</button> */}
                    </div>
                    )}
                </div>
                <div className='dashboard_box'>
                    <Link to='/about' className='dashboard_buttons'>About</Link>
                    <div className="filler"></div>
                </div>
                    
                <div className='dashboard_box'>
                    <div className="filler"></div>
                    <Link to='/products' className='dashboard_buttons'>Gallary</Link>
                </div>
                    
                <div className='dashboard_box'>
                    <Link to='/allPrints' className='dashboard_buttons'>Prints</Link>
                    <div className="filler"></div>
                </div>
                <div className='dashboard_box'>
                    <div className="filler"></div>
                    <Link className='dashboard_buttons'>Hello</Link>
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

export default withRouter(connect(mapStatetoProps, {getCustomer})(Dashboard))