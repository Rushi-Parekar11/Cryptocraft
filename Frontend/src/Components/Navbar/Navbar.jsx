import React, { useEffect, useState } from 'react'
import "../Navbar/Navbar.css"
import logo from '../../assets/logo.png'
import { GoArrowUpRight } from "react-icons/go";
import { IoWallet } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { MdOutlineMenu } from "react-icons/md";
import { FaRegTimesCircle } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify'
import { FaLock } from "react-icons/fa";


function Navbar() {
    const [isLogin,setisLogin]=useState(false);
    const [showWallet,setshowWallet] = useState(false);
    const [username,setusername]=useState('');

  


  const HandelWalletClick=()=>{
    setshowWallet(!showWallet);
  }
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    const getname = localStorage.getItem("LoggedInUser");
    setusername(getname)
    setisLogin(!!token)
  }, []);

  return (
    <div className='NavbarMain'>

      <div className='navfirstDiv'>
  <img src={logo} alt="logo" className='mainlogo' style={{marginTop:'-9px'}} />
  <Link to={'/'} id='linkstyl'><h2>CryptoCraft</h2> </Link>  
      </div>

      <div className='navsecondDiv'>
      <ul>
      <Link to={'/'} id='linkstyl'><li>Home</li></Link>  
      <Link to={'/exchanges'} id='linkstyl2'><li>Exchanges</li></Link>
        {isLogin ?  <Link to={'/portfolio'} id='linkstyl'> <li >Portfolio</li> </Link>: 
        <li onClick={()=>toast("Login required to view this section.")}>Portfolio <FaLock/></li>}
      </ul>
      </div>

      <div className='navthirdDiv'>
      {/* {isLogin ?   <div ><IoWallet className='walletlogo' onClick={HandelWalletClick}/></div> :  <div ><IoWallet className='walletlogo' onClick={()=>toast("Login required to view this section.")}/></div>} */}
      <div ><IoMdNotifications onClick={()=> toast.success('No notifications at the moment !')} className='walletlogo' /></div>
    <center>  {isLogin ? <Link to={`/profile/${username}`} className='profilIconLINK'><CgProfile className='profilIcon'/> </Link>: 
    <Link id='loginLNK' to={"/login"}><button className='loginBtn'>Login <GoArrowUpRight/></button></Link>}</center>
      </div>

    
{/* ////////////////// wallet ////////////////// */}
      {/* <div className="walletMainDIV" style={showWallet ? { visibility: 'visible'} : { visibility: 'hidden'}}>
      <div className='cirsclerenove'><CiCircleRemove id='FaRegTimesCircle' onClick={HandelWalletClick}/></div> 
       <hr style={{color:'black'}}/>
       <div className='inlineWALLET' style={{paddingLeft:'20px'}}><h2 >₹ 10000</h2><p>.00</p></div>
       <hr />
       <div className="inlineWALLET"><p className='accopbal'>Initially Bonus : 1000</p></div>
       <div className="inlineWALLET"><p style={{color:'green'}}>Bonus use : 1000</p></div>
       <center><button className='addmonyBTN'>Add Money</button></center>
      </div> */}

{/* /////////////// drop down ////////////// */}
<div className="dis">
      <div className="dropdown">
  <span><MdOutlineMenu id='logomenu'/></span>
  <div className="dropdown-content">
    <li><Link to={'/'}>Home</Link></li>  
    <li><Link to={'/exchanges'}>Exchanges</Link></li>
    {isLogin ? <li><Link to={'/portfolio'}>Portfolio</Link></li> : <li onClick={()=>toast("Login required to view this section.")}>Portfolio <FaLock/></li>  }
    <hr />
    <hr />
  {isLogin ?<li style={{marginTop:'20px'}}><Link to={`/profile/${username}`} className='responsiveProfile'><CgProfile className='profilIcon'  style={{height:'25px',width:'40px'}} /><p>Profile</p></Link></li>:
   <Link to={"/login"} className='loginBtn' style={{width:'150px',paddingLeft:'45px'}}>Login <GoArrowUpRight/></Link>} 
  </div>
</div>
</div>
    </div>
  )
}

export default Navbar
