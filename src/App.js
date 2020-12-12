import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Login from './Components/Login'
import Logout from './Components/Logout'
import Admin from './Components/Admin'
import Page from './Components/Page'
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/admin' component={Admin} />
          <Route path='/logout' component={Logout} />
          <Route path='/page' component={Page} />


        </ Switch >
      </BrowserRouter>
    );
  }
}
export default App;
