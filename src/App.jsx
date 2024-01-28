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
import Permissions from './components/superUser/permissions';
import Users from './components/superUser/users';
import Procurements from './components/superUser/procurements';
import Dispatch from './components/superUser/dispatch';
import Treasury from './components/treasury';
import LoginForEmployee from './components/loginForEmloyee';
import EmployeeScreens from './components/employeeScreens';

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
    <Router basename= "/React-E-commerce">
      <Routes>
        <Route path ='/' exact element= {<Home/>}/>
        <Route path ='/login' exact element= {<Login/>}/>
        <Route path ='/employee-login' exact element= {<LoginForEmployee/>}/>
        <Route path ='/sign-up' exact element= {<SignUp/>}/>
        <Route path ='/all-menu' exact element= {<AllMenu/>}/>
        <Route path ='/treasury' exact element= {<Treasury/>}/>
        <Route path ='/my-cart' exact element= {<MyCart/>}/>
        <Route path ='/checkout' exact element= {<Checkout/>}/>
        <Route path ='/employee-screens' exact element= {<EmployeeScreens/>}>
          
        </Route>
        <Route path='/super-user' exact element={<SuperUser/>}>
          <Route path ='procurements' exact element= {<Procurements/>}/>
          <Route path ='dispatch' exact element= {<Dispatch/>}/>
          <Route path='permissions' exact element={<Permissions/>}/>
          <Route path='users' exact element={<Users/>}/>
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
