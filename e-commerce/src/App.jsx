/* eslint-disable no-unused-vars */
import React,{useReducer}  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SuperUser from './components/superUser/superUser';
import ViewProducts from './components/superUser/viewProducts';
import ViewProduct from './components/superUser/viewProduct';
import AddSections from './components/superUser/addSection';
import AddProduct from './components/superUser/addProduct';
import Home from './components/Home'

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
        <Route path ='/' exact element= {<Home/>}/>
        <Route path='/super-user' exact element={<SuperUser/>}>
          <Route path='add-product/:productID' exact element={<AddProduct/>}/>
          <Route path='view-products' exact element={<ViewProducts/>}/>
          <Route path='view-product/:productID' exact element={<ViewProduct/>}/>
          <Route path='add-sections' element={<AddSections/>}/>
          <Route path='orders' element={<viewProducts/>}/>
        </Route>
      </Routes>
    </Router>
  )
}
export default App
