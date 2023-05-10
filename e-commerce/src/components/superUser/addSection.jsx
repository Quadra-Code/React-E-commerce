import React, {Fragment,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from '../../redux/userSlice';
import HashLoader from "react-spinners/HashLoader";
import {nanoid} from 'nanoid';
import { useEffect } from 'react';
function AddSections() {
  const [sections , setSections] = useState([])
  const [name, setName] = useState("");
  const {loading, error} = useSelector(state=> state.user)
  const dispatch = useDispatch()
  const handleSubmit = (e)=> {
    e.preventDefault();
    dispatch(addUser({name}));
  }
  useEffect (()=>{
    getAllProducts()
  },[])
  const handleActive = (e) =>{
    e.currentTarget.classList.toggle('activeCheckbox');
  }
  const getAllProducts = ()=>{
    fetch('http://localhost:9000/sections')
    .then((res)=>res.json())
    .then ((data)=>{
      setSections(data)
    })
  }
  const handleDelete = (eId)=> {
    console.log(eId);
    fetch(`http://localhost:9000/sections/${eId}`, {
      method: "DELETE",
    })
    .then((res)=>res.json())
    .then ((data)=>{
      console.log(data);
      getAllProducts()
    })
  }
  const override ={
    position:'absolute',
    top : '40%',
    right : '45%',
    transform: 'translateY(-50%, -50%)'
  }
  return (
    <Fragment>
      {error && console.log('error')}
      {
        loading && name? 
        <HashLoader
        color={"#906fee"}
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
        cssOverride={override}
        />
        :
        <section className="topSec">
          <div className="topSec-content" >
            <h1>Add Sections</h1>
            <div>
              <img alt="img" src="https://img.icons8.com/bubbles/100/null/purchase-order.png"/>
            </div>
          </div>
          <div className='botSec-content addSec'>
            <div className="addSectionCont">
              <div className="col">
                <form action="" onSubmit={handleSubmit}>
                  {/* (e)=>setName(e.target.value) */}
                  <input type="text" required name ='categoryName' placeholder="أسم القسم"/>
                  <input type="text"  name ='subName' placeholder="قسم فرعي"/>
                  <button>
                    <span>اضافه</span>
                    <i className="fa-solid fa-arrow-left"></i>
                  </button>
                  <button>
                    <span>اضافة قسم اخر</span>
                    <i className="fa-regular fa-square-caret-down"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className='allElements'>
            <div className='outerTable'>
              <table>
                <thead>
                  <tr>
                    <th>
                      <div onClick={handleActive} className='Checkbox'>
                        <i className="fa-solid fa-check"></i>
                      </div>
                    </th>
                    <th>الاقسام</th>
                    <th>الاقسام الفرعيه</th>
                    <th>خيارات</th>
                  </tr>
                </thead>
                <tbody>
                  {sections&& sections.map((section)=>
                    <tr key={section.id}>
                      <td>
                        <div className='Checkbox'>
                          <i className="fa-solid fa-check"></i>
                        </div>
                      </td>
                      <td>{section.categoryName}</td>
                      <td>
                        <select>
                          {section.subCategories.map((sub)=>
                          <option key={sub.id} value="">{sub.subName}</option>
                          )}
                        </select>
                      </td>
                      <td>
                        <button><i className="fa-regular fa-pen-to-square"></i></button>
                        <button onClick={()=>handleDelete(section.id)}><i className="fa-solid fa-trash"></i></button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      }
    </Fragment>
  )
}

export default AddSections
