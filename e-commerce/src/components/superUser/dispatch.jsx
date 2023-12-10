/* eslint-disable no-unused-vars */
import React ,{Fragment,useState,useEffect,useRef }from 'react';
import Swal from 'sweetalert2';
import axios,{Axios} from 'axios';
import { InputText } from "primereact/inputtext";
import { Toast } from 'primereact/toast';
import { Tag } from 'primereact/tag';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Dispatch() {
  const toast  = useRef(null);
  const [search, setSearch] = useState('');
  const [employees,setEmployees] = useState(); 
  const [dispatchEmployee,setDispatchEmployee] = useState(); 
  const [dispatchEmployeesList,setDispatchEmployeesList] = useState(); 
  const [purchaseOrders,setPurchaseOrders] = useState(); 
  const [addID, setAddID] =useState('');
  const [orderID, setOrderID] =useState();
  const [orderDetails, setOrderDetails] =useState();
  const [visible, setVisible] = useState(false);
  const [printPopupVisible, setPrintPopupVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedScreens, setSelectedScreens] = useState(null);
  const [selectedScreenFk, setSelectedScreenFk] = useState(null);
  const [employeeID, setEmployeeID] = useState();
  const [employeeName, setEmployeeName] = useState('');
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [allScreens, setAllScreens] = useState();
  const [pwd, setPwd] =useState('');
  const [validPwd, setValidPwd] =useState(false);
  const [pwdFocus, setPwdFocus] =useState(false);
  const [matchPwd, setMatchPwd] =useState('');
  const [validMatch, setValidMatch] =useState(false);
  useEffect(() => {
    // getAllScreens()
    // getAllEmployee()
    getDispatchEmployees();
    getPurchaseOrders();
    const result = PWD_REGEX.test(pwd);
    // console.log(result);
    // console.log(pwd);
    setValidPwd(result);
    const match = pwd ===matchPwd;
    setValidMatch(match)
  },[pwd,matchPwd])
  const getDispatchEmployees = ()=>{
    axios.get(`https://badil.pythonanywhere.com/purchase-dispatch-api/purchase`)
    .then((response)=>{
      setDispatchEmployeesList(response.data);
      // console.log(response.data);
    })
    .catch((error)=>{console.log(error);})
  }
  const getPurchaseOrders = ()=>{
    axios.get(`https://badil.pythonanywhere.com/purchase-dispatch-api/purchase-orders`)
    .then((response)=>{
      setPurchaseOrders(response.data);
      // console.log(response.data);
    })
    .catch((error)=>{console.log(error);})
  }
  const handleViewPurchaseOrder = (trClass)=> {
    const selectedTr= document.querySelector(trClass);
    const childNodes= Array.from(selectedTr.parentNode.children);
    // console.log(childNodes);
    childNodes.map((child)=>child.classList.remove(`selected`));
    selectedTr.classList.toggle('selected');
    axios.get(``)
    .then((response)=>{
      console.log(response.data)
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  const handlePrintPurchaseOrder = (orderID,trClass)=> {
    const selectedTr= document.querySelector(trClass);
    const childNodes= Array.from(selectedTr.parentNode.children);
    // console.log(childNodes);
    childNodes.map((child)=>child.classList.remove(`selected`));
    selectedTr.classList.toggle('selected');
    setPrintPopupVisible(true)
    setOrderID(orderID)
  }
  const handlePrintRequest = ()=> {
    // console.log(dispatchEmployee);
    axios.put(`https://badil.pythonanywhere.com/purchase-dispatch-api/${orderID}`,{
      purchase:true,
      purchase_employee:dispatchEmployee.id
    })
    .then((response)=>{
      setPrintPopupVisible(false);
      setDispatchEmployee(null);
      setOrderID(null);
      setPurchaseOrders(response.data)
      toast.current.show({severity:'success', summary: 'تم', detail:'تمت العملية بنجاح', life: 3000});
    })
    .catch((error)=>{
      console.log(error);
      toast.current.show({severity:'error', summary: 'خطأ', detail:error.response.data.error, life: 3000});
    })
  }
  // const getAllScreens =() =>{
  //   axios.get(`https://badil.pythonanywhere.com/permission-api/all`)
  //   .then((response)=>{
  //     setAllScreens(response.data);
  //     console.log(response.data);
  //   })
  //   .catch((error)=>{console.log(error);})
  // }
  // const getAllEmployee =() =>{
  //   axios.get(`https://badil.pythonanywhere.com/employee-api/all`)
  //   .then((response)=>{
  //     setEmployees(response.data);
  //     console.log(response.data);
  //   })
  //   .catch((error)=>{console.log(error);})
  // }
  const handleUser_add = ()=> {
    axios.post(`https://badil.pythonanywhere.com/employee-api/post`,{
      first_name:employeeName,
      password:pwd,
      username:employeeNumber,
      permission_fk:selectedScreens.id
    })
    .then((res)=>{
      setEmployees(res.data);
      setEmployeeName('');
      setEmployeeNumber('');
      setSelectedScreens(null);
      setPwd('');
      toast.current.show({severity:'success', summary: 'تم', detail:'تمت الاضافه بنجاح', life: 3000});
      console.log(res);
      setVisible(false);
    })
    .catch((error)=>{
      toast.current.show({severity:'error', summary: 'خطأ', detail:error.response.data.error, life: 3000});
      console.log(error.response.data.error);
    });
  }
  const handleUser_edit_pop = (employee)=> {
    console.log(employee);
    setEditVisible(true)
    setEmployeeID(employee.id)
    setEmployeeName(employee.employee_name)
    setEmployeeNumber(employee.employee_main_phone)
    setSelectedScreens(employee.permission_name)
    setSelectedScreenFk(employee.permission_fk)
  }
  const hideEditPop = ()=> {
    setEditVisible(false)
    setEmployeeID();
    setEmployeeName('');
    setEmployeeNumber('');
    setSelectedScreens(null);
    setSelectedScreenFk(null);
}
  const handleUser_edit =()=> {
    axios.put(`https://badil.pythonanywhere.com/employee-api/${employeeID}`,{
      employee_name:employeeName,
      employee_main_phone:employeeNumber,
      permission_fk:selectedScreenFk
    })
    .then((res)=>{
      setEmployees(res.data);
      toast.current.show({severity:'success', summary: 'تم', detail:'تمت التعديل بنجاح', life: 3000});
      console.log(res);
      setVisible(false);
      setEditVisible(false);
      setEmployeeID();
      setEmployeeName('');
      setEmployeeNumber('');
      setSelectedScreens(null);
      setSelectedScreenFk(null);
    })
    .catch((error)=>{
      toast.current.show({severity:'error', summary: 'خطأ', detail:error.response.data.error, life: 3000});
      console.log(error.response.data.error);
    });
  }
  const handleView_clientOrders = async (id, trClass)=> {
    const selectedTr= document.querySelector(trClass);
    const childNodes= Array.from(selectedTr.parentNode.children);
    // console.log(childNodes);
    childNodes.map((child)=>child.classList.remove(`selected`));
    selectedTr.classList.toggle('selected');
    setAddID(id)
    console.log(addID);
  }
  const handleDelete = (employeeID,employeeName,trClass)=> {
    const selectedTr= document.querySelector(trClass);
    const childNodes= Array.from(selectedTr.parentNode.children);
    // console.log(childNodes);
    childNodes.map((child)=>child.classList.remove(`selected`));
    selectedTr.classList.toggle('selected');
    console.log(employeeID);
    Swal.fire({
      title: `هل انت متأكد من حذف ${employeeName}؟`,
      showCancelButton:true,
    }).then((data)=>{
      if(data.isConfirmed){
        axios.delete(`https://badil.pythonanywhere.com/employee-api/${employeeID}`)
        .then((res)=>{
          setEmployees(res.data);
          toast.current.show({severity:'success', summary: 'تم', detail:'تم الحذف بنجاح', life: 3000});
          console.log(res);
        })
        .catch((error)=>{
          toast.current.show({severity:'error', summary: 'خطأ', detail:'', life: 3000});
          console.log(error.response.data.error);
        });
      }
      else{childNodes.map((child)=>child.classList.remove(`selected`));}
    })
  }
  return (
    <>
    <Toast ref={toast} />
    <Dialog header="طباعة الأوردر" className='permission-dialog' visible={printPopupVisible}  onHide={()=>setPrintPopupVisible(false)}>
      <div className="add-permission-pop">
        <div className="add-permission-inputs">
          {/* <div className='inputs-container'>
            <InputText value={employeeName} placeholder='أسم المستخدم' onChange={(e) => setEmployeeName(e.target.value)} />
            <InputText value={employeeNumber} keyfilter="int" placeholder=' رقم الهاتف' onChange={(e) => setEmployeeNumber(e.target.value)} />
          </div> */}
          <div className='inputs-container'>
            <Dropdown value={dispatchEmployee} onChange={(e) => setDispatchEmployee(e.value)} options={dispatchEmployeesList} optionLabel="employee_name" 
                placeholder="إختر موظف الشراء" className="w-full md:w-14rem" />
            {/* <select className='screen-selection' name="" id="" value={selectedScreenFk} onChange={(e) => setSelectedScreenFk(e.target.value)}>
              <option disabled value={selectedScreens}selected hidden>{selectedScreens}</option>
              {allScreens&& allScreens.map((screen)=>{
                return(
                  <option key={screen.id} value={screen.id}>{screen.permission_name}</option>
                )
              })}
            </select> */}
          </div>
        </div>
        <div className="add-permission-btn">
          <button onClick={handlePrintRequest}>حسنا</button>
        </div>
      </div>
    </Dialog>
    <section className="topSec callCenterTop">
      <div className='allElements' style={{"flexDirection":"column"}}>
        <div className='outerTable users-table' >
          <div className='search-add'>
            <span className="p-input-icon-left">
              <i className="pi pi-search"/>
              <InputText placeholder="بحث برقم الأوردر" onChange={(e)=>{setSearch(e.target.value)}}/>
            </span>
          </div>
          <table>
            <thead>
              <tr>
                <th>رقم الأوردر</th>
                <th>تاريخ الأوردر</th>
                <th>أسم العميل</th>
                <th>إجمالي سعر الأوردر</th>
                <th>حالة الأوردر</th>
                <th>خيارات</th>
              </tr>
            </thead>
            <tbody>
              {purchaseOrders&& purchaseOrders.filter((item)=>{
                return search&& search.toLowerCase() === ''? item
                : item.id.toString().toLowerCase().includes(search);
              }).map((order)=>{
                return(
                <tr id={`tr${order.id}`} key={order.id}>
                  <td >{order.id}</td>
                  <td >{order.order_master_date_time}</td>
                  <td >{order.client_name}</td>
                  <td >{order.order_master_total}</td>
                  <td >
                    <Tag 
                      severity={
                      order.order_state==='0'? 'info' : order.order_state==='1'? 'warning': order.order_state==='2'? 'success':'danger'}
                      value={
                        order.order_state==='0'? 'قيد الشراء' : order.order_state==='1'? 'تجهيز الطلب': order.order_state==='2'? 'تم الأرسال للحركة':'danger'
                      }
                    ></Tag>
                    {order.order_status}
                  </td>
                  <td>
                    <button className='button' onClick={()=>handleViewPurchaseOrder(`#tr${order.id}`)}>
                      <i className="pi pi-eye" style={{"color":"rgb(72 197 128)"}} ></i>
                    </button>
                    <button className='button' onClick={()=>handleViewPurchaseOrder(`#tr${order.id}`)}>
                      <i className="pi pi-sync" style={{"color":"rgb(255 180 0)"}} ></i>
                    </button>
                    <button className='button' onClick={()=>handlePrintPurchaseOrder(order.id,`#tr${order.id}`)}>
                      <i className="pi pi-print" style={{"color":"rgb(113 138 247)"}} ></i>
                    </button>
                  </td>
                </tr>
                )
              })}
              {/* {purchaseOrders&& purchaseOrders.filter((item)=>{
                return search&& search.toLowerCase() === '' ? item
                : item.id.toLowerCase().includes(search)
              }).map((order)=>
              )} */}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </>
  )
}

export default Dispatch