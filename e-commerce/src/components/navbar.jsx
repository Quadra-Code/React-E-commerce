import React ,{Component , Fragment} from 'react';
import { NavLink } from 'react-router-dom';
import smallLogo from '../NEW QC/لوجو qc 2-01.png';
import logo from '../NEW QC/لوجو qc-12.png';

class Navbar extends Component {
  render() {
    return (
      <>
        <header>
          <div className="logo">
            <img src={smallLogo} alt="" className="mobile-screens"   style={{ width: '0px' }}/>
            <img src={logo} alt="" className="all-screens" style={{ width: '250px' }} />
          </div>
          <div className="nav-links">
            <ul className="mobile-links">
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
            </ul>
            <ul className="fullScreen-links">
              <li>
                <a  href="#home" className="header_link active">الرئيسيه</a>
              </li>
              <li>
                <a href="#services" className="header_link">ماذا عنا ؟</a>
              </li>
              <li>
                <a href="#aboutus" className="header_link">المنيو</a>
              </li>
              <li>
                <a href="#contact" className="header_link">تواصل معنا</a>
              </li>
              <li>
                <NavLink exact='true' href="/superUser" className="header_link">Super user</NavLink>
              </li>
              <li>
                <a href="#ShoppingCart" className="header_link"><img alt ="ph"src="https://img.icons8.com/fluency/48/null/fast-cart.png"/></a>
              </li>
              <li>
                <a href="#Wishlist" className="header_link"><img alt ="ph" src="https://img.icons8.com/cute-clipart/48/null/wish-list.png"/></a>
              </li>
            </ul>
          </div>
        </header>
      </>
    )
  }
}
export default Navbar;

