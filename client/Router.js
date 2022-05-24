import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Register from './auth/Register'
import Login from './auth/Login'
 
function Router(){
    return(
     <BrowserRouter>
     <Switch>
        
         <Route exact path="/"><h2>Home</h2></Route>
         <Route path="/login"><Login /></Route>
         <Route path="/register"><Register /></Route>
         <Route path="/customer"><h2>Customers</h2></Route>
       
     </Switch>
     </BrowserRouter>
    )
}

export default Router