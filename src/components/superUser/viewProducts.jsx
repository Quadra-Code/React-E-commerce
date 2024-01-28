/* eslint-disable no-unused-vars */
import React, {Fragment,useState,useEffect, } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios';
// import ViewProduct from './viewProduct';
function ViewProducts() {
  const [sub_categories,setSub_categories] = useState([]); 
  const [products,setProducts] = useState(); 
  const [addID, setAddID] =useState('')
  useEffect (()=>{
    getAllSub_sections()
    // getAll_products()
  },[])
  const getAllSub_sections = async ()=> {
    try {
      const response = await axios.get('https://badil.pythonanywhere.com/sub-categories-list');
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
    const addBtn = document.querySelector('.addProBtn');
    addBtn.removeAttribute('hidden')
    setAddID(id)
    console.log(addID);
    axios.get (`https://badil.pythonanywhere.com/crud-products-api/s${id}`)
    .then((res)=>{
      setProducts(res.data)
      console.log(res);
    })
    .catch((error)=>{
      console.log(error);
    });
  }
  const handleView_product = async (id, trClass)=> {
    const selectedTr= document.querySelector(trClass);
    const childNodes= Array.from(selectedTr.parentNode.children);
    // console.log(childNodes);
    childNodes.map((child)=>child.classList.remove(`selected`));
    selectedTr.classList.toggle('selected');
    // axios.get (`https://badil.pythonanywhere.com/crud-products/${id}`)
    // .then((res)=>{
    //   setProduct(res.data)
    //   console.log(res);
    // })
    // .catch((error)=>{
    //   console.log(error);
    // });
  }
  const handleDelete = (product)=> {
    Swal.fire({
      title: `Are you sure you want to delete ${product.product_name}?`,
      showCancelButton:true,
    }).then((data)=>{
      if(data.isConfirmed){
        axios.delete(`https://badil.pythonanywhere.com/crud-products-api/p${product.id}`)
        .then ((res)=>{
          // console.log(res);
          setProducts(res.data)
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
                      <button className='button' onClick={()=>handleView(subCategory.id, `#tr${subCategory.id}`)}>
                        <i className="pi pi-eye" style={{'color':'rgb(51, 175, 247)'}}></i>
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className='outerTable'>
            <div className='addBtn addProBtn' hidden >
              <button >
                <NavLink style={{color:'#fff'}} to={`/super-user/add-product/${addID}`}>
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
                      <button className='button' onClick={()=>handleView_product(product.id)}>
                        <NavLink style={{color:'#000'}} to={`/super-user/view-product/${product.id}`}>
                          <i className="pi pi-eye" style={{'color':'rgb(51, 175, 247)'}}></i>
                        </NavLink>
                      </button>
                      <button className='button' onClick={()=>handleDelete(product)}>
                        <i className="pi pi-trash" style={{'color':'rgb(180, 26, 26)'}}></i>
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

export default  ViewProducts

