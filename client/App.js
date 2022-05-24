import React from 'react';
import Register from './auth/Register';
import Login from './auth/Login';
import {Switch,Route} from 'react-router-dom'
import Home from './auth/Home';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Protected from './auth/protected'



const App=()=> {

  return (
  <div>
    <BrowserRouter>
    <Switch>
    <Route exact path='/' component={Login} />
    <Route path='/login' component={Login} />
    <Route path='/register' component={Register} />
    <Protected exact path='/home' component={Home} />
    </Switch>
    <ToastContainer />
    </BrowserRouter>
  </div>
  );
}

export default App;
