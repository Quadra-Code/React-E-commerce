/* eslint-disable no-unused-vars */
import React, {useState,useEffect} from 'react';
import Navbar from './navbar';
import Footer from './footer';
import image from '../NEW QC/New folder/Pro2.jpg';
import image2 from '../NEW QC/New folder/Pro3.jpg';
import image3 from '../NEW QC/New folder/wordpress-shopping-cart-plugins.webp';
import { InputTextarea } from "primereact/inputtextarea";import axios from 'axios';
function MyCart() {
  const [value2, setValue2] = useState(10.50);
  const [value, setValue] = useState("");
  const [cartItems,setCartItems] = useState();
  const [TotalPrice, setTotalPrice] = useState(0);

  useEffect(()=>{
    getCartItems()
    handleTotalPrice()
  },[cartItems])
  const handleTotalPrice =() => {
    // setTotalPrice(cartItems&& cartItems.reduce((acc,item)=>{
    //   return acc + item.itemPrice;
    // },0))
    let item_price=0;
    cartItems&& cartItems.forEach((item)=>{
      // console.log(item.itemPrice);
      item_price += item.itemPrice;
    })
    setTotalPrice(item_price)
  }
  const getCartItems = ()=> {
    axios.get(`http://127.0.0.1:8000/cart-api/5`)
    .then((response) =>{
      setCartItems(response.data[0].cartItems)
      // console.log(response.data)
    })
    .catch((error)=>console.log(error))
  }
  const handleQuantity_increment = (item,itemID,itemQuantity)=> {
    // console.log(itemID,itemQuantity);
    // setQuantity(quantity+1)
    setCartItems(item=>
      item.map((item)=>
      item.itemID === itemID ? {...item,itemQuantity:item.itemQuantity +1} :item
      ))
  }
  const handleQuantity_decrement = (item,itemID,itemQuantity)=> {
    // console.log(itemID,itemQuantity);
    // setQuantity(quantity > 1? quantity - 1 : 1);  
    setCartItems(item=>
      item.map((item)=>
      item.itemID === itemID ? {...item,itemQuantity:item.itemQuantity > 1 ? item.itemQuantity-1 :1} :item
    ))
    
  }

  return (
    <>
      <div className='cart-container'>
        <Navbar/> 
        <div className='main-content'>
          <section className='items-container'>
            {/* <div className="cart-labels">
              <span className='label'>العربة</span>
              <span className='label'>الكمية</span>
              <span className='label'>المجموع الكلي</span>
              <span className='label'>ازالة</span>
            </div> */}
            {cartItems&& cartItems.map((item)=>{
              return(
                <div className='item-container' key={item.itemID}>
                  <div className='image-name-disc'>
                    <img src={image2} alt=""/>
                    <div className='name-disc'>
                      <span className='item-name'>{item.itemName}</span>
                      <span className='item-description'>{item.itemDescription}</span>
                    </div>
                  </div>
                  <div className="more-options">
                    <div className='quantity-div'>
                      <div className='calcDiv-container'>
                        <div className='calcDiv'>
                          <button type='button'  className='calc-btn' onClick={()=>handleQuantity_increment(item,item.itemID,item.itemQuantity)}><i className='pi pi-angle-up'></i></button>
                          <button type='button'  className='calc-btn' onClick={()=>handleQuantity_decrement(item,item.itemID,item.itemQuantity)}><i className='pi pi-angle-down'></i></button>
                        </div>
                        <div className='count'>{item.itemQuantity}</div>
                      </div>
                    </div>
                    <div className="totalPrice">
                      <span className='total'>EGP {item.itemQuantity*item.itemPrice}</span>
                    </div>
                    <div className="options">
                      <button className="delete-item">
                        <i className='pi pi-trash'></i>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
            }
          </section>
          <section className='order-details'>
            <div className="top-section">
              <h3>طلب خاص</h3>
              <InputTextarea autoResize style={{border:'none'}} value={value} onChange={(e) => setValue(e.target.value)} rows={3} cols={10} />
            </div>
            <div className="bottom-section">
              <div className='subtotal'>
                <div className='col'>
                  <span>المجموع الفرعي:</span>
                  <span>EGP 100.88</span>
                </div>
                <div className='col'>
                  <span>الضريبة المضافة:</span>
                  <span>EGP 14.12</span>
                </div>
              </div>
              <div className="total-order">
                <div className='col'>
                  <span className='order-total-price'>المجموع الكلي</span>
                  <span className='order-totalPrice'>EGP  {TotalPrice}</span>
                </div>
              </div>
            </div>
          <button className='checkout'>متابعة عملية الشراء</button>
          </section>
        </div>
        <div className="footer2" style={{width:'100%'}}>
          <Footer/>
        </div>
      </div>
    </>
  )
}

export default MyCart