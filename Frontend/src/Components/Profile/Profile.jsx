import React, { useEffect, useState } from 'react'
import "../Profile/Profile.css"
import {useNavigate} from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import { IoIosArrowDown} from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";




function Profile() {
  const [username,setusername]=useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
    } else {
      setusername(localStorage.getItem("LoggedInUser"));
    }
  }, [navigate]);

  const HandleLogout=(e)=>{
    localStorage.removeItem('token')
    localStorage.removeItem('LoggedInUser');
    navigate('/');
    window.location.reload();
  }

  
  return (
    <>
        <div className="mainProfileDIV">
            <div className="mainInfoDIV">
             <center><CgProfile className='profileiconPRO'/></center> 
             <center><h5>{username}</h5>
             <div className='logout' onClick={HandleLogout}><MdOutlineLogout style={{height:'25px',width:'25px'}}/> Log out</div></center>
             {/* <div className='inlinegmail'><h6> rushiparekar11@gmail.com</h6></div>  */}
             <hr style={{margin:'4px'}}/>
             <div className='inline'><p>Reports <IoIosArrowDown/></p></div> 
             <hr style={{margin:'4px'}}/>
             <div className='inline'><h6><p>History  <IoIosArrowDown/></p></h6></div> 
             <hr style={{margin:'4px'}}/>
             <div className='inline'><h6><p>Transaction History  <IoIosArrowDown/></p></h6></div> 
             <hr style={{margin:'4px'}}/>
             <div className='inline'><h6><p>Bank History  <IoIosArrowDown/></p></h6></div> 
        
            </div>





            {/* <div className="mainwalletDIV">

                
            </div> */}
        </div>
    </>
  )
}

export default Profile
