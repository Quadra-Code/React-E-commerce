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
  const [dispatchEmployee,setDispatchEmployee] = useState(); 
  const [dispatchEmployeesList,setDispatchEmployeesList] = useState(); 
  const [dispatchOrders,setDispatchOrders] = useState(); 
  const [orderID, setOrderID] =useState();
  const [orderDetails, setOrderDetails] =useState();
  const [printPopupVisible, setPrintPopupVisible] = useState(false);
  const [viewOrderVisible, setViewOrderVisible] = useState(false);
  useEffect(() => {
    getDispatchEmployees();
    getDispatchOrders();
  },[])
  const getDispatchEmployees = ()=>{
    axios.get(`https://badil.pythonanywhere.com/purchase-dispatch-api/dispatch`)
    .then((response)=>{
      setDispatchEmployeesList(response.data);
      console.log(response.data);
    })
    .catch((error)=>{console.log(error);})
  }
  const getDispatchOrders = ()=>{
    axios.get(`https://badil.pythonanywhere.com/purchase-dispatch-api/dispatch-orders`)
    .then((response)=>{
      setDispatchOrders(response.data);
      console.log(response.data);
    })
    .catch((error)=>{console.log(error);})
  }
  const handleViewDispatchOrder = (orderID,trClass)=> {
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
  const handlePrintDispatchOrder = (orderID,trClass)=> {
    const selectedTr= document.querySelector(trClass);
    const childNodes= Array.from(selectedTr.parentNode.children);
    childNodes.map((child)=>child.classList.remove(`selected`));
    selectedTr.classList.toggle('selected');
    setPrintPopupVisible(true)
    setOrderID(orderID)
  }
  const handlePrintRequest = ()=> {
    axios.put(`https://badil.pythonanywhere.com/purchase-dispatch-api/${orderID}`,{
      dispatch:true,
      delivery_employee:dispatchEmployee.id
    })
    .then((response)=>{
      setPrintPopupVisible(false);
      setDispatchEmployee(null);
      setOrderID(null);
      setDispatchOrders(response.data)
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
            <Dropdown value={dispatchEmployee} onChange={(e) => setDispatchEmployee(e.value)} options={dispatchEmployeesList} optionLabel="employee_name" 
                placeholder="إختر موظف التوصيل" className="w-full md:w-14rem" />
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
                <th>العنوان</th>
                <th>حالة الأوردر</th>
                <th>تاريخ الاستلام من المشتريات</th>
                <th>حالة توصيل الأوردر</th>
                <th>خيارات</th>
              </tr>
            </thead>
            <tbody>
              {dispatchOrders&& dispatchOrders.filter((item)=>{
                return search&& search.toLowerCase() === ''? item
                : item.id.toString().toLowerCase().includes(search);
              }).map((order)=>{
                return(
                <tr id={`tr${order.id}`} key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.order_master_date_time}</td>
                  <td>{order.client_name}</td>
                  <td>{order.order_master_total}</td>
                  <td>{order.order_master_total}</td>
                  <td>
                    <Tag 
                      severity={
                        order.order_state==='0'? 'info' : order.order_state==='1'? 'warning': order.order_state==='2'? 'success': order.order_state==='3'? 'success':'danger'}
                        value={
                          order.order_state==='0'? 'قيد الإنتظار' : order.order_state==='1'? 'قيد الشراء ': order.order_state==='2'? 'تجهيز الطلب':order.order_state==='3'? 'تم الإرسال للحركة':'danger'
                        }
                        ></Tag>
                    {order.order_status}
                  </td>
                  <td>{order.receive_from_purchase_date_time}</td>
                  <td>
                    <Tag 
                      severity={
                      order.order_delivery_state==='0'? 'info' : order.order_delivery_state==='1'? 'warning': order.order_delivery_state==='2'? 'success':'danger'}
                      value={
                        order.order_delivery_state==='0'? 'قيد الإنتظار' : order.order_delivery_state==='1'? 'تم التسليم للطيار': order.order_delivery_state==='2'? 'تم الإستلام من العميل ':'danger'
                      }
                      ></Tag>
                    {order.order_status}
                  </td>
                  <td>
                    <button className='button' onClick={()=>handleViewDispatchOrder(order.id,`#tr${order.id}`)}>
                      <i className="pi pi-eye" style={{"color":"rgb(72 197 128)"}} ></i>
                    </button>
                    <button className='button' onClick={()=>handlePrintDispatchOrder(order.id,`#tr${order.id}`)}>
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

export default Dispatch