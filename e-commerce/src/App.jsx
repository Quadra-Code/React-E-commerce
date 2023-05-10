import React  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SuperUser from './components/superUser/superUser';
import AddProducts from './components/superUser/addProduct';
import AddSections from './components/superUser/addSection';
import Home from './components/Home'



function App() {
  return (
    <Router>
      <Routes>
        <Route path ='/' exact element= {<Home/>}/>
        <Route path='/super-user' exact element={<SuperUser/>}>
          <Route path='add-products' element={<AddProducts/>}/>
          <Route path='add-sections' element={<AddSections/>}/>
          <Route path='orders' element={<AddProducts/>}/>
        </Route>
      </Routes>
    </Router>
  )
}
export default App
