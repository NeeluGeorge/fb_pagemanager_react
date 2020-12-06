import React from 'react'
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom'

import './App.css';
import Login from './Components/Login'
import Logout from './Components/Logout'
import Admin from './Components/Admin'
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/admin' component={Admin} />
          <Route path='/logout' component={Logout} />

        </ Switch >
      </BrowserRouter>
    );
  }
}
export default App;
