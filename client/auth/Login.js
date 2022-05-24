import React from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios'
import {useFormik} from 'formik'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 
import * as yup from 'yup';


function Login(props){

    // const [email,setEmail]=useState("");
    // const [password,setPassword]=useState("");
    
    const formik=useFormik({
        initialValues:{
        email:'',
        password:'',
      },
      validationSchema:yup.object({
        email:yup.string()
        .email()
        .required("Email is Required"),
        password:yup.string()
        .required("Password Required"),
      }),
      onSubmit:(data)=>{
        console.log(data);
        axios.post('http://localhost:5000/api/login',data)
        .then(res=>{
          localStorage.setItem('auth',JSON.stringify(res.data))
            props.history.push('/home');
        }).catch(err=>{
    toast.error(err.response.data)
        })

      }  
      })



    return(
        <div className="App container" style={{marginTop: "30px"}}>
        <div className='p-5 mb-4 bg-light rounded-3'>
          <h2 style={{textAlign:'center'}}>Login Form</h2><br/>
        <div className='form-group'>
        <form onSubmit={formik.handleSubmit}>
        
          <label>E-mail</label>
          <input className='form-control' type="email" onChange={formik.handleChange} name="email" value={formik.values.email}/>
          {formik.errors.email ? <div className='text-danger'>{formik.errors.email}</div>:null} 
          <br />
          <label>Password</label>
          <input className='form-control' type="password" onChange={formik.handleChange} name="password" value={formik.values.password}/>
          {formik.errors.password ? <div className='text-danger'>{formik.errors.password}</div>:null} 
          <br/>
         
          <button type="submit" className='btn btn-primary'>Login</button>
          <Link to="/register"><button style={{float:'right'}} className='btn btn-link'>Register</button></Link>
        </form>
        </div>
        </div>
      </div>
    )
    
  
    }


export default Login
