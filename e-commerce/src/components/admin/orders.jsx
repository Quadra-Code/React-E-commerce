import React ,{Fragment,useState,useEffect, }from 'react'
import Swal from 'sweetalert2'
import axios,{Axios} from 'axios';
import { NavLink, Outlet } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from "primereact/inputtext";
import { Tag } from 'primereact/tag';

  export default function Orders() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [customers,setCustomers] = useState(); 
  const [orders,setOrders] = useState([]); 
  const [cities,setCities] = useState([
    { name: 'الزهراء', code: 'NY' },
    { name: 'سيتي', code: 'RM' },
    { name: 'اكتوبر', code: 'LDN' },
    { name: 'الخارجه', code: 'IST' },
  ]); 
  const [addID, setAddID] =useState('')
  useEffect (()=>{
    getAll_customers()
    getAll_orders()
  },[])
  const getAll_customers = async ()=> {
    try {
      const response = await axios.get('http://localhost:7000/customers');
      setCustomers(response.data)
      // console.log(response.data)
    } catch (error) {
      console.error(error);
    } 
  }
  const getAll_orders = async ()=> {
    try {
      const response = await axios.get('http://localhost:5000/orders');
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
  }
  const handleView = async (id, trClass)=> {
    const selectedTr= document.querySelector(trClass);
    const childNodes= Array.from(selectedTr.parentNode.children);
    // console.log(childNodes);
    childNodes.map((child)=>child.classList.remove(`selected`));
    selectedTr.classList.toggle('selected');
    const addBtn = document.querySelector('.addProBtn');
    addBtn.removeAttribute('hidden')
    setAddID(id)
    console.log(addID);
    // axios.get (`https://reactdjangoecommerce.pythonanywhere.com/crud-products/s${id}`)
    // .then((res)=>{
    //   setCustomers(res.data)
    //   console.log(res);
    // })
    // .catch((error)=>{
    //   console.log(error);
    // });
  }
  const handleView_product = async (id, trClass)=> {
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
        // axios.delete(`https://reactdjangoecommerce.pythonanywhere.com/crud-products/p${product.id}`)
        // .then ((res)=>{
          
        //   // console.log(res);
        //   setCustomers(res.data)
        // })
      }
    })
  }
  const handleSelect_add = ()=>{
    Swal.fire({
      title: 'أضافة قسم جديد',
      html:
        '<input id="swal-input1" required placeholder="أسم القسم" class="swal2-input">' ,
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
  return(
    <>
      <section className="topSec">
        <div className='allElements' style={{"flexDirection":"column"}}>
          <div className='outerTable'>
            <div className='search-add'>
              <button onClick={handleSelect_add}>
                <i className="pi pi-plus" ></i>
                <span>اضافة عميل</span>
              </button>
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
                  <th>اوردر</th>
                </tr>
              </thead>
              <tbody>
                {customers&& customers.map((customer)=>
                  <tr id={`tr${customer.customer_id}`} key={customer.customer_id}>
                    <td >{customer.customer_name}</td>
                    <td >{customer.customer_phone}</td>
                    <td>
                      <div className="card flex justify-content-center">
                        <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                          placeholder="العنوان" className="w-full md:w-14rem" />
                      </div>
                    </td>
                    <td>
                      <button className='order' onClick={()=>handleAdd_order(customer.customer_id, `#tr${customer.customer_id}`)}>
                        <NavLink style={{color:'#000'}} to={`/admin/add-new-order/${customer.customer_id}`}>
                          <i className="pi pi-plus" style={{"color":"rgb(21, 81, 185)"}} ></i>
                        </NavLink>
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className='outerTable'>
            <div className='search-add'>
              {/* <button>
                <i className="pi pi-plus" ></i>
                <span>اضافة عميل</span>
              </button> */}
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
                  <th>حالة الاوردر</th>
                  <th>خيارات</th>
                </tr>
              </thead>
              <tbody id='subCategory_body'>
                {orders&& orders.map((order)=>
                  <tr id={`tr${order.order_id}`} key={order.order_id}>
                    <td >{order.customer_name}</td>
                    <td >{order.customer_phone}</td>
                    <td >{order.customer_address.address_label}</td>
                    <td >{order.order_date}</td>
                    <td>
                      <Tag severity={
                        
                        order.order_status==='done'? 'success' : order.order_status==='pending'? 'warning': order.order_status==='delivery'? 'info':'danger'} value={order.order_status}></Tag>
                    </td>
                    <td>
                      {/* <button className='view' onClick={()=>handleView_product(order.id)}>
                        <NavLink style={{color:'#000'}} to={`/super-user/view-product/${order.id}`}>
                          <i className="fa-regular fa-eye" style={{color:'#000'}}></i>
                        </NavLink>
                      </button> */}
                      <button className='order' onClick={()=>handleAdd_order(order.order_id, `#tr${order.order_id}`)}>
                        <i className="pi pi-eye" style={{"color":"rgb(51, 175, 247)"}}></i>
                      </button>
                      {/* <button className='delete' onClick={()=>handleDelete(order)}>
                        <i className="fa-regular fa-trash-can" style={{color:'#ffffff'}}></i>
                      </button> */}
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
