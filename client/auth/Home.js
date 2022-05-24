import React from 'react'

const Home=(props)=>{
return(
 <div>
     <h1>Hello User</h1>
     <button onClick={()=>{localStorage.clear();
         props.history.push('/login')}} className='btn btn-primary'>Logout</button>
 </div>
)
}

export default Home
