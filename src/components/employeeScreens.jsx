import React, { Fragment, useEffect, useState} from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader";

export default function EmployeeScreens() {
  const [loading, setLoading] = useState(false);
  const [userScreens, setUserScreens] = useState(JSON.parse(localStorage.getItem('user-screens')));

  const override ={
    position:'absolute',
    top : '40%',
    right : '45%',
    transform: 'translateY(-50%, -50%)'
  }
  useEffect (()=>{
    console.log(userScreens);
    setLoading(true);
    setTimeout(()=>{
    setLoading(false);
    },900)
  },[])
  return (
    <>
      {
      loading ?
      <HashLoader
      color={"#906fee"}
      loading={loading}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
      cssOverride={override}
      />
      :
      <main className='super-user-main'>
        <div className="container">
          <div className="sideNav ">
            <div className="navLogo"><img src="../static/NEW QC/لوجو qc-12.png" alt="" className="navLogo" style={{width:'200px'}}/></div>
            <div className="navLinks">
              <ul>
                {userScreens&& userScreens.map((screen)=>{
                  return(
                    <li>
                      <NavLink to = {screen.screen_path}>
                        <i className="fa-solid fa-bars"></i>
                          إضافة أقسام
                      </NavLink>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className='mainContent'>
            <nav>
              <div className="navLinks">
                {/* <div className="iconsCont">
                  <div className="bellCont">
                    <i className="fa-solid fa-bell"></i>
                    <span>18</span>
                  </div>
                </div> */}
                <div className="User">
                  <span><i className="fa-solid fa-user"></i></span>
                  <span></span>
                </div>
              </div>
            </nav>
            <Outlet/>
          </div>
        </div>
      </main>
      }
    </>
  )
}
