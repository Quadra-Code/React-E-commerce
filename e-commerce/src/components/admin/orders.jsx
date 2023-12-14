import React ,{Fragment,useState,useEffect,useRef }from 'react'
import Swal from 'sweetalert2'
import axios,{Axios} from 'axios';
import { NavLink, Outlet } from 'react-router-dom';
import { InputText } from "primereact/inputtext";
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
  export default function Orders() {
  const [search, setSearch] = useState('');
  const [customers,setCustomers] = useState(); 
  const [orders,setOrders] = useState([]); 
  const [addID, setAddID] =useState('')
  const toast  = useRef(null);
  useEffect (()=>{
    getAll_customers()
  },[])
  const getAll_customers = async ()=> {
    try {
      const response = await axios.get('https://badil.pythonanywhere.com/client-api/get');
      setCustomers(response.data)
      console.log(response.data)
    } catch (error) {
      console.error(error);
    } 
  }
  const getAll_orders = async ()=> {
    try {
      const response = await axios.get('https://badil.pythonanywhere.com/order-master-api');//this link gets data from database that exists in your pc not pythonanywhere database 
      setOrders(response.data)
    } catch (error) {
      console.error(error);
    } 
  }
  const handleAdd_order=(id, trClass)=>{
    const selectedTr= document.querySelector(trClass);
    const childNodes= Array.from(selectedTr.parentNode.children);
    childNodes.map((child)=>child.classList.remove(`selected`));
    selectedTr.classList.toggle('selected');
    axios.get(`https://badil.pythonanywhere.com/client-with-address-api/client${id}`)
  }

  const handleView_clientOrders = async (id, trClass)=> {
    const selectedTr= document.querySelector(trClass);
    const childNodes= Array.from(selectedTr.parentNode.children);
    childNodes.map((child)=>child.classList.remove(`selected`));
    selectedTr.classList.toggle('selected');
    setAddID(id)
    console.log(addID);
    axios.get (`https://badil.pythonanywhere.com/order-master-api/${id}`)
    .then((res)=>{
      setOrders(res.data)
      console.log(res);
    })
    .catch((error)=>{
      console.log(error);
    });
  }
  const handleDeleteOrder = (id)=> {
    setAddID(id)
    Swal.fire({
      title: `هل انت متأكد من حذف هذا الاوردر ؟`,
      showCancelButton:true,
    }).then((data)=>{
      if(data.isConfirmed){
        axios.delete(`https://badil.pythonanywhere.com/order-master-api/${id}`)
        .then((res)=>{
          setOrders(res.data)
          toast.current.show({severity:'success', summary: 'تم', detail:'تم الحذف بنجاح', life: 3000});
          console.log(res);
        })
        .catch((error)=>{
          toast.current.show({severity:'error', summary: 'خطأ', detail:'', life: 3000});
          console.log(error.response.data.error);
        });
      }
    })
  }
  const handleClient_add = ()=>{
    Swal.fire({
      title: 'أضافة عميل جديد',
      html:
        '<input id="swal-input1" required placeholder="أسم العميل" class="swal2-input"><input id="swal-input2" required placeholder="رقم الهاتف " class="swal2-input">' ,
      focusConfirm: false,
    })
    .then((data)=>{
      const client_name = document.getElementById('swal-input1').value;
      const client_main_phone = document.getElementById('swal-input2').value;
      if (client_name!=="" && client_main_phone!=="" && data.isConfirmed){
        axios.post('https://badil.pythonanywhere.com/client-api/post', {
          client_name,
          client_main_phone
        })
        .then((res)=>{
          setCustomers(res.data)
          toast.current.show({severity:'success', summary: 'تم', detail:'تمت الاضافه بنجاح', life: 3000});
          console.log(res);
        })
        .catch((error)=>{
          toast.current.show({severity:'error', summary: 'خطأ', detail:'أدخل البيانات بشكل صحيح', life: 3000});
          console.log(error);
        });
      } 
    })
  }
  return(
    <>
    <Toast ref={toast} />
      <section className="topSec callCenterTop">
        <div className='allElements' style={{"flexDirection":"column"}}>
          <div className='outerTable' style={{maxHeight:"470"}}>
            <div className='search-add'>
              <button className='button' onClick={handleClient_add}>
                <i className="pi pi-plus" ></i>
                <span>اضافة عميل</span>
              </button>
              <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText placeholder="بحث برقم الهاتف" onChange={(e)=>{setSearch(e.target.value)}}/>
              </span>
            </div>
            <table>
              <thead>
                <tr>
                  <th>اسم العميل</th>
                  <th>رقم الهاتف</th>
                  <th>خيارات</th>
                </tr>
              </thead>
              <tbody>
                {customers&& customers.filter((item)=>{
                  return search&& search.toLowerCase() === ''
                  ? item
                  : item.client_main_phone.toLowerCase().includes(search);
                }).map((customer)=>
                  <tr id={`tr${customer.id}`} key={customer.id}>
                    <td >{customer.client_name}</td>
                    <td >{customer.client_main_phone}</td>
                    <td>
                      <button className='button' onClick={()=>handleAdd_order(customer.id, `#tr${customer.id}`)}>
                        <NavLink style={{color:'#000'}} to={`/admin/add-new-order/${customer.id}`}>
                          <i className="pi pi-plus" style={{"color":"rgb(21, 81, 185)"}} ></i>
                        </NavLink>
                      </button>
                      <button className='button' onClick={()=>handleView_clientOrders(customer.id, `#tr${customer.id}`)}>
                        <i className="pi pi-eye" style={{"color":"rgb(72 197 128)"}} ></i>
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className='outerTable'style={{maxHeight:"470"}}>
            <div className='search-add'>
              <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText placeholder="بحث برقم الهاتف"onChange={(e)=>{setSearch(e.target.value)}} />
              </span>
            </div>
            <table>
              <thead>
                <tr>
                  <th>اسم العميل</th>
                  <th>رقم الهاتف</th>
                  <th>العنوان</th>
                  <th>تاريخ الاوردر</th>
                  <th>الاجمالي</th>
                  <th>حالة الاوردر</th>
                  <th>خيارات</th>
                </tr>
              </thead>
              <tbody id='subCategory_body'>
                {orders&& orders.filter((item)=>{
                  return search&& search.toLowerCase() === ''
                  ? item
                  : item.order_master_date_time.toLowerCase().includes(search);
                }).map((order)=>
                  <tr id={`tr${order.id}`} key={order.id}>
                    <td >{order.client_name}</td>
                    <td >{order.client_main_phone}</td>
                    <td >{order.client_address}</td>
                    <td >{order.order_master_date_time}</td>
                    <td >{order.order_master_total}</td>
                    <td>
                      <Tag 
                        severity={
                        order.order_state==='0'? 'danger' : order.order_state==='2 || 3'? 'warning': order.order_state==='4'? 'success':order.order_state==='1'? 'info':'danger'}
                        value={
                          order.order_state==='0'? 'غير مكتمل' : order.order_state==='2 || 3'? 'قيد الانتظار': order.order_state==='4'? 'تم':order.order_state==='1'? 'بإنتظار الموافقة':'جاري التنفيذ'
                        }
                        ></Tag>
                    </td>
                    <td>
                      <button className='button'>
                        <NavLink style={{color:'#000'}} to={`/admin/view-order/${order.id}`}>
                          <i className="fa-regular fa-eye" style={{color:'rgb(72 197 128)'}}></i>
                        </NavLink>
                      </button>
                      <button className='button' onClick={()=>handleDeleteOrder(order.id)}>
                          <i className="pi pi-trash" style={{color:'rgb(197 72 72)'}}></i>
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}
