import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import About from './Components/About'
import Products from './Components/Products'
import Cart from './Components/Cart'

export default (
    <Switch>
        <Route exact path ='/' component={Dashboard}></Route>
        <Route path ='/about' component={About}></Route>
        <Route path = '/cart' component={Cart}></Route>
        <Route path = '/products' component={Products}></Route>
    </Switch>
)