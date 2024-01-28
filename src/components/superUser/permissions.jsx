/* eslint-disable no-unused-vars */
import React, {Fragment,useState,useEffect,useRef } from 'react';
import Swal from 'sweetalert2'
import axios,{Axios} from 'axios';
import { Dialog } from 'primereact/dialog';
import { MultiSelect } from 'primereact/multiselect';
import { InputText } from "primereact/inputtext";
import { Toast } from 'primereact/toast';
function Permissions() {
  const selected = useRef()
  const [visible, setVisible] = useState(false);
  const [screenVisible, setScreenVisible] = useState(false);
  const [selectedScreens, setSelectedScreens] = useState(null);
  const [permissionName, setPermissionName] = useState('');
  const [permissions, setPermissions] = useState();
  const [allScreens, setAllScreens] = useState();
  const [availableScreens, setAvailableScreens] = useState();
  const [permissionScreens, setPermissionScreens] = useState();
  useEffect (()=>{
    getAllPermissions()
    getAllScreens()
  },[])
  const toast = useRef(null);
  const getAllPermissions =() =>{
    axios.get(`https://badil.pythonanywhere.com/permission-api/all`)
    .then((response)=>{
      setPermissions(response.data);
      console.log(response.data);
    })
    .catch((error)=>{console.log(error);})
  }
  const getAllScreens =() =>{
    axios.get(`https://badil.pythonanywhere.com/permission-screen-api/all`)
    .then((response)=>{
      setAllScreens(response.data);
      console.log(response.data);
    })
    .catch((error)=>{console.log(error);})
  }
  const handleAddPermission =async ()=>{
    console.log(selectedScreens);
    axios.post(`https://badil.pythonanywhere.com/permission-api/nested`,{
      permission_name:permissionName,
      permission_screens:selectedScreens
    }).then((response)=>{
      getAllPermissions();
      setPermissionName("");
      setSelectedScreens(null);
      toast.current.show({severity:'success', summary: 'Success', detail:'Message Content', life: 3000});
    })
    .catch((error)=>{
      console.log(error);
      toast.current.show({severity:'error', summary: 'Error', detail:'Message Content', life: 3000});
    })
    setVisible(false)
  }
  const handleViewPermission = (permissionID)=> {
    const addBtn = document.querySelector('.addSubBtn');
    addBtn.setAttribute('id', `${permissionID}`)
    addBtn.removeAttribute('hidden')
    axios.get(`https://badil.pythonanywhere.com/permission-api/${permissionID}`)
    .then((response)=>{
      console.log(response.data);
      setPermissionScreens(response.data);
    })
    .catch((error)=>{console.log(error);})
  }
  const handleDeletePermission = (permissionID)=> {
    axios.delete(`https://badil.pythonanywhere.com/permission-api/${permissionID}`)
    .then((response)=>{
      console.log(response.data);
      getAllPermissions()
      toast.current.show({severity:'success', summary: 'Success', detail:'Message Content', life: 3000});
    })
    .catch((error)=>{
      console.log(error);
      toast.current.show({severity:'error', summary: 'Error', detail:'Message Content', life: 3000});
    })
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
      axios.put(`https://badil.pythonanywhere.com/permission-api/${permissionID}`, {
        permission_name
      })
      .then((res)=>{
        console.log(res);
        getAllPermissions()
        toast.current.show({severity:'success', summary: 'Success', detail:'Message Content', life: 3000});
      })
      .catch((error)=>{
        console.log(error);
        toast.current.show({severity:'error', summary: 'Error', detail:'Message Content', life: 3000});
      });
    } 
  }
  const handleAddScreenPopUp = ()=> {
    const btnId = document.querySelector('.addSubBtn').getAttribute('id');
    setScreenVisible(true)
    axios.get(`https://badil.pythonanywhere.com/permission-screen-api/${btnId}`)
    .then((response)=>{
      console.log(response.data);
      setAvailableScreens(response.data);
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  const handleAddScreen = ()=> {
    const btnId = document.querySelector('.addSubBtn').getAttribute('id');
    axios.post(`https://badil.pythonanywhere.com/permission-screen-api/${btnId}`,{
      permission_screens:selectedScreens
    }).then((response)=>{
      setSelectedScreens(null);
      setScreenVisible(false);
      setAvailableScreens();
      setPermissionScreens(response.data);
      toast.current.show({severity:'success', summary: 'Success', detail:'Message Content', life: 3000});
    })
    .catch((error)=>{
      console.log(error);
      toast.current.show({severity:'error', summary: 'Error', detail:'Message Content', life: 3000});
    })
    setVisible(false)
  }
  const handleDeleteScreen = (screenID)=> {
    axios.delete(`https://badil.pythonanywhere.com/permission-screen-api/${screenID}`)
    .then((response)=>{
      setPermissionScreens(response.data)
    })
    .catch((error)=>{console.log(error);})
  }
  return (
    <Fragment>
      <Toast ref={toast} />
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
                <MultiSelect style={{width:'100%'}} value={selectedScreens} onChange={(e) => setSelectedScreens(e.value)} options={availableScreens} optionLabel="screen_name" 
                  placeholder="أختر الشاشة" maxSelectedLabels={3} className="w-full md:w-20rem" />
              </div>
              <div className="add-permission-btn">
                <button onClick={handleAddScreen}>حسنا</button>
              </div>
            </div>
          </Dialog>
          {/* <Dialog header="تعديل شاشة" className='permission-dialog' visible={editScreenVisible}  onHide={() => setEditScreenVisible(false)}>
            <div className="add-permission-pop">
              <div className="add-permission-inputs">
                <select name="" id="" className='screen-select' onChange={(e) => setSelectedScreenName(e.target.value)}>
                  <option  value={selectedScreenName}>{selectedScreenName}</option>
                  {allScreens&& allScreens.map((screen)=>{
                    return(
                      <option key={screen.permission_screen} value={screen.permission_screen}>{screen.screen_name}</option>
                    )
                  })}
                </select>
              </div>
              <div className="add-permission-btn">
                <button onClick={handleEditScreen}>حسنا</button>
              </div>
            </div>
          </Dialog> */}
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
                  <i className="fa-solid fa-plus" ></i>
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
              <div onClick={()=>{handleAddScreenPopUp()}} hidden className='addBtn addSubBtn'>
                <button>
                  <i className="fa-solid fa-plus" ></i>
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
                        {/* <button className='button'onClick={()=>{handleEditScreenPopUp(screen.id)}}>
                          <i className="pi pi-pencil" style={{'color':'rgb(51, 175, 247)'}}></i>
                        </button> */}
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

