import React,{useState} from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from './navbar';

export default function AllMenu() {
  return (
    <>
    <div className='all-menu-container'>
      <Navbar/>
      <section id="aboutus" className="aboutUs-container">
        <div className="aboutUs-content">
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
                  <h3>الأرز بلبن</h3>
                  <div className='menu-items'>
                    <div className="features cart1">
                      <img src={require('../NEW QC/New folder/Pro5.jpg')} alt=""/>
                      <div className="feat">
                        <span>هاني كيك نوتيلا</span>
                        <span className="description">الكيكه الاسفنجيه المحشوه بكريمة النوتيلا و مغطاة بطبقه من اللوتس</span>
                        <div className="links-container">
                          <a href="#3">
                            <i className="fa-solid fa-cart-shopping"></i>
                          </a>
                          <span>20$</span>
                        </div>
                      </div>
                    </div>
                    <div className="features cart1">
                      <img src={require('../NEW QC/New folder/Pro1.jpg')} alt=""/>
                      <div className="feat">
                        <span>هاني كيك نوتيلا</span>
                        <span className="description">الكيكه الاسفنجيه المحشوه بكريمة النوتيلا و مغطاة بطبقه من اللوتس</span>
                        <div className="links-container">
                          <a href="#3">
                            <i className="fa-solid fa-cart-shopping"></i>
                          </a>
                          <span>20$</span>
                        </div>
                      </div>
                    </div>
                    <div className="features cart1">
                      <img src={require('../NEW QC/New folder/Pro3.jpg')} alt=""/>
                      <div className="feat">
                        <span>هاني كيك نوتيلا</span>
                        <span className="description">الكيكه الاسفنجيه المحشوه بكريمة النوتيلا و مغطاة بطبقه من اللوتس</span>
                        <div className="links-container">
                          <a href="#cart">
                            <i className="fa-solid fa-cart-shopping"></i>
                          </a>
                          <span>20$</span>
                        </div>
                      </div>
                    </div>
                    <div className="features cart1">
                      <img src={require('../NEW QC/New folder/Pro4.jpg')} alt=""/>
                      <div className="feat">
                        <span>هاني كيك نوتيلا</span>
                        <span className="description">الكيكه الاسفنجيه المحشوه بكريمة النوتيلا و مغطاة بطبقه من اللوتس</span>
                        <div className="links-container">
                          <a href="3">
                            <i className="fa-solid fa-cart-shopping"></i>
                          </a>
                          <span>20$</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="features-container">
                  <h3>قشطوطه</h3>
                  <div className='menu-items'>
                    <div className="features cart1">
                      <img src={require('../NEW QC/New folder/Pro5.jpg')} alt=""/>
                      <div className="feat">
                        <span>هاني كيك نوتيلا</span>
                        <span className="description">الكيكه الاسفنجيه المحشوه بكريمة النوتيلا و مغطاة بطبقه من اللوتس</span>
                        <div className="links-container">
                          <a href="#3">
                            <i className="fa-solid fa-cart-shopping"></i>
                          </a>
                          <span>20$</span>
                        </div>
                      </div>
                    </div>
                    <div className="features cart1">
                      <img src={require('../NEW QC/New folder/Pro1.jpg')} alt=""/>
                      <div className="feat">
                        <span>هاني كيك نوتيلا</span>
                        <span className="description">الكيكه الاسفنجيه المحشوه بكريمة النوتيلا و مغطاة بطبقه من اللوتس</span>
                        <div className="links-container">
                          <a href="#3">
                            <i className="fa-solid fa-cart-shopping"></i>
                          </a>
                          <span>20$</span>
                        </div>
                      </div>
                    </div>
                    <div className="features cart1">
                      <img src={require('../NEW QC/New folder/Pro3.jpg')} alt=""/>
                      <div className="feat">
                        <span>هاني كيك نوتيلا</span>
                        <span className="description">الكيكه الاسفنجيه المحشوه بكريمة النوتيلا و مغطاة بطبقه من اللوتس</span>
                        <div className="links-container">
                          <a href="#cart">
                            <i className="fa-solid fa-cart-shopping"></i>
                          </a>
                          <span>20$</span>
                        </div>
                      </div>
                    </div>
                    <div className="features cart1">
                      <img src={require('../NEW QC/New folder/Pro4.jpg')} alt=""/>
                      <div className="feat">
                        <span>هاني كيك نوتيلا</span>
                        <span className="description">الكيكه الاسفنجيه المحشوه بكريمة النوتيلا و مغطاة بطبقه من اللوتس</span>
                        <div className="links-container">
                          <a href="3">
                            <i className="fa-solid fa-cart-shopping"></i>
                          </a>
                          <span>20$</span>
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
    </div>
    </>
  )
}

