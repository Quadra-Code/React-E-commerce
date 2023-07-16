/* eslint-disable no-unused-vars */
import React, {Fragment,useState,useEffect,useRef } from 'react';
import Swal from 'sweetalert2'
import axios,{Axios} from 'axios';
function AddSections() {
  const selected = useRef()
  const [sections , setSections] = useState();
  const [sub_categories,setSub_categories] = useState(); 
  useEffect (()=>{
    getAllSections()
  },[])
  const getAllSections = async ()=> {
    try {
      const response = await axios.get('https://reactdjangoecommerce.pythonanywhere.com/add-show-categories-api');
      setSections(response.data)
      // console.log(response.data)
    } catch (error) {
      console.error(error);
    } 
  }
  const getSub_sections = async ()=> {
    try {
      const response = await axios.get('http://reactdjangoecommerce.pythonanywhere.com/sub-categories-list');
      setSub_categories(response.data)
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
    axios.get (`https://reactdjangoecommerce.pythonanywhere.com/sub-categories-list/${id}`,{})
    .then((res)=>{
      // getSub_sections()
      setSub_categories(res.data)
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
        '<input id="swal-input1" required placeholder="أسم القسم" class="swal2-input">' ,
      focusConfirm: false,
    })
    const category_name = document.getElementById('swal-input1').value;
    if (category_name!==""){
      axios.post('https://reactdjangoecommerce.pythonanywhere.com/add-show-categories-api', {
        category_name:category_name
      })
      .then((res)=>{
        const newSection = {id:res.data.id, category_name };
        setSections([...sections, newSection]);
        console.log(res);
      })
      .catch((error)=>{
        console.log(error);
      });
    } 
  }
  // http://localhost:9000/sections
  // https://reactdjangoecommerce.pythonanywhere.com/categories-list
  const handleEdit =async (id , name)=>{
    const addPopup = await Swal.fire({
      title: 'أضافة قسم جديد',
      html:
        `<input id="swal-input1" value= ${name} placeholder="أسم القسم" class="swal2-input">` ,
      focusConfirm: false,
    })
    const category_name = document.getElementById('swal-input1').value;
    if (category_name!==""){
      axios.put(`https://reactdjangoecommerce.pythonanywhere.com/rud-product-api/${id}`, {
        category_name
      })
      .then((res)=>{
        console.log(res);
        getAllSections()
      })
      .catch((error)=>{
        console.log(error);
      });
    } 
  }
  const handleAdd_sub =async ()=>{
    const subCategory_body = document.getElementById('subCategory_body');
    console.log(subCategory_body.children);
    if (subCategory_body.children.length!==0) {
      const addPopup = await Swal.fire({
        title: 'أضافة قسم فرعي جديد',
        html:
          '<input id="swal-input2"  placeholder="أسم القسم" class="swal2-input">' ,
        focusConfirm: false,
      })
      const sub_name = document.getElementById('swal-input2').value;
      if (sub_name!==""){
        axios.post(`https://reactdjangoecommerce.pythonanywhere.com/sub-categories-list`, {
          sub_name
        })
        .then((res)=>{
          const new_subCategory = {id:res.data.id, sub_name };
          setSub_categories([...sub_categories, new_subCategory]);
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
      console.log(name);
      if (sub_name!==""){
        axios.put(`https://reactdjangoecommerce.pythonanywhere.com/sub-categories-list/${id}`, {
          sub_category_name: sub_name
        })
        .then((res)=>{
          setSub_categories(res.data)
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
        fetch(`https://reactdjangoecommerce.pythonanywhere.com/rud-product-api/${section.id}`, {
          method: "DELETE",
        })
        .then((res)=>res.json())
        .then ((data)=>{
          console.log(data);
          getAllSections()
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
            <h1 >اضافة الاقسام</h1>
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
                    <th>الاقسام</th>
                    <th>خيارات</th>
                  </tr>
                </thead>
                <tbody>
                  {sections&& sections.map((section)=>
                    <tr id={`tr${section.id}`} ref={selected} key={section.id}>
                      <td >{section.category_name}</td>
                      <td>
                        <button className='edit' onClick={()=>handleEdit(section.id, section.category_name)}>
                          <i className="fa-solid fa-pen" style={{color:'#ffffff'}}></i>
                        </button>
                        <button className='view' onClick={()=>handleView(section.id, `#tr${section.id}`)}>
                          <i className="fa-regular fa-eye" style={{color:'#000'}}></i>
                        </button>
                        <button className='delete' onClick={()=>handleDelete(section)}>
                          <i className="fa-regular fa-trash-can" style={{color:'#ffffff'}}></i>
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className='outerTable'>
              {sub_categories && 
                <div onClick={handleAdd_sub} className='addBtn'>
                  <button>
                    <i className="fa-solid fa-plus" style={{color:'#ffffff'}}></i>
                    <span>اضافه</span>
                  </button>
                </div>
              }
              <table>
                <thead>
                  <tr>
                    <th>الاقسام الفرعيه</th>
                    <th>خيارات</th>
                  </tr>
                </thead>
                <tbody id='subCategory_body'>
                  {sub_categories&& sub_categories.map((subCategory)=>
                    <tr key={subCategory.id}>
                      <td >{subCategory.sub_category_name}</td>
                      <td>
                        <button className='edit'onClick={()=>{handleEdit_sub(subCategory.id,subCategory.sub_category_name)}}>Edit</button>
                        <button className='delete' onClick={()=>handleDelete(subCategory)}>Delete</button>
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

export default AddSections
