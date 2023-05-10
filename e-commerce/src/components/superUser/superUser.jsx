import React, { Fragment, useEffect, useState} from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import HashLoader from "react-spinners/HashLoader"


function SuperUser() {
  const {name} =useSelector (state => state.user.userData)
  const [loading, setLoading] = useState(false);
  const override ={
    position:'absolute',
    top : '40%',
    right : '45%',
    transform: 'translateY(-50%, -50%)'
  }
  useEffect (()=>{
    setLoading(true);
    setTimeout(()=>{
    setLoading(false);
    },900)
  },[])
  return (
    <Fragment>
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
      <main>
        <div className="container">
          <div className="sideNav">
            <div className="navLogo"><img src="../static/NEW QC/لوجو qc-12.png" alt="" className="navLogo" style={{width:'200px'}}/></div>
            <div className="navLinks">
              <ul>
                <li>
                  <NavLink to ='add-sections'>
                    <i className="fa-solid fa-bars"></i>
                    إضافة أقسام
                  </NavLink>
                </li>
                <li>
                  <NavLink to ='add-products'>
                    <i className="fa-solid fa-bars"></i>
                    إضافة منتجات
                  </NavLink>
                </li>
                <li>
                  <NavLink to ='orders'>
                    <i className="fa-solid fa-bars"></i>
                    الطلبات
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className='mainContent'>
            <nav>
              <div className="navLinks">
                <div className="iconsCont">
                  <div className="bellCont">
                    <i className="fa-solid fa-bell"></i>
                    <span>18</span>
                  </div>
                </div>
                <div className="User">
                  <span><i className="fa-solid fa-user"></i></span>
                  <span>{name}</span>
                </div>
              </div>
            </nav>
            <Outlet/>
          </div>
        </div>
      </main>
      }
    </Fragment>
  )
}

export default SuperUser

// class SuperUser extends Component{
//   render(){
//     return(
//       <Fragment>
//         <main>
//           <div className="container">
//             <div className="sideNav">
//               <div className="navLogo"><img src="../static/NEW QC/لوجو qc-12.png" alt="" className="navLogo" style={{width:'200px'}}/></div>
//               <div className="navLinks">
//                 <ul>
//                   <li className="active">
//                   <i className="fa-solid fa-bars"></i>
//                     <span>إضافة أقسام</span>
//                   </li>
//                   <li>
//                     <i className="fa-solid fa-marker"></i>
//                     <span>إضافة منتجات</span>
//                   </li>
//                   <li>
//                     <i className="fa-solid fa-marker"></i>
//                     <span>الطلبات</span>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//             <div className='mainContent'>
//               <nav>
//                 <div className="navLinks">
//                   <div className="iconsCont">
//                     <div className="bellCont">
//                       <i className="fa-solid fa-bell"></i>
//                       <span>18</span>
//                     </div>
//                   </div>
//                   <div className="User">
//                     <span><i className="fa-solid fa-user"></i></span>
//                     <span>name here</span>
//                   </div>
//                 </div>
//               </nav>
//             </div>
//           </div>
//         </main>
//       </Fragment>
//     )
//   }
// }
// export default SuperUser;