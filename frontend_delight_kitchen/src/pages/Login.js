import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { URL } from '../config';
import '../css/Login.css'
//The necessary modules are imported. These include React, the useState hook, useNavigate from react-router, toast from react-toastify, axios for making API requests, and some custom imports for URLs and CSS.


const Login = () => {

const[email,setEmail]=useState("");
const[password,setPassword]=useState("");
//Two state variables, email and password, are defined using the useState hook to store the values entered in the email and password input fields.

const navigate = useNavigate()  // Navigation function from React Router


const LoginFunction=()=>
{
    if (email.length == 0) {
      toast.warning('please enter email')
    } 
    else  if(!email.includes("@"))
    {
      toast.warning('please enter correct email')
    }
    else if (password.length == 0) {
      toast.warning('please enter password')
    } 
    else {

     
        const body = {
          email,
          password,
        }
         axios.post(`${URL}/users/login`,body).then((response)=>
         {
          const result = response.data
          if (result['status'] == 'success') {
            toast.success('Welcome to the application')
            const { userId, name, email,phone,role } = result['data']
            sessionStorage['userId'] = userId
            sessionStorage['name'] = name
            sessionStorage['email'] = email
            sessionStorage['phone'] = phone
            sessionStorage['role'] = role
            sessionStorage['loginStatus'] = 1
            navigate('/home')
          }
          else
          {
           
            toast.error(result['error'])
          }
         })
        
      }
     
}
//The LoginFunction is defined, which is intended to be called when the "Login" button is clicked.
//This function checks for valid email and password inputs and, if valid, sends a POST request to a login API endpoint using Axios.
//If the login is successful (result['status'] is 'success'), user data is stored in the sessionStorage, a success toast is displayed, and the user is navigated to the '/home' route.
//If the login fails, an error toast is displayed.

  return (
   
<div className='container' id='maincontainer'>

    <div className="row">
        <div className="col" id='divlogin'>
        <div className="col" id='divheading'>
        <span className='text-secondary'>Delight Kitchen</span>
        </div>
        <hr/>
        <div >
    <h2></h2>
    <form > 

    <div className="form-outline mb-4">
    <label  className="form-label" htmlFor="typeEmailX-2">Email</label>
                <input onChange={(e)=>{setEmail(e.target.value)}} type="email"  className="form-control form-control-lg" placeholder='abc@gmail.com'  />
                
                </div>

                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                <input onChange={(e)=>{setPassword(e.target.value)}} type="password"  className="form-control form-control-lg" placeholder='**********'  />
                
                </div>        
    </form>
    <button  onClick={LoginFunction} className="btn btn-primary btn-lg btn-block" >Login</button>
    </div>
        </div>
        <div className="col" id='divimage'>
  
        </div>
    </div>
</div>
//The email and password fields are controlled by the useState variables.
//The "Login" button triggers the LoginFunction when clicked.
   
  )
}

export default Login