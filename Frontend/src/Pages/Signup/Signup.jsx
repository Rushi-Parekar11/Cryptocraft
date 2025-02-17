import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../Signup/Signup.css"
import  {toast,ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

function Signup() {

  const[SignupInfo,setSignupInfo]=useState({
    name:'',
    email:'',
    password:''
  })

  const navigate = useNavigate();

  const handleSignup= async(e)=>{
    e.preventDefault();
    const {name,email,password} =SignupInfo;
    if(!name || !email || !password){
      toast.error("Please fill in all the fields");
    }
    try {
      const url = "https://cryptocraft-backend.vercel.app/signup";
      const response = await fetch(url,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(SignupInfo)
      })
      const result = await response.json();
      const{success,message,error} = result;
      if(success){
        toast.success(message || "Something went wrong!");
        setTimeout(()=>{
          navigate('/login')
        },1000)

      }else if(error){
        const details = error?.details[0].message
        toast.error(details || "Something went wrong!")
      }else{
        toast.error(message || "signup failed")
      }
      console.log(result)
    } catch (error) {
      toast.error(error || "Something went wrong!")
    }
  }

  const handleChange=(e)=>{
    const {name,value}=e.target
    console.log(name,value)
    const copySignupInfo ={...SignupInfo};
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo)
  }


console.log(SignupInfo)
  return (
    <div>
      <div className="auth-main">
        <div className="auth-container">
      <form className="auth-form" onSubmit={handleSignup}>
        <h2 className='auth-title'>Signup</h2>
        <hr />

        <div className="auth-group">
          <label htmlFor="user-email" className='auth-label'>Username</label>
          <input type="text" onChange={handleChange} value={SignupInfo.name}
          name='name' id="user-name" placeholder="Enter your email" className='auth-input'  />
        </div>

        <div className="auth-group">
          <label htmlFor="user-email" className='auth-label'>Email</label>
          <input type="email" onChange={handleChange} value={SignupInfo.email} 
          name='email' id="user-email" placeholder="Enter your email" className='auth-input'  />
        </div>

        <div className="auth-group">
          <label htmlFor="user-password" className='auth-label'>Password</label>
          <input type="password" onChange={handleChange} value={SignupInfo.password}
           name='password' id="user-password" placeholder="Enter your password" className='auth-input'  />
        </div>

        <button type="submit" className="auth-button">Sign up</button>
        <p className="auth-link">
          Already have an account ? <Link to={'/login'}>Login</Link>
        </p>
      </form>
    </div>
        </div>
        <ToastContainer />
    </div>
  )
}

export default Signup
