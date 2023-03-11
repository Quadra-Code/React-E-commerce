import React, {Component, Fragment} from 'react';


class Menu extends Component {

  render() {
    return(
      <>
        <main>
          <div className="nav-container">
            <nav className="side-nav">
              <div className="side-nav-header">
                <img src="../static/NEW QC/لوجو qc-12.png" alt="" className="  navLogo"/>
              </div>
              <div className="side-nav-main">
                <ul>
                  <li  className="active navLi">
                    <a className="nav-links" href='#link'>
                      <i className="fa-solid fa-chart-line nav-icons"></i>
                      <span className="nav-Pagetitle">
                        قسم الالبان
                      </span>
                    </a>
                  </li>
                  <li  className="navLi">
                    <a className="nav-links" href='#link'>
                      <i className="fa-solid fa-file-signature nav-icons"></i>
                      <span className="nav-Pagetitle">
                        سوريهات
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
              <div className="searchBar">
                <div className="content">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <input type="text" placeholder="عن ماذا تبحث؟"/>
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
export default Menu;