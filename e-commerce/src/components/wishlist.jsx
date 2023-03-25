import React, {Component, Fragment} from 'react';
import axios from 'axios';

class Wishlist extends Component {
  constructor (props) {
    super(props);
    this.myRef= React.createRef();
    this.myMenuRef= React.createRef();
    this.state ={
      items: []
    }
  }
  componentDidMount(){
      const getUser =  async ()=> {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        this.setState({
          items:response.data
        })
        console.log(response.data[1].userId)
        return response.data;
      }
      catch (error){
        console.log(Error(error));
      }
    }
    getUser()
  }
  getItems = ()=>{
    console.log(this.state.items[1])
  }
  subMenu = ()=> {
    this.myMenuRef.current.classList.toggle("responsive")
  }
  Responsive= ()=> {
    this.myRef.current.classList.toggle("responsive")
    console.log('done')
  }
  render() {
    return(
      <>
        <main>
          <div className="nav-container" ref={this.myRef}>
            <nav className="side-nav">
              <button onClick={this.Responsive}>
              <i className="fa-solid fa-xmark"></i>
              </button>
              {/* <div className="side-nav-header">
                <img src="../static/NEW QC/لوجو qc-12.png" alt="" className="  navLogo"/>
              </div> */}
              <div className="side-nav-main">
                <ul>
                  <li ref={this.myMenuRef} className="active navLi" >
                    <a onClick={this.subMenu} className="nav-links" href='#link'>
                      <i className="fa-solid fa-chart-line nav-icons"></i>
                      <span onClick={this.getItems} className="nav-Pagetitle">
                        قسم الالبان
                      </span>
                    </a>
                    <div className='subMenu' >
                      <ul>
                        <li >قشطه قشطه قشطه قشطه</li>
                        <li onClick={this.Responsive}>قشطه</li>
                        <li>قشطه</li>
                        <li>قشطه</li>
                        <li>قشطه</li>
                      </ul>
                    </div>
                  </li>
                  <li  className="navLi">
                    <a className="nav-links" href='#link'>
                      <i className="fa-solid fa-file-signature nav-icons"></i>
                      <span className="nav-Pagetitle">
                        سوريهات
                        {this.state.items.map(item => <span key={item.id}>{item.userId}</span>)}
                      </span>
                    </a>
                  </li>
                  <li  className="navLi">
                    <a className="nav-links" href='#link'>
                      <i className="fa-solid fa-clipboard nav-icons"></i>
                      <span className="nav-Pagetitle">
                        شوكولاته الأصيل
                      </span>
                    </a>
                  </li>
                  <li  className="navLi">
                    <a className="nav-links" href='#link'>
                      <i className="fa-solid fa-house-chimney-medical nav-icons"></i>
                      <span className="nav-Pagetitle">
                        ال BAKERY
                      </span>
                    </a>
                  </li>
                  <li  className="navLi">
                    <a className="nav-links" href='#link'>
                      <i className="fa-solid fa-user-doctor nav-icons"></i>
                      <span className="nav-Pagetitle">
                        مخبوزات الدايت
                      </span>
                    </a>
                  </li>
                  <li  className="navLi">
                    <a className="nav-links" href='#link'>
                      <i className="fa-solid fa-bed nav-icons "></i>
                      <span className="nav-Pagetitle">
                        المخبوزات
                      </span>
                    </a>
                  </li>
                  <li  className="navLi">
                    <a className="nav-links" href='#link'>
                      <i className="fa-solid fa-bed nav-icons "></i>
                      <span className="nav-Pagetitle">
                        الركن الغربي
                      </span>
                    </a>
                  </li>
                  <li  className="navLi">
                    <a className="nav-links" href='#link'>
                      <i className="fa-solid fa-calendar-plus nav-icons"></i>
                      <span className="nav-Pagetitle">
                        جاتوه سبيشيال
                      </span>
                    </a>
                  </li>
                  <li  className="navLi">
                    <a className="nav-links" href='#link'>
                      <i className="fa-solid fa-computer nav-icons"></i>
                      <span className="nav-Pagetitle">
                        جاتوه ايطالي
                      </span>
                    </a>
                  </li>
                  <li  className="navLi">
                    <a className="nav-links" href='#link'>
                      <i className="fa-solid fa-tv nav-icons"></i>
                      <span className="nav-Pagetitle">
                        بولات
                      </span>
                    </a>
                  </li>
                  <li  className="navLi">
                    <a className="nav-links" href='#link'>
                      <i className="fa-solid fa-magnifying-glass nav-icons"></i>
                      <span className="nav-Pagetitle">
                        الجاتوه
                      </span>
                    </a>
                  </li>
                  <li  className="navLi">
                    <a className="nav-links" href='#link'>
                      <i className="fa-solid fa-magnifying-glass nav-icons"></i>
                      <span className="nav-Pagetitle">
                        الكنافه سوري وعربي
                      </span>
                    </a>
                  </li>
                  <li  className="navLi">
                    <a className="nav-links" href='#link'>
                      <i className="fa-solid fa-magnifying-glass nav-icons"></i>
                      <span className="nav-Pagetitle">
                        الجلاش سوري و عربي
                      </span>
                    </a>
                  </li>
                  <li  className="navLi">
                    <a className="nav-links" href='#link'>
                      <i className="fa-solid fa-magnifying-glass nav-icons"></i>
                      <span className="nav-Pagetitle">
                        حلو الشرقي
                      </span>
                    </a>
                  </li>
                  <li  className="navLi">
                    <a className="nav-links" href='#link'>
                      <i className="fa-solid fa-magnifying-glass nav-icons"></i>
                      <span className="nav-Pagetitle">
                        تورت فاكهة
                      </span>
                    </a>
                  </li>
                  <li  className="navLi">
                    <a className="nav-links" href='#link'>
                      <i className="fa-solid fa-magnifying-glass nav-icons"></i>
                      <span className="nav-Pagetitle">
                        تورت كلاسيك
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <section className="menu-container">
            <div className="mainContent">
              <nav>
                <div className="navLinks">
                  <div className='bar'>
                    <button onClick={this.Responsive}><i className="fa-solid fa-bars"></i></button>
                  </div>
                  <div className="iconsCont">
                    <div className="User">
                      <span><i className="fa-solid fa-house-chimney"></i></span>
                    </div>
                    <div className="bellCont">
                      <i className="fa-solid fa-bell"></i>
                      <span>18</span>
                    </div>
                    <div className="User">
                      <span><i className="fa-solid fa-user"></i></span>
                      <span>name here</span>
                    </div>
                  </div>
                </div>
              </nav>
              <div className="searchBar">
                <div className="content">
                  <i className="fa-brands fa-opencart"></i>
                  <span>My wishlist</span>
                </div>
              </div>
              <div className="products-container">
                <div className="products" >
                  <div className="features cart1">
                    <img src="../static/NEW QC/New folder/Pro4.jpg" alt=""/>
                    <div className="feat">
                      <span className="bestSeller">الاكثر مبيعا</span>
                      <span>هاني كيك نوتيلا</span>
                      <span className="description">الكيكه الاسفنجيه المحشوه بكريمة النوتيلا و مغطاة بطبقه من اللوتس</span>
                      <div className="links-container">
                        <a href="#link">
                          <i className="fa-solid fa-cart-shopping"></i>
                        </a>
                        <button><i className="fa-regular fa-trash-can"></i></button>
                        <span>20$</span>
                      </div>
                    </div>
                  </div>
                  <div className="features cart1">
                    <img src="../static/NEW QC/New folder/Pro4.jpg" alt=""/>
                    <div className="feat">
                      <span className="bestSeller">الاكثر مبيعا</span>
                      <span>هاني كيك نوتيلا</span>
                      <span className="description">الكيكه الاسفنجيه المحشوه بكريمة النوتيلا و مغطاة بطبقه من اللوتس</span>
                      <div className="links-container">
                        <a href="#link">
                          <i className="fa-solid fa-cart-shopping"></i>
                        </a>
                        <span>20$</span>
                      </div>
                    </div>
                  </div>
                  <div className="features cart1">
                    <img src="../static/NEW QC/New folder/Pro4.jpg" alt=""/>
                    <div className="feat">
                      <span className="bestSeller">الاكثر مبيعا</span>
                      <span>هاني كيك نوتيلا</span>
                      <span className="description">الكيكه الاسفنجيه المحشوه بكريمة النوتيلا و مغطاة بطبقه من اللوتس</span>
                      <div className="links-container">
                        <a href="#link">
                          <i className="fa-solid fa-cart-shopping"></i>
                        </a>
                        <span>20$</span>
                      </div>
                    </div>
                  </div>
                  <div className="features cart1">
                    <img src="../static/NEW QC/New folder/Pro4.jpg" alt=""/>
                    <div className="feat">
                      <span className="bestSeller">الاكثر مبيعا</span>
                      <span>هاني كيك نوتيلا</span>
                      <span className="description">الكيكه الاسفنجيه المحشوه بكريمة النوتيلا و مغطاة بطبقه من اللوتس</span>
                      <div className="links-container">
                        <a href="#link">
                          <i className="fa-solid fa-cart-shopping"></i>
                        </a>
                        <span>20$</span>
                      </div>
                    </div>
                  </div>
                  <div className="features cart1">
                    <img src="../static/NEW QC/New folder/Pro4.jpg" alt=""/>
                    <div className="feat">
                      <span className="bestSeller">الاكثر مبيعا</span>
                      <span>هاني كيك نوتيلا</span>
                      <span className="description">الكيكه الاسفنجيه المحشوه بكريمة النوتيلا و مغطاة بطبقه من اللوتس</span>
                      <div className="links-container">
                        <a href="#link">
                          <i className="fa-solid fa-cart-shopping"></i>
                        </a>
                        <span>20$</span>
                      </div>
                    </div>
                  </div>
                  <div className="features cart1">
                    <img src="../static/NEW QC/New folder/Pro4.jpg" alt=""/>
                    <div className="feat">
                      <span className="bestSeller">الاكثر مبيعا</span>
                      <span>هاني كيك نوتيلا</span>
                      <span className="description">الكيكه الاسفنجيه المحشوه بكريمة النوتيلا و مغطاة بطبقه من اللوتس</span>
                      <div className="links-container">
                        <a href="#link">
                          <i className="fa-solid fa-cart-shopping"></i>
                        </a>
                        <span>20$</span>
                      </div>
                    </div>
                  </div>
                  <div className="features cart1">
                    <img src="../static/NEW QC/New folder/Pro4.jpg" alt=""/>
                    <div className="feat">
                      <span className="bestSeller">الاكثر مبيعا</span>
                      <span>هاني كيك نوتيلا</span>
                      <span className="description">الكيكه الاسفنجيه المحشوه بكريمة النوتيلا و مغطاة بطبقه من اللوتس</span>
                      <div className="links-container">
                        <a href="#link">
                          <i className="fa-solid fa-cart-shopping"></i>
                        </a>
                        <span>20$</span>
                      </div>
                    </div>
                  </div>
                  <div className="features cart1">
                    <img src="../static/NEW QC/New folder/Pro4.jpg" alt=""/>
                    <div className="feat">
                      <span className="bestSeller">الاكثر مبيعا</span>
                      <span>هاني كيك نوتيلا</span>
                      <span className="description">الكيكه الاسفنجيه المحشوه بكريمة النوتيلا و مغطاة بطبقه من اللوتس</span>
                      <div className="links-container">
                        <a href="#link">
                          <i className="fa-solid fa-cart-shopping"></i>
                        </a>
                        <span>20$</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </>
    )
  }
}
export default Wishlist;