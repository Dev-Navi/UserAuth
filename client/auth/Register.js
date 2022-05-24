import React from 'react'
import {Link} from 'react-router-dom';
import {useFormik} from 'formik'

import * as yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'



function Register(props){

// const [name,setName]=useState("")
// const [email,setEmail]=useState("");
// const [password,setPassword]=useState("");
// const [confirmPassword,setconfirmPassword]=useState("");

const formik=useFormik({
    initialValues:{
    name:'',
    email:'',
    password:'',
    confirmPassword:''
  },
  validationSchema:yup.object({
    name:yup.string()
    .required('Name is required')
    .min(3,'Minimum 3 Char'),
    email:yup.string()
    .email()
    .required("Email is Required"),
    password:yup.string()
    .required("Password Required"),
    confirmPassword:yup.string()
    .oneOf([yup.ref('password'),null],"Confirm Password must be same in password")
    .required("Confirm Password Required")
  }),

  onSubmit:(data)=>{
    console.log(data);
    axios.post(`http://localhost:5000/api/register`,data)
    .then(res=>{
        props.history.push('/login');
    }).catch(err=>{
toast.error(err.response.data)
    })

    

  }  
  });


return(
    <div className="App container" style={{marginTop: "30px"}}>
    <div className='p-5 mb-4 bg-light rounded-3'>
      <h2 style={{textAlign:'center'}}>Register Form</h2><br/>
    <div className='form-group'>
    <form onSubmit={formik.handleSubmit}>
      <label>Name</label>
      <input className='form-control' type="text" onChange={formik.handleChange} name="name" value={formik.values.name}/>
      {formik.errors.name ? <div className='text-danger'>{formik.errors.name}</div>:null} 
      <br />
      <label>E-mail</label>
      <input className='form-control' type="email" onChange={formik.handleChange} name="email" value={formik.values.email}/>
      {formik.errors.email ? <div className='text-danger'>{formik.errors.email}</div>:null} 
      <br />
      <label>Password</label>
      <input className='form-control' type="password" onChange={formik.handleChange} name="password" value={formik.values.password}/>
      {formik.errors.password ? <div className='text-danger'>{formik.errors.password}</div>:null} 
      <br/>
      <label>Confirm Password</label>
      <input className='form-control' type="password" onChange={formik.handleChange} name="confirmPassword" value={formik.values.confirmPassword}/>
      {formik.errors.confirmPassword ? <div className='text-danger'>{formik.errors.confirmPassword}</div>:null} 
      <br/>
      <button type="submit" className='btn btn-primary'>Submit</button>
      <Link to="/login"><button style={{float:'right'}} className='btn btn-link'>Login</button></Link>
    </form>
    </div>
    </div>
  </div>
)

}

export default Register
