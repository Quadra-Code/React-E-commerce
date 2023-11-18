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
  useEffect(()=>{
    getCartItems()
  },[])
  const getCartItems = ()=> {
    axios.get(`http://127.0.0.1:8000/cart-api/5`)
    .then((response) =>{
      setCartItems(response.data)
      console.log(response.data)
    })
    .catch((error)=>console.log(error))
  }
  return (
    <>
      <div className='cart-container'>
        <Navbar/> 
        <div className='main-content'>
          <section className='items-container'>
            <div className="cart-labels">
              <span className='label'>العربة</span>
              <span className='label'>الكمية</span>
              <span className='label'>المجموع الكلي</span>
              <span className='label'>ازالة</span>
            </div>
            <div className='item-container'>
              <div className='image-name-disc'>
                <img src={image} alt=""/>
                <div className='name-disc'>
                  <span className='item-name'>قشطوطه باللبن</span>
                  <span>كيكه اسفنجيه مغموره بالحليب </span>
                </div>
              </div>
              <div className='quantity-div'>
                <div className='calcDiv-container'>
                  <div className='calcDiv'>
                    <button type='button'  className='calc-btn'><i className='pi pi-angle-up'></i></button>
                    <button type='button'  className='calc-btn'><i className='pi pi-angle-down'></i></button>
                  </div>
                  <div className='count'>2</div>
                </div>
              </div>
              <div className="totalPrice">
                <span className='total'>82</span>
              </div>
              <div className="options">
                <button className="delete-item">
                  <i className='pi pi-trash'></i>
                </button>
              </div>
            </div>
            <div className='item-container'>
              <div className='image-name-disc'>
                <img src={image2} alt=""/>
                <div className='name-disc'>
                  <span className='item-name'>قشطوطه باللبن</span>
                  <span>كيكه اسفنجيه مغموره بالحليب </span>
                </div>
              </div>
              <div className='quantity-div'>
                <div className='calcDiv-container'>
                  <div className='calcDiv'>
                    <button type='button'  className='calc-btn'><i className='pi pi-angle-up'></i></button>
                    <button type='button'  className='calc-btn'><i className='pi pi-angle-down'></i></button>
                  </div>
                  <div className='count'>2</div>
                </div>
              </div>
              <div className="totalPrice">
                <span className='total'>82</span>
              </div>
              <div className="options">
                <button className="delete-item">
                  <i className='pi pi-trash'></i>
                </button>
              </div>
            </div>
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
                  <span className='order-totalPrice'>EGP  115</span>
                </div>
              </div>
            </div>
          <button className='checkout'>متابعة عملية الشراء</button>
          </section>
        </div>
        {/* <div className='landing-image' >
          <img src={image3} alt="" />
        </div>
        <section className='top-col'>
          <div className='table-wrap'>
            <div className='table-scroll'>
              <table>
                <thead>
                  <tr>
                    <th>المنتجات</th>
                    <th>السعر</th>
                    <th>الكمية</th>
                    <th>الاجمالي</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className='image-name-disc'>
                        <img src={image} alt="" />
                        <div className='name-disc'>
                          <span className='item-name'>قشطوطه باللبن</span>
                          <span>كيكه اسفنجيه مغموره بالحليب </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className='item-price'>25</span>$
                    </td>
                    <td>
                      <div className='quantity-div'>
                        <div className='calcDiv'>
                          <button type='button'  className='calc-btn'><i className='pi pi-angle-up'></i></button>
                          <button type='button'  className='calc-btn'><i className='pi pi-angle-down'></i></button>
                        </div>
                        <div className='count'>2</div>
                      </div>
                    </td>
                    <td>
                      <span className='item-price'>50</span>$
                    </td>
                    <td>
                      <i className="pi pi-trash" style={{ fontSize: '1rem' }}></i>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className='image-name-disc'>
                        <img src={image} alt="" />
                        <div className='name-disc'>
                          <span className='item-name'>قشطوطه باللبن</span>
                          <span>كيكه اسفنجيه مغموره بالحليب </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className='item-price'>25</span>$
                    </td>
                    <td>
                      <div className='quantity-div'>
                        <div className='calcDiv'>
                          <button type='button'  className='calc-btn'><i className='pi pi-angle-up'></i></button>
                          <button type='button'  className='calc-btn'><i className='pi pi-angle-down'></i></button>
                        </div>
                        <div className='count'>2</div>
                      </div>
                    </td>
                    <td>
                      <span className='item-price'>50</span>$
                    </td>
                    <td>
                      <i className="pi pi-trash" style={{ fontSize: '1rem' }}></i>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className='image-name-disc'>
                        <img src={image} alt="" />
                        <div className='name-disc'>
                          <span className='item-name'>قشطوطه باللبن</span>
                          <span>كيكه اسفنجيه مغموره بالحليب </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className='item-price'>25</span>$
                    </td>
                    <td>
                      <div className='quantity-div'>
                        <div className='calcDiv'>
                          <button type='button'  className='calc-btn'><i className='pi pi-angle-up'></i></button>
                          <button type='button'  className='calc-btn'><i className='pi pi-angle-down'></i></button>
                        </div>
                        <div className='count'>2</div>
                      </div>
                    </td>
                    <td>
                      <span className='item-price'>50</span>$
                    </td>
                    <td>
                      <i className="pi pi-trash" style={{ fontSize: '1rem' }}></i>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className='image-name-disc'>
                        <img src={image} alt="" />
                        <div className='name-disc'>
                          <span className='item-name'>قشطوطه باللبن</span>
                          <span>كيكه اسفنجيه مغموره بالحليب </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className='item-price'>25</span>$
                    </td>
                    <td>
                      <div className='quantity-div'>
                        <div className='calcDiv'>
                          <button type='button'  className='calc-btn'><i className='pi pi-angle-up'></i></button>
                          <button type='button'  className='calc-btn'><i className='pi pi-angle-down'></i></button>
                        </div>
                        <div className='count'>2</div>
                      </div>
                    </td>
                    <td>
                      <span className='item-price'>50</span>$
                    </td>
                    <td>
                      <i className="pi pi-trash" style={{ fontSize: '1rem' }}></i>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className='image-name-disc'>
                        <img src={image} alt="" />
                        <div className='name-disc'>
                          <span className='item-name'>قشطوطه باللبن</span>
                          <span>كيكه اسفنجيه مغموره بالحليب </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className='item-price'>25</span>$
                    </td>
                    <td>
                      <div className='quantity-div'>
                        <div className='calcDiv'>
                          <button type='button'  className='calc-btn'><i className='pi pi-angle-up'></i></button>
                          <button type='button'  className='calc-btn'><i className='pi pi-angle-down'></i></button>
                        </div>
                        <div className='count'>2</div>
                      </div>
                    </td>
                    <td>
                      <span className='item-price'>50</span>$
                    </td>
                    <td>
                      <i className="pi pi-trash" style={{ fontSize: '1rem' }}></i>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className='image-name-disc'>
                        <img src={image} alt="" />
                        <div className='name-disc'>
                          <span className='item-name'>قشطوطه باللبن</span>
                          <span>كيكه اسفنجيه مغموره بالحليب </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className='item-price'>25</span>$
                    </td>
                    <td>
                      <div className='quantity-div'>
                        <div className='calcDiv'>
                          <button type='button'  className='calc-btn'><i className='pi pi-angle-up'></i></button>
                          <button type='button'  className='calc-btn'><i className='pi pi-angle-down'></i></button>
                        </div>
                        <div className='count'>2</div>
                      </div>
                    </td>
                    <td>
                      <span className='item-price'>50</span>$
                    </td>
                    <td>
                      <i className="pi pi-trash" style={{ fontSize: '1rem' }}></i>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className='image-name-disc'>
                        <img src={image2} alt="" />
                        <div className='name-disc'>
                          <span className='item-name'>قشطوطه باللبن</span>
                          <span>كيكه اسفنجيه مغموره بالحليب </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className='item-price'>25</span>$
                    </td>
                    <td>
                      <div className='quantity-div'>
                        <div className='calcDiv'>
                          <button type='button'  className='calc-btn'><i className='pi pi-angle-up'></i></button>
                          <button type='button'  className='calc-btn'><i className='pi pi-angle-down'></i></button>
                        </div>
                        <div className='count'>2</div>
                      </div>
                    </td>
                    <td>
                      <span className='item-price'>50</span>$
                    </td>
                    <td>
                      <i className="pi pi-trash" style={{ fontSize: '1rem' }}></i>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className='image-name-disc'>
                        <img src={image} alt="" />
                        <div className='name-disc'>
                          <span className='item-name'>قشطوطه باللبن</span>
                          <span>كيكه اسفنجيه مغموره بالحليب </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className='item-price'>25</span>$
                    </td>
                    <td>
                      <div className='quantity-div'>
                        <div className='calcDiv'>
                          <button type='button'  className='calc-btn'><i className='pi pi-angle-up'></i></button>
                          <button type='button'  className='calc-btn'><i className='pi pi-angle-down'></i></button>
                        </div>
                        <div className='count'>2</div>
                      </div>
                    </td>
                    <td>
                      <span className='item-price'>50</span>$
                    </td>
                    <td>
                      <i className="pi pi-trash" style={{ fontSize: '1rem' }}></i>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className='image-name-disc'>
                        <img src={image2} alt="" />
                        <div className='name-disc'>
                          <span className='item-name'>قشطوطه باللبن</span>
                          <span>كيكه اسفنجيه مغموره بالحليب </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className='item-price'>25</span>$
                    </td>
                    <td>
                      <div className='quantity-div'>
                        <div className='calcDiv'>
                          <button type='button'  className='calc-btn'><i className='pi pi-angle-up'></i></button>
                          <button type='button'  className='calc-btn'><i className='pi pi-angle-down'></i></button>
                        </div>
                        <div className='count'>2</div>
                      </div>
                    </td>
                    <td>
                      <span className='item-price'>50</span>$
                    </td>
                    <td>
                      <i className="pi pi-trash" style={{ fontSize: '1rem' }}></i>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className='image-name-disc'>
                        <img src={image} alt="" />
                        <div className='name-disc'>
                          <span className='item-name'>قشطوطه باللبن</span>
                          <span>كيكه اسفنجيه مغموره بالحليب </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className='item-price'>25</span>$
                    </td>
                    <td>
                      <div className='quantity-div'>
                        <div className='calcDiv'>
                          <button type='button'  className='calc-btn'><i className='pi pi-angle-up'></i></button>
                          <button type='button'  className='calc-btn'><i className='pi pi-angle-down'></i></button>
                        </div>
                        <div className='count'>2</div>
                      </div>
                    </td>
                    <td>
                      <span className='item-price'>50</span>$
                    </td>
                    <td>
                      <i className="pi pi-trash" style={{ fontSize: '1rem' }}></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <section className='bottom-col'>
          <div className='clientInfo-container'>
            <span>أسم العميل : <span className='client-name'>hossam sonbaty</span></span>
            <span> العنوان: <span className='client-name'>خلف مسجد  الزهراء</span></span>
            <span> رقم الهاتف: <span className='client-name'>01118066382</span></span>
          </div>
          <div className='subtotal-container'>
            <span>الاجمالي <span>(2)</span>: <span>$240</span></span>
            <span>سعر التوصيل : <span>$240</span></span>
            <button className='checkOut-btn'>متابعة عملية الشراء</button>
          </div>
        </section> */}
        <div className="footer2" style={{width:'100%'}}>
          <Footer/>
        </div>
      </div>
    </>
  )
}

export default MyCart