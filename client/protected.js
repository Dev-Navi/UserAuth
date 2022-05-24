import React from "react";
import { Redirect, Route } from "react-router-dom";


const Protected=({component,...rest})=>{
    // console.log(RenderdComponent);
    // console.log(rest);
    var RenderdComponents = component;
    let hasToken=JSON.parse(localStorage.getItem('auth'));
  
return(
<Route 
{...rest}
render={props=>{
       return hasToken !== null ? (
       <RenderdComponents {...props}/>
       )
        : (
        <Redirect 
               to={{
                   pathname:"/login"
                }}
            />
        )
    }
}
/>
)
}

export default Protected;