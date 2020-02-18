import React, {Component} from 'react';
 // import './App.css';
// import Dashboard from './Components/Dashboard'
import {HashRouter} from 'react-router-dom'
import Routes from './Routes'
import {Provider} from 'react-redux'
import store from './ducks/store'

 


 
class App extends Component {
  constructor(props){
    super(props)

     this.state = {}

   
  }
  render(){
    return (
     
          <Provider store={store}>
            <HashRouter>
              <div className="App">
                {/* <Dashboard/> */}
                <Routes/>
              </div>
            </HashRouter>
          </Provider>
          
    );
  }
}


export default App;
