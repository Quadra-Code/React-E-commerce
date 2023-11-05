import React,{useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';
import { Dialog } from 'primereact/dialog';
import { Galleria } from 'primereact/galleria';
import { PhotoService } from '../service/PhotoService';
import image1 from '../NEW QC/New folder/Pro1.jpg';
import image2 from '../NEW QC/New folder/Pro2.jpg';
import image3 from '../NEW QC/New folder/Pro3.jpg';
import image4 from '../NEW QC/New folder/Pro4.jpg';
import image5 from '../NEW QC/New folder/Pro5.jpg';
export default function AllMenu() {
  const [visible, setVisible] = useState(false);
  const [images, setImages] = useState(null);
  const [position, setPosition] = useState('bottom');
  const responsiveOptions = [
    {
        breakpoint: '991px',
        numVisible: 4
    },
    {
        breakpoint: '767px',
        numVisible: 3
    },
    {
        breakpoint: '575px',
        numVisible: 1
    }
  ];
  useEffect(() => {
    PhotoService.getImages().then(data => setImages(data));
  }, [])

  const itemTemplate = (item) => {
    return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%',display: 'block' }} />
  }

  const thumbnailTemplate = (item) => {
      return <img src={item.thumbnailImageSrc} alt={item.alt} style={{ width: '100%',display: 'block' }}/>
  }
  return (
    <>
      <div className="card flex justify-content-center">
        <Dialog header=""  visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
          <div className="item-popup-container">
            <div className='item-images-slider'>
              <Galleria value={images} thumbnailsPosition={position} responsiveOptions={responsiveOptions} numVisible={3} style={{direction:'ltr' }} 
                item={itemTemplate} thumbnail={thumbnailTemplate} />
            </div>
            <div className="item-more-details">
              <h3>هاني كيك نوتيلا</h3>
              <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex et, neque sed, dicta, nihil iure aliquam adipisci vel ducimus consectetur dolore laudantium. Accusantium quaerat velit quisquam nam, ullam veritatis animi.</span>
              <div className="item-options">
                <button className='AddCart'>اضافة الي العربه</button>
                <button className='AddFav'><i className='pi pi-heart'></i></button>
                <div className='quantity-div'>
                  <div className='calcDiv'>
                    <button type='button'  className='calc-btn'><i className='pi pi-angle-up'></i></button>
                    <button type='button'  className='calc-btn'><i className='pi pi-angle-down'></i></button>
                  </div>
                  <div className='count'>2</div>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
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
                <div className="features-container">
                  <h3>الأرز بلبن</h3>
                  <div className='menu-items'>
                    <div className="features cart1">
                      <div className='eye-container'>
                        <img  src={image1} alt=""/>
                        <div className='opacity'>
                          <button className='view-item-popup' onClick={() => setVisible(true)}>
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
                        <img  src={image3} alt=""/>
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
                        <img  src={image2} alt=""/>
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
                        <img  src={image4} alt=""/>
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
                <div className="features-container">
                  <h3>قشطوطه</h3>
                  <div className='menu-items'>
                    <div className="features cart1">
                      <div className='eye-container'>
                        <img  src={image5} alt=""/>
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
                        <img  src={image1} alt=""/>
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
                        <img  src={image5} alt=""/>
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
      <Footer/>
    </div>
    </>
  )
}

