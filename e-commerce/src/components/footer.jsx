import React ,{Component, Fragment} from 'react';
import logo from '../NEW QC/لوجو qc-12.png';

class Footer extends Component{
    render(){
      return(
        <>
          <footer className="footer" id="contact">
              <div className="col-container">
                <div className="col logo-col">
                  <img src={logo} alt="logo" style={{width: '250px'}}/>
                  <div className="social-i">
                    <a href="#FA">
                      <i className="fa-brands fa-linkedin"></i>
                    </a>
                    <a href="#FA">
                      <i className="fa-brands fa-github"></i>
                    </a>
                    <a href="#FA ">
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                  </div>
                </div>
                <div className="col">
                  <div className="elements">
                    <h2>our ways to contact us</h2>
                    <span><a href='tel:+20 1156864d62'>Phone (+20) 1156864d62</a></span>
                    <span><a href='tel:+20 1156864d62'>Phone (+20) 1156864d62</a></span>
                    <span><a href='tel:+20 1156864d62'>Phone (+20) 1156864d62</a></span>
                    <span><a href='mailto:info@example.com'>info@example.com</a></span>
                  </div>
                </div>
                <div className="col">
                  <div className="elements">
                    <h2>Opening</h2>
                    <span>Monday - Saturday</span>
                    <span>09AM - 09PM</span>
                  </div>
                </div>
              </div>
          </footer>
          <div className="Copyright-cont">
            <p>Copyright ©<a href="##"> 2022 QUADRACODE.</a> All Rights Reserved.</p>
          </div>
        </>
      )
    } 
  }
export default Footer ;