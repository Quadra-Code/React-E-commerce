/* eslint-disable no-unused-vars */
import React, {Fragment,useState,useEffect,useRef } from 'react';
import Swal from 'sweetalert2'
import axios,{Axios} from 'axios';
import { Dialog } from 'primereact/dialog';
import { MultiSelect } from 'primereact/multiselect';
import { InputText } from "primereact/inputtext";
function Permissions() {
  const selected = useRef()
  const [visible, setVisible] = useState(false);
  const [screenVisible, setScreenVisible] = useState(false);
  const [sections , setSections] = useState();
  const [sub_categories,setSub_categories] = useState([]); 
  const [selectedScreens, setSelectedScreens] = useState(null);
  const [permissionName, setPermissionName] = useState('');
  const [permissions, setPermissions] = useState();
  const [allScreens, setAllScreens] = useState();
  const [permissionScreens, setPermissionScreens] = useState();
  // const screens = [
  //   { name: 'إضافة اوردر', permission_screen: '2' },
  //   { name: 'أضافة موظفين', permission_screen: '3' },
  //   { name: 'أضافة عملاء', permission_screen: '4' },
  //   { name: 'عمل طلبات', permission_screen: '5' },
  // ]
  useEffect (()=>{
    getAllPermissions()
    getAllScreens()
    // console.log(selectedScreens&& selectedScreens.map((code)=>{return(code.slice(1))}));
  },[])
  // console.log(selectedScreens[0]);
  const getAllPermissions =() =>{
    axios.get(`http://127.0.0.1:8000/permission-api/all`)
    .then((response)=>{
      setPermissions(response.data);
      console.log(response.data);
    })
    .catch((error)=>{console.log(error);})
  }
  const getAllScreens =() =>{
    axios.get(`http://127.0.0.1:8000/permission-api/screens`)
    .then((response)=>{
      setAllScreens(response.data);
      console.log(response.data);
    })
    .catch((error)=>{console.log(error);})
  }
  const handleAddPermission =async ()=>{
    console.log(selectedScreens);
    axios.post(`http://127.0.0.1:8000/permission-api/nested`,{
      permission_name:permissionName,
      permission_screens:selectedScreens
    }).then((response)=>{
      getAllPermissions();
      setPermissionName("");
      setSelectedScreens(null);
    })
    .catch((error)=>{console.log(error)})
    setVisible(false)
  }
  const handleViewPermission = (permissionID)=> {
    const addBtn = document.querySelector('.addSubBtn');
    addBtn.setAttribute('id', `${permissionID}`)
    addBtn.removeAttribute('hidden')
    axios.get(`http://127.0.0.1:8000/permission-api/${permissionID}`)
    .then((response)=>{
      console.log(response.data);
      setPermissionScreens(response.data);
    })
    .catch((error)=>{console.log(error);})
  }
  const handleDeletePermission = (permissionID)=> {
    axios.delete(`http://127.0.0.1:8000/permission-api/${permissionID}`)
    .then((response)=>{
      console.log(response.data);
      getAllPermissions()
    })
    .catch((error)=>{console.log(error);})
  }
  const handleEditPermission = async (permissionID, permissionName)=> {
    const addPopup = await Swal.fire({
      title: 'أضافة قسم جديد',
      html:
        `<input id="swal-input1" value= '${permissionName}' class="swal2-input">` ,
      focusConfirm: false,
    })
    const permission_name = document.getElementById('swal-input1').value;
    if (permission_name!==""){
      axios.put(`http://127.0.0.1:8000/permission-api/${permissionID}`, {
        permission_name
      })
      .then((res)=>{
        console.log(res);
        getAllPermissions()
      })
      .catch((error)=>{
        console.log(error);
      });
    } 
  }
  const handleAddScreen = ()=> {
    const btnId = document.querySelector('.addSubBtn').getAttribute('id');
    axios.post(`http://127.0.0.1:8000/permission-api/${btnId}`,{
      permission_screens:selectedScreens
    }).then((response)=>{
      setSelectedScreens(null);
      setScreenVisible(false);
      setPermissionScreens(response.data)
    })
    .catch((error)=>{console.log(error)})
    setVisible(false)
  }
  const handleEditScreen = async (screenID, screenName)=> {
    const addPopup = await Swal.fire({
      title: 'أضافة قسم جديد',
      html:
        `<input id="swal-input1" value= '${screenName}' class="swal2-input">` ,
      focusConfirm: false,
    })
    const screen_name = document.getElementById('swal-input1').value;
    if (screen_name!==""){
      axios.put(`http://127.0.0.1:8000/permission-screen-api/${screenID}`, {
        screen_name
      })
      .then((response)=>{
        console.log(response);
        setPermissionScreens(response.data)
      })
      .catch((error)=>{
        console.log(error);
      });
    } 
  }
  const handleDeleteScreen = (screenID)=> {
    axios.delete(`http://127.0.0.1:8000/permission-screen-api/${screenID}`)
    .then((response)=>{
      setPermissionScreens(response.data)
    })
    .catch((error)=>{console.log(error);})
  }
  const getAllSections = async ()=> {
    try {
      const response = await axios.get('https://reactdjangoecommerce.pythonanywhere.com/add-show-categories-api');
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
        axios.post('https://reactdjangoecommerce.pythonanywhere.com/add-show-categories-api', {
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
      axios.put(`https://reactdjangoecommerce.pythonanywhere.com/rud-categories-api/${id}`, {
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
        axios.post(`https://reactdjangoecommerce.pythonanywhere.com/sub-categories-api/${id}`, {
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
        axios.put(`https://reactdjangoecommerce.pythonanywhere.com/sub-categories-api/${id}`, {
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
        axios.delete(`https://reactdjangoecommerce.pythonanywhere.com/rud-categories-api/${section.id}`)
        .then ((res)=>{
          console.log(res);
          setSections(res.data)
          axios.get(`https://reactdjangoecommerce.pythonanywhere.com/sub-categories-api/${section.id}`,{})
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
        axios.delete(`https://reactdjangoecommerce.pythonanywhere.com/sub-categories-api/${id}`)
        .then ((res)=>{
          console.log(res);
          setSub_categories(res.data)
        })
      }
    })
  }
  return (
    <Fragment>
        <div className="card flex justify-content-center permissions">
          <Dialog header="إضافة صلاحية" className='permission-dialog' visible={visible}  onHide={() => setVisible(false)}>
            <div className="add-permission-pop">
              <div className="add-permission-inputs">
                <InputText value={permissionName} placeholder='أسم الصلاحية' onChange={(e) => setPermissionName(e.target.value)} />
                <MultiSelect value={selectedScreens} onChange={(e) => setSelectedScreens(e.value)} options={allScreens} optionLabel="screen_name" 
                  placeholder="أختر الشاشة" maxSelectedLabels={3} className="w-full md:w-20rem" />
              </div>
              <div className="add-permission-btn">
                <button onClick={handleAddPermission}>حسنا</button>
              </div>
            </div>
          </Dialog>
          <Dialog header="إضافة شاشة" className='permission-dialog' visible={screenVisible}  onHide={() => setScreenVisible(false)}>
            <div className="add-permission-pop">
              <div className="add-permission-inputs">
                <MultiSelect value={selectedScreens} onChange={(e) => setSelectedScreens(e.value)} options={allScreens} optionLabel="screen_name" 
                  placeholder="أختر الشاشة" maxSelectedLabels={3} className="w-full md:w-20rem" />
              </div>
              <div className="add-permission-btn">
                <button onClick={handleAddScreen}>حسنا</button>
              </div>
            </div>
          </Dialog>
        </div>
        <section className="topSec">
          <div className="topSec-content" >
            <div>
              <img alt="img" src="https://img.icons8.com/bubbles/100/null/purchase-order.png"/>
            </div>
            <h1 >اضافة الصلاحيات</h1>
          </div>
          <div className='allElements'>
            <div className='outerTable'>
              <div className='addBtn'>
                <button onClick={() => setVisible(true)}>
                  <i className="fa-solid fa-plus" style={{color:'#ffffff'}}></i>
                  <span>اضافه</span>
                </button>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>أسم الصلاحية</th>
                    <th>خيارات</th>
                  </tr>
                </thead>
                <tbody>
                  {permissions&& permissions.map((permission)=>
                    <tr id={`tr${permission.id}`} ref={selected} key={permission.id}>
                      <td >{permission.permission_name}</td>
                      <td>
                        <button className='button' onClick={()=>handleEditPermission(permission.id, permission.permission_name)}>
                          <i className="pi pi-pencil" style={{'color':'rgb(82 206 114)'}}></i>
                        </button>
                        <button className='button' onClick={()=>handleViewPermission(permission.id)}>
                          <i className="pi pi-eye"style={{'color':'rgb(51, 175, 247)'}} ></i>
                        </button>
                        <button className='button' onClick={()=>handleDeletePermission(permission.id)}>
                          <i className="pi pi-trash" style={{'color':'rgb(180, 26, 26)'}}></i>
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className='outerTable'>
              <div onClick={()=>{setScreenVisible(true)}} hidden className='addBtn addSubBtn'>
                <button>
                  <i className="fa-solid fa-plus" style={{color:'#ffffff'}}></i>
                  <span>اضافه</span>
                </button>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>أسم الشاشة</th>
                    <th>خيارات</th>
                  </tr>
                </thead>
                <tbody id='subCategory_body'>
                  {permissionScreens&& permissionScreens.map((screen)=>
                    <tr key={screen.id}>
                      <td>{screen.screen_name}</td>
                      <td>
                        <button className='button'onClick={()=>{handleEditScreen(screen.id,screen.screen_name)}}>
                          <i className="pi pi-pencil" style={{'color':'rgb(51, 175, 247)'}}></i>
                        </button>
                        <button className='button' onClick={()=>handleDeleteScreen(screen.id)}>
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

export default Permissions

