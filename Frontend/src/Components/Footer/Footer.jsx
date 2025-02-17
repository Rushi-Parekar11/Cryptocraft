import React from 'react';
import "../Footer/Footer.css"

function Footer() {
  return (
<>
  <div className="footercontainer" style={{borderRadius:'10px'}}>
    <footer id='mn' className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4  bg-dark text-light" >
      <p className="col-md-4 mb-0 d-flex ">©<li style={{color:'#FCC737',listStyle:'none',margin:'0px 10px'}}> CryptoCarft </li> All rights reserved.</p>

      <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-light text-decoration-none">
        <svg className="bi me-2" width="40" height="32"></svg>
      </a>

      <ul className="nav col-md-4 justify-content-end">
        <li className="nav-item"><a href="#" className="nav-link px-2 text-light">Home</a></li>
        <li className="nav-item"><a href="#" className="nav-link px-2 text-light">Features</a></li>
        <li className="nav-item"><a href="#" className="nav-link px-2 text-light">Pricing</a></li>
        <li className="nav-item"><a href="#" className="nav-link px-2 text-light">FAQs</a></li>
        <li className="nav-item" style={{marginLeft:'40px',paddingTop:'7px',fontWeight:'10'}}>Made By Rushi ❤️ </li>
      </ul>
    </footer>
  </div>
</>

  )
}

export default Footer
