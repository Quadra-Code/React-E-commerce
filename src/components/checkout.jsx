import React, {useState,useEffect} from 'react';
import Navbar from './navbar';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";import axios from 'axios';
import { RadioButton } from "primereact/radiobutton";
import { Calendar } from 'primereact/calendar';
function Checkout() {
  const [value, setValue] = useState("");
  const [orderType, setOrderType] = useState('orderNow');
  const [orderHow, setOrderHow] = useState('Delivery');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [datetime12h, setDateTime12h] = useState(null);
  console.log(orderType);
  return (
    <>
      <div className='checkout-container'>
        <Navbar/> 
        <div className='main-content'>
          <section className='contact-info-container'>
            <div className='col-container'>
              <div className='header-label'>
                <span>معلومات التواصل</span>
              </div>
              <div className='contact-infos'>
                <div className='inputs-col'>
                  <div className="input-container">
                    <label htmlFor="phone-number">رقم الهاتف</label>
                    <InputText keyfilter="int" id="phone-number"  />
                  </div>
                  <div className="input-container">
                    <label htmlFor="phone-number">رقم هاتف 2  (اختياري)</label>
                    <InputText keyfilter="int" id="phone-number" />
                  </div>
                </div>
                <div className='inputs-col'>
                  <div className="input-container">
                    <label htmlFor="phone-number">الأسم بالكامل</label>
                    <InputText keyfilter="int" id="phone-number" />
                  </div>
                  <div className="input-container">
                    <label htmlFor="phone-number">البريد الألكتروني</label>
                    <InputText keyfilter="int" id="phone-number" placeholder="name@gmail.com" />
                  </div>
                </div>
              </div>
            </div>
            <div className={orderHow==='Pick Up'?"col-container-none":"col-container"}>
              <div className='header-label'>
                <span>العنوان</span>
              </div>
              <div className='contact-infos'>
                <div className='inputs-col'>
                  <div className="input-container">
                    <label htmlFor="phone-number">المدينه</label>
                    <InputText keyfilter="int" id="phone-number"  />
                  </div>
                </div>
                <div className='inputs-col'>
                  <div className="input-container">
                    <label htmlFor="phone-number">المنطفة</label>
                    <InputText keyfilter="int" id="phone-number" />
                  </div>
                  <div className="input-container">
                    <label htmlFor="phone-number">الحي</label>
                    <InputText keyfilter="int" id="phone-number"  />
                  </div>
                </div>
                <div className='inputs-col'>
                  <div className="input-container">
                    <label htmlFor="phone-number">أسم/رقم الشارع</label>
                    <InputText keyfilter="int" id="phone-number" />
                  </div>
                  <div className="input-container">
                    <label htmlFor="phone-number">رقم البناية</label>
                    <InputText keyfilter="int" id="phone-number"  />
                  </div>
                </div>
                <div className='inputs-col'>
                  <div className="input-container">
                    <label htmlFor="phone-number">الطابق</label>
                    <InputText keyfilter="int" id="phone-number" />
                  </div>
                  <div className="input-container">
                    <label htmlFor="phone-number">الشقه</label>
                    <InputText keyfilter="int" id="phone-number"  />
                  </div>
                </div>
                <div className='inputs-col'>
                  <div className="input-container">
                    <label htmlFor="phone-number">معلومات اضافيه</label>
                    <InputTextarea autoResize style={{border:'none'}} value={value} onChange={(e) => setValue(e.target.value)} rows={3} cols={10} />
                  </div>
                </div>
              </div>
            </div>
            <div className='col-container'>
              <div className='header-label'>
                <span>تحديد نوع الطلب</span>
              </div>
              <div className='contact-infos'>
                <div className='inputs-col'>
                  <div className="input-container order-type">
                    <RadioButton inputId="ingredient1"  value="orderNow" onChange={(e) => setOrderType(e.value)} checked={orderType === "orderNow"} />
                    <label htmlFor="ingredient1" className="ml-2">الطلب الان</label>
                  </div>
                  <div className="input-container order-type">
                    <RadioButton inputId="ingredient1"  value="orderLater" onChange={(e) => setOrderType(e.value)} checked={orderType === "orderLater"} />
                    <label htmlFor="ingredient1" className="ml-2">الطلب لاحقا</label>
                  </div>
                </div>
                <div className={orderType==='orderNow'?"pick-date-hide":"pick-date-show"}>
                  <div className="input-container order-type">
                    <Calendar placeholder='اختر المعاد المناسب' value={datetime12h} onChange={(e) => setDateTime12h(e.value)} showTime hourFormat="12" />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className='order-details'>
            <div className='col-container'>
              <div className='header-label'>
                <span>اختر نوع الطلب</span>
              </div>
              <div className='contact-infos'>
                <div className='inputs-col'>
                  <div className="input-container order-type">
                    <RadioButton inputId="ingredient1"  value="Delivery" onChange={(e) => setOrderHow(e.value)} checked={orderHow === "Delivery"} />
                    <label htmlFor="ingredient1" className="ml-2">توصيل</label>
                  </div>
                </div>
                <div className='inputs-col'>
                  <div className="input-container order-type">
                    <RadioButton inputId="ingredient1"  value="Pick Up" onChange={(e) => setOrderHow(e.value)} checked={orderHow === "Pick Up"} />
                    <label htmlFor="ingredient1" className="ml-2">استلام من اقرب فرع</label>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-container'>
              <div className='header-label'>
                <span>اختر طريقة الدفع</span>
              </div>
              <div className='contact-infos'>
                <div className='inputs-col'>
                  <div className="input-container order-type">
                    <RadioButton inputId="ingredient1"  value="Cash" onChange={(e) => setPaymentMethod(e.value)} checked={paymentMethod === "Cash"} />
                    <label htmlFor="ingredient1" className="ml-2">كاش</label>
                  </div>
                </div>
                <div className='inputs-col'>
                  <div className="input-container order-type">
                    <RadioButton inputId="ingredient1"  value="Credit" onChange={(e) => setPaymentMethod(e.value)} checked={paymentMethod === "Credit"} />
                    <label htmlFor="ingredient1" className="ml-2">البطاقة البنطيه</label>
                  </div>
                </div>
              </div>
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
      </div>
    </>
  )
}

export default Checkout;