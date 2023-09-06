import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import '../css/Logout.css'
    //  The import statements at the beginning of the file are used to import necessary modules and resources for the component.
const Logout = () => {

    const navigate = useNavigate()
    const LogoutFunction=()=>
{
    //The useNavigate hook from the react-router library is used to get the navigate function, which allows you to navigate to different routes.
 
}

useEffect(() => {
    sessionStorage['userId'] = 0
    sessionStorage['name'] = null
    sessionStorage['email'] = null
    sessionStorage['phone'] = null
    sessionStorage['profileImage'] = null
    sessionStorage['role'] = null
    sessionStorage['loginStatus'] = 0
    //toast.success("Logged Out Successfully")
    navigate('/login')
   
//The useEffect hook is used to perform side effects when the component mounts. In this case, it's clearing user-related data from the sessionStorage object, displaying a success toast notification, and navigating to the '/login' route.
   //Inside the useEffect hook, various properties in the sessionStorage object are updated to reset user-related data, including user ID, name, email, phone, profile image, role, and login status.
 
}, [])
  return (
    <div>
        <div className='container' id='maincontainer'> 
        
         <div className="subelements">
        

          <div className="subelementimg">
            <img src='https://cdn.iconscout.com/icon/free/png-256/unlock-unsecure-protect-theft-7-16391.png'></img>
          </div>
           

          <div className="subelementtext">
                <p className='logouttext'>Logged Out</p>
            <button class="btn btn-primary btn-lg btn-block" onClick={LogoutFunction}>Click me</button>
         
           </div>
         </div>
        </div>

    </div>
  )
}
       //The Logout component is exported to be used in other parts of the application.


export default Logout