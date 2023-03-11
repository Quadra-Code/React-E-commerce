import React, {Component, Fragment} from 'react';

class SuperUser extends Component{
  render(){
    return(
      <>
        <main>
          <div class="container">
            <div class="sideNav">
              <div class="navLogo"><img src="../static/NEW QC/لوجو qc-12.png" alt="" class="navLogo" style={{width:'200px'}}/></div>
              <div class="navLinks">
                <ul>
                  <li class="active">
                  <i class="fa-solid fa-bars"></i>
                    <span>إضافة أقسام</span>
                  </li>
                  <li>
                    <i class="fa-solid fa-marker"></i>
                    <span>إضافة منتجات</span>
                  </li>
                  <li>
                    <i class="fa-solid fa-marker"></i>
                    <span>الطلبات</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className='mainContent'>
              <nav>
                <div class="navLinks">
                  <div class="iconsCont">
                    <div class="bellCont">
                      <i class="fa-solid fa-bell"></i>
                      <span>18</span>
                    </div>
                  </div>
                  <div class="User">
                    <span><i class="fa-solid fa-user"></i></span>
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