import React, {Fragment,useState,useEffect,useRef } from 'react';
import Swal from 'sweetalert2'
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { useParams } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import 'primeicons/primeicons.css';
export default function ViewOrder() {
  const [search, setSearch] = useState('');
  const [value2, setValue2] = useState();
  const [allProducts, setAllProducts] = useState();
  const [clientInfo, setClientInfo] = useState();
  const [clientAddresses, setClientAddresses] = useState();
  const [addProduct,setAddProduct] = useState([])
  const [allResponse,setAllResponse] = useState([])
  let total_price = 0;
  const toast  = useRef(null);
  let {customerID}= useParams()
  useEffect (()=>{
    getOrderInfo()
    getAllProducts()
  },[])
  const getOrderInfo = async ()=> {
    try {
      const response = await axios.get(`https://badil.pythonanywhere.com/order-master-api/master${customerID}`);
      setClientInfo(response.data)
      console.log(response.data)
      setAddProduct(response.data.order_details)
      setAllResponse(response.data)
      setValue2(response.data.client_address)
      const getClient_info = await axios.get(`https://badil.pythonanywhere.com/client-with-address-api/client${response.data.client_fk}`)
      setClientAddresses(getClient_info.data.client_addresses)
    } catch (error) {
      console.error(error);
    }
  }
  console.log(value2);
  const getAllProducts = async ()=> {
    try {
      const response = await axios.get('https://badil.pythonanywhere.com/crud-products-api/all');
      setAllProducts(response.data)
      console.log(response.data)
    } catch (error) {
      console.error(error);
    } 
  }
  const handleAdd_pro = async (id, name,price)=> {
    const newProduct = {
      product_fk:id,
      product_name: name,
      order_item_sell_price: price,
      order_detail_notes: null,
      order_detail_quantity:1,
    };
    const existingObj = addProduct.find(obj => obj.product_fk === id);
    if (existingObj) {
        setAddProduct(addProduct=>
          addProduct.map((item)=>
          id === item.product_fk ? {...item,order_detail_quantity:item.order_detail_quantity +1} 
          :item))
      console.log('Object with ID '+ id + 'lready exists in myArray');
    } else {
      setAddProduct([...addProduct,newProduct])
      console.log('newObj added to myArray:', addProduct);
    } 
  }
  const handleDelete_row = (id)=> {
    const newArray = addProduct.filter((product) => product.product_fk !== id);
    setAddProduct(newArray)
    console.log(addProduct);
  }
  const handle_addNewAddress = ()=>{
    Swal.fire({
      title: 'أضافة  عنوان جديد',
      html:
        '<input id="swal-input1" required placeholder=" العنوان" class="swal2-input">' ,
      focusConfirm: false,
    })
    .then((data)=>{
      const client_address = document.getElementById('swal-input1').value;
      if (client_address!=="" && data.isConfirmed){
        axios.post(`https://badil.pythonanywhere.com/client-with-address-api/${customerID}`, {
          client_fk:customerID,
          client_address
        })
        .then((res)=>{
          setClientAddresses(res.data.client_addresses)
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
  const finishOrder = () => {
    const client_fk = clientInfo.client_fk
    const order_details = []
    const order_body = document.querySelector('#order_body');
    const total_masterPrice = document.querySelector('.totalPrice').textContent;
    order_body.querySelectorAll("tr").forEach((row) => {
      let sell_price = row.querySelector('#price')
      let total_detailPrice = row.querySelector('#order_total')
      let product_fk = row.querySelector('#price').getAttribute('product_fk')
      console.log(sell_price);
      let quantity = row.querySelector('.count').textContent
      let notes = row.querySelector('.notes').value
      console.log(sell_price.innerHTML,quantity);
      const order = 
        {
          product_fk: product_fk,
          order_detail_quantity: quantity,
          order_item_purchase_price:sell_price.innerHTML,
          order_item_sell_price:sell_price.innerHTML,
          order_detail_price: total_detailPrice.innerHTML,
          order_detail_notes: notes,
        }
      order_details.push(order)
      console.log(order.product_fk);
    });
    
    axios.put(`https://badil.pythonanywhere.com/order-master-api/${allResponse.id}`,{
      client_fk,
      order_master_notes:'sss',
      order_master_address:value2.id,
      order_master_total:total_masterPrice,
      order_details
    })
    .then((res)=>{
      console.log(res);
      toast.current.show({severity:'success', summary: 'تم', detail:'تمت الاضافه بنجاح', life: 3000});
    })
    .catch((error)=>{
      console.log(error);
      toast.current.show({severity:'error', summary: 'خطأ', detail:'أدخل البيانات بشكل صحيح', life: 3000});
    })
  }
  const handleNotes= (e,product)=> {
    console.log(e);
    setAddProduct(addProduct=>
      addProduct.map((item)=>
      product.product_fk === item.product_fk ? {...item,order_detail_notes:e} :item
      ))
  }
  const handleQuantity_increment = (product)=> {
    setAddProduct(addProduct=>
      addProduct.map((item)=>
      product.product_fk === item.product_fk ? {...item,order_detail_quantity:item.order_detail_quantity +1} :item
      ))
  }
  const handleQuantity_decrement = (product)=> {
    setAddProduct(addProduct=>
      addProduct.map((item)=>
      product.product_fk === item.product_fk ? {...item,order_detail_quantity:item.order_detail_quantity-(item.order_detail_quantity > 1 ? 1: 0)} :item
      )
    )
  }
  return (
    <Fragment>
      <Toast ref={toast} position="top-left"/>
      <section className="topSec">
        <div className="topSec-content infoCont" >
          <InputText disabled value={clientInfo&&clientInfo.client_name}/>
          <InputText disabled value={clientInfo&&clientInfo.client_main_phone}/>
          <Dropdown value={value2} onChange={(e) => setValue2(e.value)} options={clientAddresses&&clientAddresses} optionLabel="client_address" 
            placeholder={value2} className="w-full md:w-14rem" />
          <button onClick={handle_addNewAddress}>
            <i className="pi pi-plus" ></i>
            <span>اضافة عنوان جديد</span>
          </button>
        </div>
        <div className='allElements addOrder_tables'>
          <div className='outerTable last-child'>
            <table>
              <thead>
                <tr>
                  <th>أسم المنتج</th>
                  <th>سعر المنتج</th>
                  <th>الكميه</th>
                  <th>إجمالي السعر</th>
                  <th>الملاحظات</th>
                  <th>اضافه</th>
                </tr>
              </thead>
              <tbody id='order_body'>
                {addProduct.length>0 ? addProduct.map((product)=>{
                  total_price += product.order_item_sell_price
                  *product.order_detail_quantity;
                  return(
                    <tr id={`tr${product.id}`} key={product.id}>
                      <td >{product.product_name}</td>
                      <td id='price' product_fk={product.product_fk} data-price={product.order_item_sell_price}>{product.order_item_sell_price}</td>
                      <td >
                        <div className='quantityDiv'>
                          <button type='button' onClick={()=> handleQuantity_increment(product)} className='increment'>+</button>
                          <div className='count'>{product.order_detail_quantity}</div>
                          <button type='button' onClick={()=> handleQuantity_decrement(product)} className='decrement'>-</button>
                        </div>
                      </td>
                      <td id='order_total'>{product.order_item_sell_price*product.order_detail_quantity}</td>
                      <td ><InputText className='notes' value={product.order_detail_notes} onChange={(e) => handleNotes(e.target.value,product)} /></td>
                      <td>
                        <button className='button' onClick={()=>handleDelete_row(product.product_fk)}>
                          <i className="pi pi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  )
                }
                ):console.log(null)}
              </tbody>
            </table>
            {addProduct.length> 0 &&
              <button className='finishOrder' onClick={finishOrder}>انهاء الطلب</button>
            }
            {addProduct.length > 0 &&
              <span>
                <span style={{color:'#fff'}}>إجمالي السعر</span>
                <span className='totalPrice' style={{'margin-right':'8px'}}>{total_price}</span>
              </span>
            }
          </div>
          <div className='outerTable last-child'>
            <div className='search-add'>
              <h2>جميع المنتجات</h2>
              <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText placeholder="بحث  " onChange={(e)=>{setSearch(e.target.value)}}/>
              </span>
            </div>
            <table>
              <thead>
                <tr>
                  <th>أسم المنتج</th>
                  <th>سعر المنتج</th>
                  <th>المكونات</th>
                  <th>اضافه</th>
                </tr>
              </thead>
              <tbody id='subCategory_body'>
                {allProducts&& allProducts.filter((item)=>{
                  return search&& search.toLowerCase() === ''
                  ? item
                  : item.product_name.toLowerCase().includes(search);
                }).map((product)=>
                  <tr id={`tr${product.id}`} key={product.id}>
                    <td >{product.product_name}</td>
                    <td >{product.product_sell_price}</td>
                    <td >{product.product_description}</td>
                    <td>
                      <button className='button' onClick={()=>handleAdd_pro(product.id,product.product_name,product.product_sell_price,
                        product.product_description)}>
                        <i className="pi pi-plus"></i>
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

