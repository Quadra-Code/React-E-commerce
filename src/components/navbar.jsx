import React ,{  Fragment, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import smallLogo from '../NEW QC/لوجو qc 2-01.png';
import logo from '../NEW QC/لوجو qc-12.png';
import { useRef } from 'react';

function Navbar()  {
    const navRef = useRef();
    const showNavbar = ()=>{
      navRef.current.classList.toggle("responsive")
    }
    const hideNavbar = ()=>{
      navRef.current.classList.remove("responsive")
    }
  return (
    <>
      <header>
        <div className="logo">
          <img src={smallLogo} alt="" className="mobile-screens"   style={{ width: '0px' }}/>
          <img src={logo} alt="" className="all-screens" style={{ width: '250px' }} />
        </div>
        <div className="nav-links" ref ={navRef}>
          {/* <ul className="mobile-links">
            <li>
              <a href="#home" className="side_link active"><i className="fa-solid fa-igloo"></i></a>
            </li>
            <li>
              <a href="#services" className="side_link"><i className="fa-regular fa-bell"></i></a>
            </li>
            <li>
              <a href="#aboutus" className="side_link"><i className="fa-solid fa-people-group"></i></a>
            </li>
            <li>
              <a href="#f" className="side_link"><i className="fa-solid fa-store"></i></a>
              <i className="fa-solid fa-chevron-down" style={{ fontSize: '14px' }}></i>
            </li>
            <li>
              <a href="#contact" className="header_link"><i className="fa-solid fa-phone-flip"></i></a>
            </li>
          </ul> */}
          <ul className="fullScreen-links">
            <li onClick={hideNavbar}>
              <a  href="#home" className="header_link active">الرئيسيه</a>
            </li>
            <li onClick={hideNavbar}>
              <a href="#services" className="header_link">ماذا عنا ؟</a>
            </li>
            <li onClick={hideNavbar}>
              <a href="#aboutus" className="header_link">المنيو</a>
            </li>
            <li onClick={hideNavbar}>
              <a href="#contact" className="header_link">تواصل معنا</a>
            </li>
            {/* <li onClick={hideNavbar}>
              <NavLink exact='true' href="/superUser" className="header_link">Super user</NavLink>
            </li> */}
            <li onClick={hideNavbar}>
              <a href="#ShoppingCart" className="header_link"><i className="fa-solid fa-cart-shopping"></i></a>
            </li>
            <li onClick={hideNavbar}>
              <a href="#Wishlist" className="header_link"><i className="fa-solid fa-heart"></i></a>
            </li>
            {/* <button className="cancelBtn" onClick={showNavbar}><i className="fa-solid fa-xmark"></i></button> */}
          </ul>
        </div>
        <button className="barBtn"  onClick={showNavbar}><i className="fa-solid fa-bars"></i></button>
      </header>
    </>
  )
}
export default Navbar;

