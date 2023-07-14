/* eslint-disable no-unused-vars */
import React, {Fragment,useState,useEffect } from 'react';
import Swal from 'sweetalert2'
import axios from 'axios';
import icons from 'boxicons'
export default function ProductDetails() {
  const [categoryName, setCategoryName] = useState('');
  const [categoryPrice, setCategoryPrice] = useState('');
  const [categoryUnit, setCategoryUnit] = useState('');
  const [categoryDisc, setCategoryDisc] = useState('');
  const [categoryImages, setCategoryImages] = useState(['']);
  const handleOptionChange = (event) => {
    setCategoryUnit(event.target.value);
  }
  useEffect (()=>{
    console.log(categoryName)
    console.log(categoryPrice)
    console.log(categoryUnit)
    console.log(categoryDisc)
  })
  const uploadFile = ()=>{
    const inpFile = document.querySelector('.upload-file');
    inpFile.addEventListener('click', ()=>{
      inpFile.click()
    });
    inpFile.addEventListener('change', (e)=>{
      const file = e.target.files[0];
      setCategoryImages(file);
    });
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
  }
  return (
    <Fragment>
      <section className="topSec">
        <div className="topSec-content" >
          <div>
            <img width="64" height="64" src="https://img.icons8.com/cotton/64/purchase-order.png" alt="purchase-order"/>
          </div>
          <h1 >اضافة منتج جديد</h1>
        </div>
        <div className='allElements'>
          <div className="container">
            <form onSubmit={handleSubmit} action="">
              <div className="section">
                <div className='label'>
                  معلومات اساسيه
                </div>
                <div className='inp-container'>
                  <div className='input-cont' >
                    <input onChange={(e)=>setCategoryName(e.target.value)} type="text" placeholder='اسم المنتج'/>
                  </div>
                  <div className='input-cont'>
                    <input type="number" onChange={(e)=>setCategoryPrice(e.target.value)} placeholder='سعر المنتج'/>
                  </div>
                  <div className='input-cont'>
                    <select name="" id=""  onChange={handleOptionChange}>
                      <option value="اختر وحدة القياس" selected hidden disabled>اختر وحدة القياس</option>
                      <option value="كيلوجرام">كيلوجرام</option>
                      <option value="صينيه">صينيه</option>
                      <option value="قطعة">قطعة</option>
                    </select>
                    {/* <input type="text" onChange={(e)=>setCategoryUnit(e.target.value)} placeholder='وحدة قياس المنتج'/> */}
                  </div>
                </div>
              </div>
              <div className="section">
                <div className='label'>
                  وصف / صورة المنتج
                </div>
                <div className='inp-container'>
                  <div className='input-cont'>
                    <textarea name="" onChange={(e)=>{setCategoryDisc(e.target.value)}} placeholder='وصف المنتج' id="" cols="30" rows="10"></textarea>
                  </div>
                  <div className='image-container'>
                    <div className='image-view cont' >
                      <input className='upload-file' type="file"  hidden />
                      <box-icon size="lg"  name='cloud-upload' ></box-icon>
                      <span>من الضروري رفع الصور بصيغة webp </span>
                    </div>
                    <div className='selected-images cont'>
                      <div className='image'><img src={require('../../NEW QC/New folder/Pro1.jpg')} alt="" /></div>
                      <div className='image'><img src={require('../../NEW QC/New folder/Pro1.jpg')} alt="" /></div>
                      <div className='image'><img src={require('../../NEW QC/New folder/Pro1.jpg')} alt="" /></div>
                    </div>
                    <div className='select-btn cont'>
                      <button type='click' onClick={uploadFile}>رفع صوره</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section">
                <div className='label'>
                  معلومات صحيه
                </div>
                <div className='inp-container'>
                  <div className='input-cont'>
                    <input type="text" placeholder='السعرات الحراريه'/>
                  </div>
                  <div className='input-cont'>
                    <input type="text" placeholder='البروتين'/>
                  </div>
                  <div className='input-cont'>
                    <input type="text" placeholder='الدهون'/>
                  </div>
                  <div className='input-cont'>
                    <input type="text" placeholder='الكربوهيدرات'/>
                  </div>
                </div>
              </div>
              <div className="submit-section section">
                <button type='submit'>اضافة المنتج</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Fragment>
  )
}
