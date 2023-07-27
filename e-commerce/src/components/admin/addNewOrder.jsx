import React, {Fragment,useState,useEffect, } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

export default function AddNewOrder() {
  const [sub_categories,setSub_categories] = useState([]); 
  const [sections , setSections] = useState();
  const [products,setProducts] = useState(); 
  const [addID, setAddID] =useState('')
  const [name, setName] = useState('احمد')
  const [number, setNumber] = useState('015949843')
  const [selectedCity, setSelectedCity] = useState(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [cities,setCities] = useState([
    { name: 'الزهراء', code: 'NY' },
    { name: 'سيتي', code: 'RM' },
    { name: 'اكتوبر', code: 'LDN' },
    { name: 'الخارجه', code: 'IST' },
  ]); 
  useEffect (()=>{
    // getAllSub_sections()
    getAllSections()
    // getAll_products()
    handleView()
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
  // const getAllSub_sections = async ()=> {
  //   try {
  //     const response = await axios.get('https://reactdjangoecommerce.pythonanywhere.com/sub-categories-list');
  //     setSub_categories(response.data)
  //     // console.log(response.data)
  //   } catch (error) {
  //     console.error(error);
  //   } 
  // }
  const handleView = async (id, trClass)=> {
    const selectedTr= document.querySelector(trClass);
    const childNodes= Array.from(selectedTr.parentNode.children);
    console.log(childNodes);
    childNodes.map((child)=>child.classList.remove(`selected`));
    selectedTr.classList.toggle('selected');
    const addBtn = document.querySelector('.addProBtn');
    addBtn.removeAttribute('hidden')
    setAddID(id)
    console.log(addID);
    axios.get (`https://reactdjangoecommerce.pythonanywhere.com/sub-categories-api/${id}`,{})
    .then((res)=>{
      // getSub_sections()
      setSub_categories(res.data)
      console.log(res);
    })
    .catch((error)=>{
      console.log(error);
    });
  }
  const handleView_products = async (id, trClass)=> {
    const selectedTr= document.querySelector(trClass);
    const childNodes= Array.from(selectedTr.parentNode.children);
    // console.log(childNodes);
    childNodes.map((child)=>child.classList.remove(`selected`));
    selectedTr.classList.toggle('selected');
    const addBtn = document.querySelector('.addProBtn');
    addBtn.removeAttribute('hidden')
    setAddID(id)
    console.log(addID);
    axios.get (`https://reactdjangoecommerce.pythonanywhere.com/crud-products/s${id}`)
    .then((res)=>{
      setProducts(res.data)
      console.log(res);
    })
    .catch((error)=>{
      console.log(error);
    });
  }
  const handleAdd_pro = async (id, trClass)=> {
    Swal.fire({
      position: 'top-start',
      icon: 'success',
      title: 'تم الاضافه الي العربه',
      showConfirmButton: false,
      timer: 1500
    })
    const selectedTr= document.querySelector(trClass);
    const childNodes= Array.from(selectedTr.parentNode.children);
    // console.log(childNodes);
    childNodes.map((child)=>child.classList.remove(`selected`));
    selectedTr.classList.toggle('selected');
    // axios.get (`https://reactdjangoecommerce.pythonanywhere.com/crud-products/${id}`)
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
        axios.delete(`https://reactdjangoecommerce.pythonanywhere.com/crud-products/p${product.id}`)
        .then ((res)=>{
          // console.log(res);
          setProducts(res.data)
        })
      }
    })
  }
  const handleSelect_add = ()=>{
    Swal.fire({
      title: 'أضافة  عنوان جديد',
      html:
        '<input id="swal-input1" required placeholder=" العنوان" class="swal2-input">' ,
      focusConfirm: false,
    })
    .then((data)=>{
      const category_name = document.getElementById('swal-input1').value;
      if (category_name!=="" && data.isConfirmed){
        // axios.post('https://reactdjangoecommerce.pythonanywhere.com/add-show-categories-api', {
        //   category_name:category_name
        // })
        // .then((res)=>{
          const newAddress = {name:category_name, code:5};
          setCities([...cities, newAddress]);  
          // setSections(res.data);
          // console.log(res);
        // })
        // .catch((error)=>{
        //   console.log(error);
        // });
      } 
    })
  }
  return (
    <Fragment>
      <section className="topSec">
        <div className="topSec-content infoCont" >
          <InputText disabled value={name} onChange={(e) => setName(e.target.value)} />
          <InputText disabled value={number} onChange={(e) => setNumber(e.target.value)} />
          <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
            placeholder="العنوان" className="w-full md:w-14rem" />
          <button onClick={handleSelect_add}>
            <i className="pi pi-plus" ></i>
            <span>اضافة عنوان جديد</span>
          </button>
        </div>
        <div className='allElements addOrder_tables'>
          <div className='outerTable'>
            {/* <div onClick={handleAdd} className='addBtn'>
              <button>
                <i className="fa-solid fa-plus" style={{color:'#ffffff'}}></i>
                <span>اضافه</span>
              </button>
            </div> */}
            <table>
              <thead>
                <tr>
                  <th>الاقسام</th>
                  <th>خيارات</th>
                </tr>
              </thead>
              <tbody>
                {sections&& sections.map((section)=>
                  <tr id={`tr${section.id}`}  key={section.id}>
                    <td >{section.category_name}</td>
                    <td>
                      {/* <button className='edit' onClick={()=>handleEdit(section.id, section.category_name)}>
                        <i className="pi pi-pencil" ></i>
                      </button> */}
                      <button className='view' onClick={()=>handleView(section.id, `#tr${section.id}`)}>
                        <i className="pi pi-eye" ></i>
                      </button>
                      {/* <button className='delete' onClick={()=>handleDelete(section)}>
                        <i className="pi pi-trash" ></i>
                      </button> */}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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
                      <button className='view' onClick={()=>handleView_products(subCategory.id, `#tr${subCategory.id}`)}>
                        <i className="pi pi-eye" ></i>
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className='outerTable last-child'>
            <div className='addBtn addProBtn' hidden >
              {/* <button >
                <NavLink style={{color:'#fff'}} to={`/super-user/add-product/${addID}`}>
                  <i className="fa-solid fa-plus" style={{color:'#ffffff'}}></i>
                  <span>اضافه</span>
                </NavLink>
              </button> */}
            </div>
            <table>
              <thead>
                <tr>
                  <th>أسم المنتج</th>
                  <th>المكونات</th>
                  <th>الملاحظات</th>
                  <th>خيارات</th>
                </tr>
              </thead>
              <tbody id='subCategory_body'>
                {products&& products.map((product)=>
                  <tr id={`tr${product.id}`} key={product.id}>
                    <td >{product.product_name}</td>
                    <td >{product.product_name}</td>
                    <td ><InputText  onChange={(e) => setName(e.target.value)} /></td>
                    <td>
                      <button className='view' onClick={()=>handleAdd_pro(product.id)}>
                          <i className="pi pi-plus"></i>
                        {/* <NavLink style={{color:'#000'}} to={`/super-user/view-product/${product.id}`}>
                        </NavLink> */}
                      </button>
                      {/* <button className='delete' onClick={()=>handleDelete(product)}>
                        <i className="pi pi-trash" ></i>
                      </button> */}
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

