import React ,{Fragment,useState,useEffect,useRef }from 'react'
import Swal from 'sweetalert2'
import axios,{Axios} from 'axios';
import { NavLink, Outlet } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from "primereact/inputtext";
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
  export default function Users() {
  const [search, setSearch] = useState('');
  const [customers,setCustomers] = useState(); 
  const [orders,setOrders] = useState([]); 
  const toast  = useRef(null);
  const [addID, setAddID] =useState('')
  useEffect (()=>{
    getAll_customers()
    // getAll_orders()
  },[])
  const getAll_customers = async ()=> {
    try {
      const response = await axios.get('http://localhost:8000/client-api');
      setCustomers(response.data)
      console.log(response.data)
    } catch (error) {
      console.error(error);
    } 
  }
  const getAll_orders = async ()=> {
    try {
      const response = await axios.get('http://localhost:8000/order-master-api');//this link gets data from database that exists in your pc not pythonanywhere database 
      setOrders(response.data)
      // console.log(response.data)
    } catch (error) {
      console.error(error);
    } 
  }
  const handleAdd_order=(id, trClass)=>{
    const selectedTr= document.querySelector(trClass);
    const childNodes= Array.from(selectedTr.parentNode.children);
    // console.log(childNodes);
    childNodes.map((child)=>child.classList.remove(`selected`));
    selectedTr.classList.toggle('selected');
    axios.get(`http://127.0.0.1:8000/client-with-address-api/client${id}`)
  }

  const handleView_clientOrders = async (id, trClass)=> {
    const selectedTr= document.querySelector(trClass);
    const childNodes= Array.from(selectedTr.parentNode.children);
    // console.log(childNodes);
    childNodes.map((child)=>child.classList.remove(`selected`));
    selectedTr.classList.toggle('selected');
    setAddID(id)
    console.log(addID);
    axios.get (`http://localhost:8000/order-master-api/${id}`)
    .then((res)=>{
      setOrders(res.data)
      console.log(res);
    })
    .catch((error)=>{
      console.log(error);
    });
  }
  // const handleView_order = async (id, trClass)=> {
  //   const selectedTr= document.querySelector(trClass);
  //   const childNodes= Array.from(selectedTr.parentNode.children);
  //   // console.log(childNodes);
  //   childNodes.map((child)=>child.classList.remove(`selected`));
  //   selectedTr.classList.toggle('selected');
  //   console.log(id);
  //   axios.get(`http://localhost:8000/order-master-api/master${id}`)
  //   .then((res)=>{
  //     console.log(id);
  //     console.log(res);
  //   })
  //   .catch((error)=>{
  //     console.log(error);
  //   });
  // }
  const handleDelete = (product)=> {
    Swal.fire({
      title: `Are you sure you want to delete ${product.product_name}?`,
      showCancelButton:true,
    }).then((data)=>{
      if(data.isConfirmed){
        // axios.delete(`https://reactdjangoecommerce.pythonanywhere.com/crud-products/p${product.id}`)
        // .then ((res)=>{
          
        //   // console.log(res);
        //   setCustomers(res.data)
        // })
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
        axios.post('http://localhost:8000/client-api', {
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
      <section className="topSec callCenterTop">
        <div className='allElements' style={{"flexDirection":"column"}}>
          <div className='outerTable users-table' >
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
                  <th>اسم المستخدم</th>
                  <th>رقم الهاتف</th>
                  <th>الصلاحية </th>
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
          {/* <div className='outerTable'>
            <div className='search-add'>
              <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText placeholder="بحث برقم الهاتف" />
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
                {orders&& orders.map((order)=>
                  <tr id={`tr${order.id}`} key={order.id}>
                    <td >{order.client_name}</td>
                    <td >{order.client_main_phone}</td>
                    <td >{order.client_address}</td>
                    <td >{order.order_master_date_time}</td>
                    <td >{order.order_master_total}</td>
                    <td>
                      <Tag 
                        severity={
                        order.order_master_state==='0'? 'danger' : order.order_master_state==='2 || 3'? 'warning': order.order_master_state==='4'? 'success':order.order_master_state==='1'? 'info':'danger'}
                        value={
                          order.order_master_state==='0'? 'غير مكتمل' : order.order_master_state==='2 || 3'? 'قيد الانتظار': order.order_master_state==='4'? 'تم':order.order_master_state==='1'? 'بإنتظار الموافقة':'danger'
                        }
                        ></Tag>
                    </td>
                    <td>
                      <button className='button'>
                        <NavLink style={{color:'#000'}} to={`/admin/view-order/${order.id}`}>
                          <i className="fa-regular fa-eye" style={{color:'rgb(72 197 128)'}}></i>
                        </NavLink>
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div> */}
        </div>
      </section>
    </>
  )
}
