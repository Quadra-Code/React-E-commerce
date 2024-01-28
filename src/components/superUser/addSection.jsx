/* eslint-disable no-unused-vars */
import React, {Fragment,useState,useEffect,useRef } from 'react';
import Swal from 'sweetalert2'
import axios,{Axios} from 'axios';
function AddSections() {
  const selected = useRef()
  const [sections , setSections] = useState();
  const [sub_categories,setSub_categories] = useState([]); 
  useEffect (()=>{
    getAllSections()
    // console.log(btnId);
  })
  const getAllSections = async ()=> {
    try {
      const response = await axios.get('https://badil.pythonanywhere.com/add-show-categories-api');
      setSections(response.data)
      // console.log(response.data)
    } catch (error) {
      console.error(error);
    } 
  }
  // const category_fk = sub_categories&& sub_categories[0].category_fk
  const handleView = async (id, trClass)=> {
    const selectedTr= document.querySelector(trClass);
    const childNodes= Array.from(selectedTr.parentNode.children);
    // console.log(childNodes);
    childNodes.map((child)=>child.classList.remove(`selected`));
    selectedTr.classList.toggle('selected');
    const addBtn = document.querySelector('.addSubBtn');
    addBtn.setAttribute('id', `${id}`)
    addBtn.removeAttribute('hidden')
    // console.log(addBtn);
    axios.get (`https://badil.pythonanywhere.com/sub-categories-api/${id}`,{})
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
    .then((data)=>{
      const category_name = document.getElementById('swal-input1').value;
      if (category_name!=="" && data.isConfirmed){
        axios.post('https://badil.pythonanywhere.com/add-show-categories-api', {
          category_name:category_name
        })
        .then((res)=>{
          setSections(res.data);
          console.log(res);
        })
        .catch((error)=>{
          console.log(error);
        });
      } 
    })
  }
  // http://localhost:9000/sections
  // https://reactdjangoecommerce.pythonanywhere.com/categories-list
  const handleEdit =async (id , name)=>{
    const addPopup = await Swal.fire({
      title: 'أضافة قسم جديد',
      html:
        `<input id="swal-input1" value= '${name}' class="swal2-input">` ,
      focusConfirm: false,
    })
    const category_name = document.getElementById('swal-input1').value;
    if (category_name!==""){
      axios.put(`https://badil.pythonanywhere.com/rud-categories-api/${id}`, {
        category_name
      })
      .then((res)=>{
        console.log(res);
        setSections(res.data)
      })
      .catch((error)=>{
        console.log(error);
      });
    } 
  }
  const handleAdd_sub =async ()=>{
    const btnId = document.querySelector('.addSubBtn').getAttribute('id');
    console.log(btnId);
    if (btnId!==null) {
      const addPopup = await Swal.fire({
        title: 'أضافة قسم فرعي جديد',
        html:
          '<input id="swal-input2"  placeholder="أسم القسم" class="swal2-input">' ,
        focusConfirm: false,
      })
      const id = btnId;
      const sub_name = document.getElementById('swal-input2').value;
      if (sub_name!==""){
        axios.post(`https://badil.pythonanywhere.com/sub-categories-api/${id}`, {
          sub_category_name: sub_name,
          category_fk: id
        })
          .then((res) => {
          setSub_categories(res.data)
          console.log(res);
        })
        .catch((error)=>{
          console.log(error);
        });
      } 
    }
  }
  const handleEdit_sub =async (id,name,category_fk)=>{
    const subCategory_body = document.getElementById('subCategory_body');
    console.log(subCategory_body.children);
    if (subCategory_body.children.length!==0) {
      const addPopup = await Swal.fire({
        title: 'أضافة قسم فرعي جديد',
        html:
          `<input id="swal-input2" value='${name}' class="swal2-input">` ,
        focusConfirm: false,
      })
      const sub_name = document.getElementById('swal-input2').value;
      console.log(name);
      if (sub_name!==""){
        axios.put(`https://badil.pythonanywhere.com/sub-categories-api/${id}`, {
          sub_category_name: sub_name,
          category_fk
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
      console.log(section.id);
      if(data.isConfirmed){
        axios.delete(`https://badil.pythonanywhere.com/rud-categories-api/${section.id}`)
        .then ((res)=>{
          console.log(res);
          setSections(res.data)
          axios.get(`https://badil.pythonanywhere.com/sub-categories-api/${section.id}`,{})
          .then((res)=>{
            setSub_categories(res.data)
            console.log(res);
          })
          .catch((error)=>{
            console.log(error);
          });
        })
      }
    })
  }
  const handleDeleteSub = (id,name)=> {
    Swal.fire({
      title: `Are you sure you want to delete ${name}?`,
      showCancelButton:true,
    }).then((data)=>{
      if(data.isConfirmed){
        axios.delete(`https://badil.pythonanywhere.com/sub-categories-api/${id}`)
        .then ((res)=>{
          console.log(res);
          setSub_categories(res.data)
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
                        <button className='button' onClick={()=>handleEdit(section.id, section.category_name)}>
                          <i className="pi pi-pencil" style={{'color':'rgb(82 206 114)'}}></i>
                        </button>
                        <button className='button' onClick={()=>handleView(section.id, `#tr${section.id}`)}>
                          <i className="pi pi-eye"style={{'color':'rgb(51, 175, 247)'}} ></i>
                        </button>
                        <button className='button' onClick={()=>handleDelete(section)}>
                          <i className="pi pi-trash" style={{'color':'rgb(180, 26, 26)'}}></i>
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className='outerTable'>
              <div onClick={()=>{handleAdd_sub()}} hidden className='addBtn addSubBtn'>
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
                <tbody id='subCategory_body'>
                  {sub_categories&& sub_categories.map((subCategory)=>
                    <tr key={subCategory.id}>
                      <td>{subCategory.sub_category_name}</td>
                      <td hidden>{subCategory.category_fk}</td>
                      <td>
                        <button className='button'onClick={()=>{handleEdit_sub(subCategory.id,subCategory.sub_category_name,subCategory.category_fk)}}>
                          <i className="pi pi-pencil" style={{'color':'rgb(51, 175, 247)'}}></i>
                        </button>
                        <button className='button' onClick={()=>handleDeleteSub(subCategory.id,subCategory.sub_category_name,subCategory.category_fk)}>
                          <i className="pi pi-trash"style={{'color':'rgb(180, 26, 26)'}} ></i>
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

export default AddSections
