/* eslint-disable no-unused-vars */
import React, {useState,useEffect} from 'react';
import Navbar from './navbar';
import Footer from './footer';
import image2 from '../NEW QC/New folder/Pro3.jpg';
import { InputTextarea } from "primereact/inputtextarea";import axios from 'axios';
function MyCart() {
  const [value, setValue] = useState("");
  const [cartItems,setCartItems] = useState();
  const [TotalPrice, setTotalPrice] = useState();
  useEffect(() => {
    getCartItems()
  },[]);
  const getCartItems = ()=> {
    axios.get(`https://badil.pythonanywhere.com/cart-api/1`)
    .then((response) =>{
      setTotalPrice(response.data[0].totalPrice)
      setCartItems(response.data[0].cartItems)
    })
    .catch((error)=>console.log(error))
  }
  const handleQuantity_increment = (item,itemID,itemQuantity)=> {
    axios.put(`https://badil.pythonanywhere.com/cart-api/${itemID}`,{
      action_type:'increment'
    })
    .then((response) =>{
      setCartItems(response.data[0].cartItems)
      setTotalPrice(response.data[0].totalPrice)
    })
    .catch((error)=>console.log(error))
  }
  const handleQuantity_decrement = (item,itemID,itemQuantity)=> {
    axios.put(`https://badil.pythonanywhere.com/cart-api/${itemID}`,{
      action_type:'decrement'
    })
    .then((response) =>{
      setCartItems(response.data[0].cartItems)
      setTotalPrice(response.data[0].totalPrice)
    })
    .catch((error)=>console.log(error))
  }
  const handleDelete = (itemID) => {
    axios.delete(`https://badil.pythonanywhere.com/cart-api/${itemID}`)
    .then((response) =>{
      setCartItems(response.data[0].cartItems)
      setTotalPrice(response.data[0].totalPrice)
    })
    .catch((error)=>console.log(error))
  }
  return (
    <>
      <div className='cart-container'>
        <Navbar/> 
        <div className='main-content'>
          <section className='items-container'>
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
                      <button className="delete-item" onClick={()=>handleDelete(item.itemID)}>
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
                  <span>EGP {TotalPrice}</span>
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