import React, { Component } from 'react'
import '../Styling/About.css'
import {withRouter} from 'react-router-dom'

class About extends Component{
    constructor(){
        super()

        this.state ={
            aboutContainer: 'slide_open'
        }
    }
    componentDidMount(){
         setTimeout(() => {this.setState({
            aboutContainer: 'slide_open open'
        })}, 100);
        
     }
    componentWillUnmount() {
        this.setState({
            aboutContainer: 'slide_open closed'
        })
    }
    render(){
    return(
        <div className={this.state.aboutContainer}>
            <div className='about_header'>
            <h4>About Nick</h4>
            <div id='about_logo'></div>
            <button onClick={ () => {
                             this.setState({ aboutContainer: 'slide_open' },()=> setTimeout(()=> this.props.history.push('/'), 50))}}>About</button>
            </div>
             
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Laoreet id donec ultrices tincidunt. Etiam non quam lacus suspendisse faucibus interdum posuere lorem. Sed nisi lacus sed viverra tellus in. Sed id semper risus in hendrerit gravida. Mauris cursus mattis molestie a iaculis at erat pellentesque. Viverra maecenas accumsan lacus vel facilisis volutpat. Integer quis auctor elit sed vulputate mi sit amet mauris. Et sollicitudin ac orci phasellus. Auctor elit sed vulputate mi sit amet mauris. Porttitor rhoncus dolor purus non enim praesent elementum. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. Venenatis lectus magna fringilla urna. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut. Auctor urna nunc id cursus metus aliquam. Orci a scelerisque purus semper eget. Ac auctor augue mauris augue neque gravida in fermentum et.
            </p>

        </div>
        )
    }
}
export default withRouter(About)