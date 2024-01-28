import React,{useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import { Galleria } from 'primereact/galleria';
import { PhotoService } from '../service/PhotoService';
import { Image } from 'primereact/image';
import image1 from '../NEW QC/New folder/Pro1.jpg';
import image2 from '../NEW QC/New folder/Pro2.jpg';
import image3 from '../NEW QC/New folder/Pro3.jpg';
import image4 from '../NEW QC/New folder/Pro4.jpg';
import image5 from '../NEW QC/New folder/Pro5.jpg';
export default function AllMenu() {
  const [visible, setVisible] = useState(false);
  const [images, setImages] = useState(null);
  const [categories,setCategories] = useState();
  const [activeCategory,setActiveCategory] = useState();
  const [items_subCategories,setItems_subCategories] = useState();
  const [position, setPosition] = useState('bottom');
  const [quantity, setQuantity] = useState(1);
  const [itemPopupData, setItemPopupData] = useState(
    {
      itemID:null,
      name: "",
      price:null,
      desc:'',
      images:[
        'ss','pp'
      ],
    }
  );
  const responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
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
    // PhotoService.getImages().then(data => setImages(data));
    getCategories()
  }, [])
  const getCategories =() =>{
    axios.get (`https://badil.pythonanywhere.com/categories-api`,{})
    .then(response=>{
      setCategories(response.data);
      // console.log(response.data[0].productsList[0].productImagesLinks[0]);
      getItems_subCategories(response.data[0].id)
      setActiveCategory(response.data[0].id)
    })
    .catch(error=>{
      console.log(error);
    });
  }
  const getItems_subCategories =(id) =>{
    axios.get (`https://badil.pythonanywhere.com/sub-categories-products-tree/${id}`,{})
    .then(response=>{
      setItems_subCategories(response.data);
      console.log(response.data[0].productsList[0].productImagesLinks[0]);
      console.log(response.data);
    })
    .catch(error=>{
      console.log(error);
    });
  }
  const getItemPopupData = (itemID,itemName,itemPrice,itemDesc,itemImages)=> {
    console.log(itemImages);
    setItemPopupData({itemID,name: itemName,price:itemPrice,desc:itemDesc,images:itemImages});
    PhotoService.getImages(itemImages).then(data => setImages(data));
    setVisible(true);
    console.log(itemID);
    console.log(itemPopupData);
  }
  const handleQuantity_increment = ()=> {
    setQuantity(quantity+1)
  }
  const handleQuantity_decrement = ()=> {
    setQuantity(quantity > 1? quantity - 1 : 1);  
  }
  const addToCart = (itemID)=> {
    axios.post(`https://badil.pythonanywhere.com/cart-api/post`,{
      client_fk:1,
      product_fk:itemID,
      item_quantity:quantity
    })
    .then((response)=>console.log(response))
    .catch((error)=>console.log(error))
    console.log(itemID);
  }
  const itemTemplate = (item) => {
    return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%',display: 'block' }} />
  }
  const thumbnailTemplate = (item) => {
      return <img src={item.thumbnailImageSrc} alt={item.alt} style={{ width: '100%',display: 'block' }}/>
  }
  const listCols = document.querySelectorAll('.aboutUs-listCol');
  listCols.forEach(col => {
    col.addEventListener('click', () => {
      // Remove active class from all columns
      listCols.forEach(col => {
        col.classList.remove('active');
      });
      // Add active class to clicked column
      col.classList.add('active');
    });
  });
  return (
    <>
      <div className="card flex justify-content-center">
        <Dialog header=""  visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
          <div className="item-popup-container">
            <div className='item-images-slider'>
              <Galleria value={images} thumbnailsPosition={position} circular  responsiveOptions={responsiveOptions} numVisible={3} style={{maxWidth:'440px',direction:'ltr' }} 
                item={itemTemplate} autoPlay transitionInterval={2500} thumbnail={thumbnailTemplate} />
            </div>
            <div className="item-more-details">
              <h3>{itemPopupData.name}</h3>
              <span>{itemPopupData.desc}</span>
              <div className="item-options">
                <div className='quantity-div'>
                  <div className='calcDiv'>
                    <button type='button' className='calc-btn' onClick={()=>handleQuantity_increment()}><i className='pi pi-angle-up'></i></button>
                    <button type='button'  className='calc-btn' onClick={()=>handleQuantity_decrement()}><i className='pi pi-angle-down'></i></button>
                  </div>
                  <div className='count'>{quantity}</div>
                </div>
                <button className='AddCart' onClick={()=>addToCart(itemPopupData.itemID)}>اضافة الي العربه</button>
                <button className='AddFav'><i className='pi pi-heart'></i></button>
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
            {categories&&categories.map((category)=>{
              return(
                <div className={`aboutUs-listCol ${category.id === activeCategory? 'active':''}`} id={category.id} onClick={()=>getItems_subCategories(category.id)}>
                  {category.category_name}
                </div>
              )
            })}
          </div>
          <div className="aboutContent">
            <div className="aboutUs-ourTeam"  id="teamCont">
              <div className="col">
                {items_subCategories && items_subCategories.length > 0 && items_subCategories.map((sub)=>{
                  return(
                    <div className="features-container">
                      <h3>{sub.subCategory}</h3>
                      <div className='menu-items'>
                      {sub&& sub.productsList.map((item)=>
                        <div className="features cart1">
                          <div className='eye-container'>
                            <img  src={`https://badil.pythonanywhere.com/images/${item.productImagesLinks[0]}`} alt=""/>
                            <div className='opacity'>
                              <button className='view-item-popup' 
                                onClick={() => getItemPopupData(item.productID,item.productName,item.productSellPrice,item.productDesc,item.productImagesLinks)}>
                                <i className='pi pi-eye'></i>
                              </button>
                            </div>
                          </div>
                          <div className="feat">
                            <span>{item.productName}</span>
                            <span className="description">{item.productDesc}</span>
                            <div className="links-container">
                              <a href="#cart">
                                <i className="fa-solid fa-cart-shopping"></i>
                              </a>
                              <span className='item-price'>{item.productSellPrice}$</span>
                            </div>
                          </div>
                        </div>
                      )}
                      </div>
                    </div>
                  )
                })}
                {/* <div className="features-container">
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
                </div> */}
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

