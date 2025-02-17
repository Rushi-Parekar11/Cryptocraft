import React, { useState } from 'react'
import "../Login/Login.css"
import Signup from '../Signup/Signup'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import  {toast,ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";


function Login() {
  const [loginInfo,setloginInfo] = useState({
    email:'',
    password:''
  })
  const navigate = useNavigate();

  const Handlechange=(e)=>{
    const {name,value} = e.target;
    const copyLoginInfo ={...loginInfo}
    copyLoginInfo[name]=value;
    setloginInfo(copyLoginInfo);
  }


  const HandelLogin= async(e)=>{
    e.preventDefault();
    const {email,password}= loginInfo;
    if(!email || !password){
      toast.error("Please fill in all the fields")
    }

    try {
      const url = "https://cryptocraft-backend.vercel.app/login";
      const response = await fetch(url,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(loginInfo)
      })

        const result = await response.json();
            const{success,message,jwtToken,name,error} = result;
            if(success){
              toast.success(message || "Something went wrong!");
              localStorage.setItem('token',jwtToken);
              localStorage.setItem('LoggedInUser',name);



              setTimeout(()=>{
                navigate('/')
                window.location.reload();
              },1000)
      
            }else if(error){
              const details = error?.details[0].message
              toast.error(details || "Something went wrong!")
            }else{
              toast.error(message || "signup failed")
            }

    } catch (error) {
      
    }
  }

  console.log(loginInfo)

  return (
    <>
        <div className="loginmain">
        <div className="login-container">
      <form className="login-form" onSubmit={HandelLogin}>
        <h2 className='loginH2'>Login</h2>
        <hr />
        <div className="form-group">
          <label htmlFor="email" className='loginlabel'>Email</label>
          <input type="email" id="email" placeholder="Enter your email" className='logininput' onChange={Handlechange} name='email' value={loginInfo.email}/>
        </div>
        <div className="form-group">
          <label htmlFor="password" className='loginlabel' >Password</label>
          <input type="password" id="password" placeholder="Enter your password" className='logininput' onChange={Handlechange} name='password' value={loginInfo.password}/>
        </div>
        <button type="submit" className="login-button">Login</button>
        <p className="signup-link">
          Don't have an account? <Link to={'/signup'}>Sign up</Link> 
        </p>
        <ToastContainer />
      </form>
    </div>
        </div>
    </>
  )
}

export default Login
