/* eslint-disable no-unused-vars */
import React, {Fragment,useState,useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios';
function ViewProducts() {
  const [sub_categories,setSub_categories] = useState([]); 
  const [products,setProducts] = useState(); 
  useEffect (()=>{
    getAllSub_sections()
    // getAll_products()
  },[])
  const getAllSub_sections = async ()=> {
    try {
      const response = await axios.get('https://reactdjangoecommerce.pythonanywhere.com/sub-categories-list');
      setSub_categories(response.data)
      // console.log(response.data)
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
    axios.get (`https://reactdjangoecommerce.pythonanywhere.com/crud-products/${id}`)
    .then((res)=>{
      setProducts(res.data)
      console.log(res);
    })
    .catch((error)=>{
      console.log(error);
    });
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
          <h1 >عرض المنتجات</h1>
        </div>
        <div className='allElements'>
          <div className='outerTable'>
            <table>
              <thead>
                <tr>
                  <th>الاقسام الفرعيه</th>
                  <th>خيارات</th>
                </tr>
              </thead>
              <tbody>
                {sub_categories&& sub_categories.map((subCategory)=>
                  <tr id={`tr${subCategory.id}`} key={subCategory.id}>
                    <td >{subCategory.sub_category_name}</td>
                    <td>
                      <button className='view' onClick={()=>handleView(subCategory.id, `#tr${subCategory.id}`)}>
                        <i className="fa-regular fa-eye" style={{color:'#000'}}></i>
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
                      <button className='view' onClick={()=>handleDelete(products)}>
                        <NavLink style={{color:'#000'}} to='/super-user/product-details'>
                          <i className="fa-regular fa-eye" style={{color:'#000'}}></i>
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

export default ViewProducts
