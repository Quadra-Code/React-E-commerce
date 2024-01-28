/* eslint-disable no-unused-vars */
import React ,{Fragment,useState,useEffect,useRef }from 'react';
import Swal from 'sweetalert2';
import axios,{Axios} from 'axios';
import { InputText } from "primereact/inputtext";
import { Toast } from 'primereact/toast';
import { Tag } from 'primereact/tag';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { ListBox } from 'primereact/listbox';
function Treasury() {
  const toast  = useRef(null);
  const [search, setSearch] = useState('');
  const [totalBalance, setTotalBalance] = useState();
  const [transactionValueState , setTransactionValueState] = useState(true);
  const [transactionsType , setTransactionsType] = useState(true);
  const [transactions , setTransactions] = useState();
  const [transactionValue , setTransactionValue] = useState();
  const [transactionTotal , setTransactionTotal] = useState();
  const [purchaseEmployee,setPurchaseEmployee] = useState(); 
  const [purchaseEmployeesList,setPurchaseEmployeesList] = useState(); 
  const [transactionDescription,setTransactionDescription] = useState(); 
  const [transactionDescriptionList,setTransactionDescriptionList] = useState(); 
  const [purchaseOrders,setPurchaseOrders] = useState(); 
  const [orderID, setOrderID] =useState();
  const [orderDetails, setOrderDetails] =useState();
  const [printPopupVisible, setPrintPopupVisible] = useState(false);
  const [viewAddTransaction,setViewAddTransaction] = useState(false)
  const [viewOrderVisible, setViewOrderVisible] = useState(false);
  const [selectedTransactions, setSelectedTransactions] = useState(null);
  useEffect(() => {
    handleGetTransactions();
    handleGetTotalBalance();
  },[])
  const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ];
  const handleGetTotalBalance = ()=>{
    axios.get(`https://badil.pythonanywhere.com/treasury-value-api`)
    .then((response)=>{
      setTotalBalance(response.data.treasury_value);
    })
    .catch((error)=>{console.log(error);})
  }
  const handleGetTransactions = ()=>{
    axios.get(`https://badil.pythonanywhere.com/treasury-list-api`)
    .then((response)=>{
      setTransactions(response.data);
    })
    .catch((error)=>{console.log(error);})
  }
  const getEmployeesTransactions = ()=>{
    axios.get(`https://badil.pythonanywhere.com/employee-api/all`)
    .then((response)=>{
      setPurchaseEmployeesList(response.data);
      console.log(response.data);
      setViewAddTransaction(true);
    })
    .catch((error)=>{console.log(error);})
    axios.get(`https://badil.pythonanywhere.com/treasury-transaction-api/all`)
    .then((response)=>{
      setTransactionDescriptionList(response.data);
      console.log(response.data);
    })
    .catch((error)=>{console.log(error);})
  }
  const handleTransactions = (e)=> {
    setSelectedTransactions(e)
  }
  const handlePostTransaction = (code,client_fk,total)=> {
    let transaction_type=transactionDescription.transaction_type
    if(transactionsType != 0 || transactionsType != 1){
      console.log('!= 0');
      axios.post(`https://badil.pythonanywhere.com/treasury-list-api`,{
        transaction_type:transaction_type,
        transaction_entity:purchaseEmployee.id,
        transaction_value:transactionValue
      })
      .then((response)=>{
        handleGetTransactions();
        handleGetTotalBalance();
        toast.current.show({severity:'success', summary: 'تم', detail:'تمت العملية بنجاح', life: 3000});
      })
      .catch((error)=>{
        console.log(error);
        toast.current.show({severity:'error', summary: 'خطأ', detail:error.response.data.error, life: 3000});
      })
    }else(
      axios.post(`https://badil.pythonanywhere.com/treasury-list-api`,{
        transaction_type:transaction_type,
        transaction_entity:purchaseEmployee.id,
        // transaction_value:total,
        orders:selectedTransactions
      })
      .then((response)=>{
        handleGetTransactions();
        handleGetTotalBalance();
        toast.current.show({severity:'success', summary: 'تم', detail:'تمت العملية بنجاح', life: 3000});
      })
      .catch((error)=>{
        console.log(error);
        toast.current.show({severity:'error', summary: 'خطأ', detail:error.response.data.error, life: 3000});
      })
    )
  }
  const handleGetTransactionValue = (e)=>{
    console.log(e.transaction_type);
    setTransactionDescription(e)
    if(e.transaction_type == 0) {
      setTransactionValueState(false)
      axios.get(`https://badil.pythonanywhere.com/order-filtered-state-api/delivered/${purchaseEmployee.id}`)
      .then((response)=>{
        console.log(response.data);
        setOrderDetails(response.data)
      })
      .catch((error)=>{console.log(error);})
    }else if (e.transaction_type == 1){
      setTransactionValueState(false)
      axios.get(`https://badil.pythonanywhere.com/order-filtered-state-api/on_purchace/${purchaseEmployee.id}`)
      .then((response)=>{
        console.log(response.data);
        setOrderDetails(response.data)
      })
      .catch((error)=>{console.log(error);})
    }
    else{
      setTransactionsType(e.transaction_type)
      console.log(e.transaction_type)
      setTransactionValueState(true)
    }
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
      <Dialog header="تفاصيل الأوردر" className='permission-dialog' visible={viewAddTransaction}  onHide={()=>setViewAddTransaction(false)}>
        <div className="add-procurements-pop">
          <div className="select-employee">
            <Dropdown value={purchaseEmployee} onChange={(e) => setPurchaseEmployee(e.value)} options={purchaseEmployeesList} optionLabel="employee_name" 
              placeholder="إختر الموظف" className="w-full md:w-14rem" />
            <Dropdown value={transactionDescription} onChange={(e) => handleGetTransactionValue(e.value)} options={transactionDescriptionList} optionLabel="transaction_name" 
              placeholder="إختر وصف الحركة" className="w-full md:w-14rem" />
            {
              transactionValueState === true ? 
                <InputText keyfilter="int" placeholder="قيمة الحركة" value={transactionValue} onChange={(e) => setTransactionValue(e.target.value)}/>
              :
                <InputText keyfilter="int" disabled placeholder="قيمة الحركة" value={transactionTotal}/>
            }
            <button className='confirm' onClick={handlePostTransaction}>تأكيد العملية</button>
          </div>
          {transactionValueState === false && 
            <div className='order-view-container'>
              <div className='label'>
                <span> الحركة</span>
                {/* <span>الجهة</span>
                <span>وصف الحركة</span>
                <span>قيمة الحركة</span>
                <span>خيارات</span> */}
              </div>
              <ListBox multiple value={selectedTransactions} onChange={(e) => handleTransactions(e.value)} options={orderDetails} optionLabel="id" className="w-full md:w-14rem" />
              {/* {orderDetails&& orderDetails.map((detail)=>{
                return(
                  <div className='row' style={{cursor:'pointer'}} key={detail.id} onClick={()=>setTransactionTotal(detail.order_master_total)}>
                    <div className='column'>{detail.id}</div>
                    <button className='post-transaction' onClick={()=>handlePostTransaction(detail.id ,detail.client_fk, detail.order_master_total)}>
                      <i className='pi pi-print' style={{"color":"rgb(113 138 247)"}}></i>
                    </button>
                    <div className='column'>{detail.order_detail_quantity}</div>
                    <div className='column'>{detail.product_unit}</div>
                    <div className='column'>{detail.order_item_sell_price}</div>
                    <div className='column'>{detail.order_detail_price}</div>
                  </div>
                )
              })} */}
            </div>
          }
        </div>
      </Dialog>
      <div className='main-treasury-content'>
        <section className="topSec">
          <div className="topSec-content" >
            <div className='current-balance-container'>
              <span className='current-balance-text'>الرصيد الحالي</span>
              <span className='current-balance'>{totalBalance} ج.م</span>
            </div>
          </div>
          <div className='allElements'>
            <div className='outerTable'>
              <div className='addBtn'>
                <button onClick={getEmployeesTransactions}>
                  <i className="fa-solid fa-plus" style={{color:'#ffffff'}}></i>
                  <span>اضافه</span>
                </button>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>تاريخ الحركة</th>
                    <th>الجهة</th>
                    <th>وصف الحركة</th>
                    <th>قيمة الحركة</th>
                    <th>خيارات</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions&& transactions.filter((item)=>{
                  return search&& search.toLowerCase() === ''? item
                  : item.employee_name.toLowerCase().includes(search);
                  }).map((transaction)=>{
                    return(
                    <tr id={`tr${transaction.id}`} key={transaction.id}>
                      <td>{transaction.transaction_date}</td>
                      <td>{transaction.employee_name}</td>
                      <td>{transaction.transaction_type_display}</td>
                      <td>{transaction.transaction_value}</td>
                      <td>
                        <button className='button'>
                          <i className="pi pi-print" style={{"color":"rgb(113 138 247)"}} ></i>
                        </button>
                        {/* <button className='button' onClick={()=>handlePrintPurchaseOrder(transaction.id,`#tr${transaction.id}`)}>
                          <i className="pi pi-print" style={{"color":"rgb(113 138 247)"}} ></i>
                        </button> */}
                      </td>
                    </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Treasury
