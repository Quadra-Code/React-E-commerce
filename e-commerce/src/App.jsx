import React  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SuperUser from './components/superUser/superUser';
import ViewProducts from './components/superUser/viewProducts';
import AddSections from './components/superUser/addSection';
import ProductDetails from './components/superUser/ProductDetails';
import Home from './components/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path ='/' exact element= {<Home/>}/>
        <Route path='/super-user' exact element={<SuperUser/>}>
          <Route path='product-details' exact element={<ProductDetails/>}/>
          <Route path='view-products' exact element={<ViewProducts/>}/>
          <Route path='add-sections' element={<AddSections/>}/>
          <Route path='orders' element={<viewProducts/>}/>
        </Route>
      </Routes>
    </Router>
  )
}
export default App
