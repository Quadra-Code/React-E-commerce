/* eslint-disable no-unused-vars */
import React, {Fragment,useState,useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios';
function AddProducts() {
  const [subCategories , setSubCategories] = useState();
  const [products,setProducts] = useState(); 
  useEffect (()=>{
    getAllSub_sections()
    get_products()
  },[])
  const getAllSub_sections = async ()=> {
    try {
      const response = await axios.get('http://localhost:5000/sub_categories');
      setSubCategories(response.data)
      // console.log(response.data)
    } catch (error) {
      console.error(error);
    } 
  }
  const get_products = async ()=> {
    try {
      const response = await axios.get('http://localhost:7000/products');
      setProducts(response.data)
      console.log(response.data)
    } catch (error) {
      console.error(error);
    } 
  }
  const handleView = async (id, trClass)=> {
    const selectedTr= document.querySelector(trClass);
    const childNodes= Array.from(selectedTr.parentNode.children);
    // console.log(childNodes);
    childNodes.map((child)=>child.classList.remove(`selected`));
    selectedTr.classList.toggle('selected');
    axios.post (`http://localhost:5000/sub_categories`,{
      id
    })
    .then((res)=>{
      get_products()
      console.log(res);
    })
    .catch((error)=>{
      console.log(error);
    });
  }
  const handleAdd =async ()=>{
    const addPopup = await Swal.fire({
      title: 'أضافة قسم جديد',
      html:
        '<input id="swal-input1"  placeholder="أسم القسم" class="swal2-input">' ,
      focusConfirm: false,
    })
    const category_name = document.getElementById('swal-input1').value;
    if (category_name!==""){
      axios.post('http://localhost:5000/sub_categories', {
        category_name
      })
      .then((res)=>{
        const newSection = {id:res.data.id, category_name };
        setSubCategories([...subCategories, newSection]);
        console.log(res);
      })
      .catch((error)=>{
        console.log(error);
      });
    } 
  }
  const handleEdit =async (id , name)=>{
    const addPopup = await Swal.fire({
      title: 'أضافة قسم جديد',
      html:
        `<input id="swal-input1" value= ${name} placeholder="أسم القسم" class="swal2-input">` ,
      focusConfirm: false,
    })
    const category_name = document.getElementById('swal-input1').value;
    if (category_name!==""){
      axios.put(`http://localhost:5000/sub_categories/${id}`, {
        category_name
      })
      .then((res)=>{
        console.log(res);
        getAllSub_sections()
      })
      .catch((error)=>{
        console.log(error);
      });
    } 
  }
  const AddProduct =async ()=>{
    const subCategory_body = document.getElementById('subCategory_body');
    console.log(subCategory_body.children);
    if (subCategory_body.children.length!==0) {
      const addPopup = await Swal.fire({
        title: 'أضافة قسم فرعي جديد',
        html:
          '<input id="swal-input2"  placeholder="أسم القسم" class="swal2-input">' ,
        focusConfirm: false,
      })
      const product_name = document.getElementById('swal-input2').value;
      if (product_name!==""){
        axios.post(`http://localhost:5000/products`, {
          product_name
        })
        .then((res)=>{
          const new_product = {id:res.data.id, product_name };
          setProducts([...products, new_product]);
          console.log(res);
        })
        .catch((error)=>{
          console.log(error);
        });
      } 
    }
  }
  const handleEdit_sub =async (id,name)=>{
    const subCategory_body = document.getElementById('subCategory_body');
    console.log(subCategory_body.children);
    if (subCategory_body.children.length!==0) {
      const addPopup = await Swal.fire({
        title: 'أضافة قسم فرعي جديد',
        html:
          `<input id="swal-input2" value=${name} placeholder="أسم القسم" class="swal2-input">` ,
        focusConfirm: false,
      })
      const sub_name = document.getElementById('swal-input2').value;
      if (sub_name!==""){
        axios.put(`http://localhost:5000/products/${id}`, {
          sub_name
        })
        .then((res)=>{
          get_products()
          console.log(res);
        })
        .catch((error)=>{
          console.log(error);
        });
      } 
    }
  }
  const handleDelete = (section)=> {
    Swal.fire({
      title: `Are you sure you want to delete ${section.category_name}?`,
      showCancelButton:true,
    }).then((data)=>{
      if(data.isConfirmed){
        fetch(`http://localhost:9000/sections/${section.id}`, {
          method: "DELETE",
        })
        .then((res)=>res.json())
        .then ((data)=>{
          console.log(data);
          getAllSub_sections()
        })
      }
    })
  }
  return (
    <Fragment>
      <section className="topSec">
        <div className="topSec-content" >
          <div>
            <img alt="img" src="https://img.icons8.com/bubbles/100/null/purchase-order.png"/>
          </div>
          <h1 >اضافة المنتجات</h1>
        </div>
        <div className='allElements'>
          <div className='outerTable'>
            <div onClick={handleAdd} className='addBtn'>
              <button>
                <i className="fa-solid fa-plus" style={{color:'#ffffff'}}></i>
                <span>اضافه</span>
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>الاقسام الفرعيه</th>
                  <th>خيارات</th>
                </tr>
              </thead>
              <tbody>
                {subCategories&& subCategories.map((subCategory)=>
                  <tr id={`tr${subCategory.id}`} key={subCategory.id}>
                    <td >{subCategory.sub_name}</td>
                    <td>
                      <button className='edit' onClick={()=>handleEdit(subCategory.id, subCategory.sub_name)}>
                        <i className="fa-solid fa-pen" style={{color:'#ffffff'}}></i>
                      </button>
                      <button className='view' onClick={()=>handleView(subCategory.id, `#tr${subCategory.id}`)}>
                        <i className="fa-regular fa-eye" style={{color:'#000'}}></i>
                      </button>
                      <button className='delete' onClick={()=>handleDelete(subCategory)}>
                        <i className="fa-regular fa-trash-can" style={{color:'#ffffff'}}></i>
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className='outerTable'>
            <div className='addBtn'>
              <button>
                <NavLink style={{color:'#fff'}} to='/super-user/product-details'>
                  <i className="fa-solid fa-plus" style={{color:'#ffffff'}}></i>
                  <span>اضافه</span>
                </NavLink>
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>أسم المنتج</th>
                  <th>خيارات</th>
                </tr>
              </thead>
              <tbody id='subCategory_body'>
                {products&& products.map((product)=>
                  <tr id={`tr${product.id}`} key={product.id}>
                    <td >{product.product_name}</td>
                    <td>
                      <button className='edit'onClick={()=>{handleEdit_sub(products.id,products.sub_name)}}>
                        <i className="fa-solid fa-pen" style={{color:'#ffffff'}}></i>
                      </button>
                      <button className='view' >
                        <NavLink style={{color:'#000'}} to='/super-user/product-details'>
                          <i class="fa-regular fa-eye" style={{color:'#000'}}></i>
                        </NavLink>
                      </button>
                      <button className='delete' onClick={()=>handleDelete(products)}>
                        <i className="fa-regular fa-trash-can" style={{color:'#ffffff'}}></i>
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default AddProducts
