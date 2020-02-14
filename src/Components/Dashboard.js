import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import '../Styling/Dashboard.css'
import {connect} from 'react-redux'
import {getCustomer, getCustomerOnSession} from '../ducks/auth_reducer'
import axios from 'axios'
import {FiLogOut} from 'react-icons/fi'
import backgroundImg from '../assets/IMG_1694_edited.jpg'



class Dashboard extends Component{
    constructor(){
        super()

        this.state = {
            dropDownClass: 'drop_down'
        }
    }
// componentDidUpdate(){
//     console.log('hit cdm');
    
//     axios.get('/auth/customerOnSess').then(res => {
//         getCustomerOnSession(res.data)
//     })
// }
toggleDropDown = () => {
        if(this.state.dropDownClass === 'drop_down'){
        this.setState({
            dropDownClass: 'drop_down drop_open'
        })
    } else {
        this.setState({
            dropDownClass: 'drop_down'
        })
    }
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
                        <FiLogOut id='logout_icon'/>

                        <div className='profile_pic' id='profile_pic'>
                             <img onClick={() => this.toggleDropDown()}className='profile_img' id='profile_img'src={customer.image_url || 'https://www.ibts.org/wp-content/uploads/2017/08/iStock-476085198.jpg'}/>
                            <div className={this.state.dropDownClass}>
                                <div id='drop_down_filler'></div>
                                <p id='logo_script'>Profile</p>
                                <Link to='/settings'><p id='logo_script'>Settings</p></Link>
                                <Link onClick={() => axios.post('/auth/logout').then(() => this.props.history.push('/form'))}><p id ='logo_script'>Logout</p></Link>
                                 
                            </div>
                        </div>
                        {/* <button  onClick={() => axios.post('/auth/logout').then(() => this.props.history.push('/about'))}>Logout</button> */}
                    </div>
                    )}
                </div>
                
                <div id='background_img'>
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