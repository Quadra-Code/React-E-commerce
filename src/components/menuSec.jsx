import React,{useState} from 'react';
import { NavLink } from 'react-router-dom';

export default function MenuSec() {
  const [product,setProduct]=useState({
    product1: {
      img:require('../NEW QC/New folder/Pro4.jpg'),
      bestSeller:true,
      label:'هاني كيك نوتيلا',
      preif:'الكيكه الاسفنجيه المحشوه بكريمة النوتيلا و مغطاة بطبقه من اللوتس',
    }
  })
  return(
    <>
      <section id="aboutus" className="aboutUs-container">
        <div className="aboutUs-content">
          <h2 className="sec-label">المنيو بتاعنا</h2>
          <div className ="aboutUs-list">
            <div className="aboutUs-listCol active" id="team" >
              قسم الالبان
            </div>
            <div className="aboutUs-listCol" id="process" >
              الركن الشرقي
            </div>
            <div className="aboutUs-listCol" id="delivery" >
              الركن الغربي
            </div>
            <div className="aboutUs-listCol" id="chooseUs" >
              المخبوزات
            </div>
            <div className="aboutUs-listCol " id="team1" >
              التورت
            </div>
            <div className="aboutUs-listCol" id="more" >
              المنيو كله
            </div>
          </div>
          <div className="aboutContent">
            <div className="aboutUs-ourTeam"  id="teamCont">
              <div className="col">
                <span className="header">الاكثر مبيعا</span>
                <div className="features-container">
                  <div className='menu-items'>
                    <div className="features cart1">
                      <div className='eye-container'>
                        <img  src={require('../NEW QC/New folder/Pro3.jpg')} alt=""/>
                        <div className='opacity'>
                          <button className='view-item-popup'>
                            <i className='pi pi-eye'></i>
                          </button>
                        </div>
                      </div>
                      <div className="feat">
                        <span>هاني كيك نوتيلا</span>
                        <span className="description">الكيكه الاسفنجيه المحشوه بكريمة النوتيلا و مغطاة بطبقه من اللوتس</span>
                        <div className="links-container">
                          <a href="#cart">
                            <i className="fa-solid fa-cart-shopping"></i>
                          </a>
                          <span className='item-price'>20$</span>
                        </div>
                      </div>
                    </div>
                    <div className="features cart1">
                      <div className='eye-container'>
                        <img  src={require('../NEW QC/New folder/Pro1.jpg')} alt=""/>
                        <div className='opacity'>
                          <button className='view-item-popup'>
                            <i className='pi pi-eye'></i>
                          </button>
                        </div>
                      </div>
                      <div className="feat">
                        <span>هاني كيك نوتيلا</span>
                        <span className="description">الكيكه الاسفنجيه المحشوه بكريمة النوتيلا و مغطاة بطبقه من اللوتس</span>
                        <div className="links-container">
                          <a href="#cart">
                            <i className="fa-solid fa-cart-shopping"></i>
                          </a>
                          <span className='item-price'>20$</span>
                        </div>
                      </div>
                    </div>
                    <div className="features cart1">
                      <div className='eye-container'>
                        <img  src={require('../NEW QC/New folder/Pro2.jpg')} alt=""/>
                        <div className='opacity'>
                          <button className='view-item-popup'>
                            <i className='pi pi-eye'></i>
                          </button>
                        </div>
                      </div>
                      <div className="feat">
                        <span>هاني كيك نوتيلا</span>
                        <span className="description">الكيكه الاسفنجيه المحشوه بكريمة النوتيلا و مغطاة بطبقه من اللوتس</span>
                        <div className="links-container">
                          <a href="#cart">
                            <i className="fa-solid fa-cart-shopping"></i>
                          </a>
                          <span className='item-price'>20$</span>
                        </div>
                      </div>
                    </div>
                    <div className="features cart1">
                      <div className='eye-container'>
                        <img  src={require('../NEW QC/New folder/Pro4.jpg')} alt=""/>
                        <div className='opacity'>
                          <button className='view-item-popup'>
                            <i className='pi pi-eye'></i>
                          </button>
                        </div>
                      </div>
                      <div className="feat">
                        <span>هاني كيك نوتيلا</span>
                        <span className="description">الكيكه الاسفنجيه المحشوه بكريمة النوتيلا و مغطاة بطبقه من اللوتس</span>
                        <div className="links-container">
                          <a href="#cart">
                            <i className="fa-solid fa-cart-shopping"></i>
                          </a>
                          <span className='item-price'>20$</span>
                        </div>
                      </div>
                    </div>
                    <div className="features cart1">
                      <div className='eye-container'>
                        <img  src={require('../NEW QC/New folder/Pro5.jpg')} alt=""/>
                        <div className='opacity'>
                          <button className='view-item-popup'>
                            <i className='pi pi-eye'></i>
                          </button>
                        </div>
                      </div>
                      <div className="feat">
                        <span>هاني كيك نوتيلا</span>
                        <span className="description">الكيكه الاسفنجيه المحشوه بكريمة النوتيلا و مغطاة بطبقه من اللوتس</span>
                        <div className="links-container">
                          <a href="#cart">
                            <i className="fa-solid fa-cart-shopping"></i>
                          </a>
                          <span className='item-price'>20$</span>
                        </div>
                      </div>
                    </div>
                    <div className="features cart1">
                      <div className='eye-container'>
                        <img  src={require('../NEW QC/New folder/Pro3.jpg')} alt=""/>
                        <div className='opacity'>
                          <button className='view-item-popup'>
                            <i className='pi pi-eye'></i>
                          </button>
                        </div>
                      </div>
                      <div className="feat">
                        <span>هاني كيك نوتيلا</span>
                        <span className="description">الكيكه الاسفنجيه المحشوه بكريمة النوتيلا و مغطاة بطبقه من اللوتس</span>
                        <div className="links-container">
                          <a href="#cart">
                            <i className="fa-solid fa-cart-shopping"></i>
                          </a>
                          <span className='item-price'>20$</span>
                        </div>
                      </div>
                    </div>
                    <div className="features cart1">
                      <div className='eye-container'>
                        <img  src={require('../NEW QC/New folder/Pro3.jpg')} alt=""/>
                        <div className='opacity'>
                          <button className='view-item-popup'>
                            <i className='pi pi-eye'></i>
                          </button>
                        </div>
                      </div>
                      <div className="feat">
                        <span>هاني كيك نوتيلا</span>
                        <span className="description">الكيكه الاسفنجيه المحشوه بكريمة النوتيلا و مغطاة بطبقه من اللوتس</span>
                        <div className="links-container">
                          <a href="#cart">
                            <i className="fa-solid fa-cart-shopping"></i>
                          </a>
                          <span className='item-price'>20$</span>
                        </div>
                      </div>
                    </div>
                    <div className="features cart1">
                      <div className='eye-container'>
                        <img  src={require('../NEW QC/New folder/Pro3.jpg')} alt=""/>
                        <div className='opacity'>
                          <button className='view-item-popup'>
                            <i className='pi pi-eye'></i>
                          </button>
                        </div>
                      </div>
                      <div className="feat">
                        <span>هاني كيك نوتيلا</span>
                        <span className="description">الكيكه الاسفنجيه المحشوه بكريمة النوتيلا و مغطاة بطبقه من اللوتس</span>
                        <div className="links-container">
                          <a href="#cart">
                            <i className="fa-solid fa-cart-shopping"></i>
                          </a>
                          <span className='item-price'>20$</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="more">
                  <div className="content">
                    <NavLink to='/all-menu'>المزيد</NavLink>
                    <i className="fa-solid fa-arrow-left"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
