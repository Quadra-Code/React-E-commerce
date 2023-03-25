import React, {Component, Fragment} from 'react';

class SuperUser extends Component{
  render(){
    return(
      <>
        <main>
          <div className="container">
            <div className="sideNav">
              <div className="navLogo"><img src="../static/NEW QC/لوجو qc-12.png" alt="" className="navLogo" style={{width:'200px'}}/></div>
              <div className="navLinks">
                <ul>
                  <li className="active">
                  <i className="fa-solid fa-bars"></i>
                    <span>إضافة أقسام</span>
                  </li>
                  <li>
                    <i className="fa-solid fa-marker"></i>
                    <span>إضافة منتجات</span>
                  </li>
                  <li>
                    <i className="fa-solid fa-marker"></i>
                    <span>الطلبات</span>
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
                    <span>name here</span>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </main>
      </>
    )
  }
}
export default SuperUser;