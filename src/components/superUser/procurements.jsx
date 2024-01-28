/* eslint-disable no-unused-vars */
import React ,{Fragment,useState,useEffect,useRef }from 'react';
import Swal from 'sweetalert2';
import axios,{Axios} from 'axios';
import { InputText } from "primereact/inputtext";
import { Toast } from 'primereact/toast';
import { Tag } from 'primereact/tag';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
function Procurements() {
  const toast  = useRef(null);
  const [search, setSearch] = useState('');
  const [purchaseEmployee,setPurchaseEmployee] = useState(); 
  const [purchaseEmployeesList,setPurchaseEmployeesList] = useState(); 
  const [purchaseOrders,setPurchaseOrders] = useState(); 
  const [orderID, setOrderID] =useState();
  const [orderDetails, setOrderDetails] =useState();
  const [printPopupVisible, setPrintPopupVisible] = useState(false);
  const [viewOrderVisible, setViewOrderVisible] = useState(false);
  useEffect(() => {
    getPurchaseEmployees();
    getPurchaseOrders();
  },[])
  const getPurchaseEmployees = ()=>{
    axios.get(`https://badil.pythonanywhere.com/purchase-dispatch-api/purchase`)
    .then((response)=>{
      setPurchaseEmployeesList(response.data);
    })
    .catch((error)=>{console.log(error);})
  }
  const getPurchaseOrders = ()=>{
    axios.get(`https://badil.pythonanywhere.com/purchase-dispatch-api/purchase-orders`)
    .then((response)=>{
      setPurchaseOrders(response.data);
    })
    .catch((error)=>{console.log(error);})
  }
  const handleViewPurchaseOrder = (orderID,trClass)=> {
    const selectedTr= document.querySelector(trClass);
    const childNodes= Array.from(selectedTr.parentNode.children);
    childNodes.map((child)=>child.classList.remove(`selected`));
    selectedTr.classList.toggle('selected');
    axios.get(`https://badil.pythonanywhere.com/order-master-api/master${orderID}`)
    .then((response)=>{
      setOrderDetails(response.data.order_details)
      setViewOrderVisible(true);
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  const handlePrintPurchaseOrder = (orderID,trClass)=> {
    const selectedTr= document.querySelector(trClass);
    const childNodes= Array.from(selectedTr.parentNode.children);
    childNodes.map((child)=>child.classList.remove(`selected`));
    selectedTr.classList.toggle('selected');
    setPrintPopupVisible(true)
    setOrderID(orderID)
  }
  const handlePrintRequest = ()=> {
    axios.put(`https://badil.pythonanywhere.com/purchase-dispatch-api/${orderID}`,{
      purchase:true,
      purchase_employee:purchaseEmployee.id
    })
    .then((response)=>{
      setPrintPopupVisible(false);
      setPurchaseEmployee(null);
      setOrderID(null);
      setPurchaseOrders(response.data)
      toast.current.show({severity:'success', summary: 'تم', detail:'تمت العملية بنجاح', life: 3000});
    })
    .catch((error)=>{
      console.log(error);
      toast.current.show({severity:'error', summary: 'خطأ', detail:error.response.data.error, life: 3000});
    })
  }
  return (
    <>
    <Toast ref={toast} />
    <Dialog header="طباعة الأوردر" className='permission-dialog' visible={printPopupVisible}  onHide={()=>setPrintPopupVisible(false)}>
      <div className="add-permission-pop">
        <div className="add-permission-inputs">
          <div className='inputs-container'>
            <Dropdown value={purchaseEmployee} onChange={(e) => setPurchaseEmployee(e.value)} options={purchaseEmployeesList} optionLabel="employee_name" 
                placeholder="إختر موظف الشراء" className="w-full md:w-14rem" />
          </div>
        </div>
        <div className="add-permission-btn">
          <button onClick={handlePrintRequest}>حسنا</button>
        </div>
      </div>
    </Dialog>
    <Dialog header="تفاصيل الأوردر" className='permission-dialog' visible={viewOrderVisible}  onHide={()=>setViewOrderVisible(false)}>
      <div className="add-procurements-pop">
        <div className='order-view-container'>
          <div className='label'>
            <span>الصنف</span>
            <span>الكمية</span>
            <span>الوحدة</span>
            <span>السعر</span>
            <span>الإجمالي</span>
          </div>
          {orderDetails&& orderDetails.map((detail)=>{
            return(
              <div className='row' key={detail.id}>
                <div className='column'>{detail.product_name}</div>
                <div className='column'>{detail.order_detail_quantity}</div>
                <div className='column'>{detail.product_unit}</div>
                <div className='column'>{detail.order_item_sell_price}</div>
                <div className='column'>{detail.order_detail_price}</div>
              </div>
            )
          })}
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
                  <td>{order.id}</td>
                  <td>{order.order_master_date_time}</td>
                  <td>{order.client_name}</td>
                  <td>{order.order_master_total}</td>
                  <td>
                    <Tag 
                      severity={
                      order.order_state==='0'? 'info' : order.order_state==='1'? 'warning': order.order_state==='2'? 'success':'danger'}
                      value={
                        order.order_state==='0'? 'قيد الإنتظار' : order.order_state==='1'? 'قيد الشراء' : order.order_state==='2'? 'تجهيز الطلب':'danger'
                      }
                    ></Tag>
                    {order.order_status}
                  </td>
                  <td>
                    <button className='button' onClick={()=>handleViewPurchaseOrder(order.id,`#tr${order.id}`)}>
                      <i className="pi pi-eye" style={{"color":"rgb(72 197 128)"}} ></i>
                    </button>
                    <button className='button' onClick={()=>handlePrintPurchaseOrder(order.id,`#tr${order.id}`)}>
                      <i className="pi pi-print" style={{"color":"rgb(113 138 247)"}} ></i>
                    </button>
                  </td>
                </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </>
  )
}

export default Procurements