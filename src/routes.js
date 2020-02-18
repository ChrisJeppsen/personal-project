import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import About from './Components/About'
import Products from './Components/Products'
import Cart from './Components/Cart'
import Form from './Components/Form'
import ProfileForm from './Components/ProfileForm'
import Gallery from './Components/Gallery'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import './Styling/transitions.css'
import {withRouter} from 'react-router-dom'

class Routes extends Component{
    constructor(props){
        super(props)
            
        this.state = {
                prevDepth: this.getPathDepth(this.props.location)
            
        }
    }

    componentWillReceiveProps() {
        this.setState({prevDepth: this.getPathDepth(this.props.location)});
      }
    
    getPathDepth(location) {
          console.log(location)
        let pathArr = location.pathname.split('/')
        pathArr = pathArr.filter(n => n !== '');
        return pathArr.length;
    }

    render(){
    const {location} = this.props
    const currentKey = location.pathname.split("/")[1] || "/";
    const timeout = {enter: 500, exit: 200}

        return(
            <TransitionGroup component='div' className='App'>
                <CSSTransition key ={currentKey} timout={timeout} classNames="pageSlider" mountOnEnter={false} unmountOnExit={true}> 
                <div className={this.getPathDepth(location) - this.state.prevDepth >= 0 ? "left": "right"}> 
                    <Switch location={location}>
                        <Route exact path ='/' component={Dashboard}></Route>
                        <Route path ='/about' component={About}></Route>
                        <Route path = '/cart' component={Cart}></Route>
                        <Route path = '/products' component={Products}></Route>
                        <Route path = '/form' component={Form}></Route>
                        <Route path = '/settings' component={ProfileForm}></Route>
                        <Route path = '/gallery' component={Gallery}></Route>

                    </Switch>
                    </div>
                </CSSTransition>
            </TransitionGroup>
        )
    }
} 
export default withRouter(Routes)