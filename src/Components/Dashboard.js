import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import '../Styling/Dashboard.css'

function Dashboard(){

   const handleChange = () => {
        
    }
    return(
        <div>
            <div className='dashboard_header'>
                <div id='dashboard_title'>Nick's</div>
                <div id='dashboard_logo'>Logo</div>
            </div>
            <div className='dashboard_box'>
                <Link to='/about' className='dashboard_buttons'>About</Link>
                <div className="filler"></div>
            </div>
                
            <div className='dashboard_box'>
                <div className="filler"></div>
                <Link to='/products' className='dashboard_buttons'>View All</Link>
            </div>
                 
            <div className='dashboard_box'>
                <Link className='dashboard_buttons'>Order Prints</Link>
                <div className="filler"></div>
            </div>
            <div className='dashboard_box'>
                <div className="filler"></div>
                <Link className='dashboard_buttons'>Hello</Link>
            </div>
        </div>
    )
}
export default withRouter(Dashboard)