/* eslint-disable no-unused-vars */
import React,{useReducer}  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SuperUser from './components/superUser/superUser';
import ViewProducts from './components/superUser/viewProducts';
import ViewProduct from './components/superUser/viewProduct';
import AddSections from './components/superUser/addSection';
import AddProduct from './components/superUser/addProduct';
import Admin from './components/admin/admin';
import Orders from './components/admin/orders';
import AddNewOrder from './components/admin/addNewOrder';
import ViewOrder from './components/admin/viewOrder';
import AllMenu from './components/allMenu';
import MyCart from './components/myCart';
import Home from './components/Home'
import Login from './components/login';
import SignUp from './components/signUp';
import Checkout from './components/checkout';

// const initState = {
//   product_data : null
// }
// const reducer = (state, action) =>{
//   if (action.type === 'product_view') {
//     return {
//       product_data: state.product
//     };
//   }
//   throw Error('Unknown action.');
// }
function App() {
  // const [state, dispatch] = useReducer(reducer,initState)
  
  return (
    <Router>
      <Routes>
        <Route path ='/home' exact element= {<Home/>}/>
        <Route path ='/login' exact element= {<Login/>}/>
        <Route path ='/sign-up' exact element= {<SignUp/>}/>
        <Route path ='/all-menu' exact element= {<AllMenu/>}/>
        <Route path ='/my-cart' exact element= {<MyCart/>}/>
        <Route path ='/checkout' exact element= {<Checkout/>}/>
        <Route path='/super-user' exact element={<SuperUser/>}>
          <Route path='add-product/:productID' exact element={<AddProduct/>}/>
          <Route path='view-products' exact element={<ViewProducts/>}/>
          <Route path='view-product/:productID' exact element={<ViewProduct/>}/>
          <Route path='add-sections' element={<AddSections/>}/>
          <Route path='admin' element={<Admin/>}/>
        </Route>
        <Route path='/admin' exact element={<Admin/>}>
          <Route path='add-new-order/:customerID' element={<AddNewOrder/>}/>
          <Route path='view-order/:customerID' element={<ViewOrder/>}/>
          <Route path='orders' element={<Orders/>}/>
        </Route>
      </Routes>
    </Router>
  )
}
export default App
