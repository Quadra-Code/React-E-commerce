import React, {Fragment,useState,useEffect} from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { addUser } from '../../redux/userSlice';
// import HashLoader from "react-spinners/HashLoader";
// import { nanoid } from 'nanoid';
import Swal from 'sweetalert2'
import axios from 'axios';
function AddSections_copy() {
  const [sections , setSections] = useState();
  const [category_name, setCategory_name] = useState("");
  // const [sub_categories, setSub_categories] = useState([]);
  // const {loading, error} = useSelector(state=> state.user);
  // const dispatch = useDispatch()
  useEffect (()=>{
    getAllProducts()
  },[])
  const getAllProducts = async ()=> {
    try {
      const response = await axios.get('http://localhost:9000/sections');
      setSections(response.data)
    } catch (error) {
      console.error(error);
    } 
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(category_name);
    // dispatch(addUser({ category_name }));
    try {
      const response = await axios.post('http://localhost:9000/sections', {
        category_name,
      });
      const newSection = {id:response.data.id, category_name };
      setSections([...sections, newSection]);
    } catch (error) {
      console.error(error);
    }
  };
  const handleActive = (e) =>{
    e.currentTarget.classList.toggle('activeCheckbox');
  }
  const handleDelete = (section)=> {
    Swal.fire({
      title: `Are you sure you want to delete ${section.category_name}?`,
      showCancelButton:true,
    }).then((data)=>{
      if(data.isConfirmed){
        fetch(`http://localhost:9000/sections/${section.id}`, {
          method: "DELETE",
        })
        .then((res)=>res.json())
        .then ((data)=>{
          console.log(data);
          getAllProducts()
        })
      }
    })
  }
  return (
    <Fragment>
      {/* {error && console.log('error')}
      {
        loading && category_name? 
        <HashLoader
        color={"#906fee"}
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
        cssOverride={override}
        />
        : */}
        <section className="topSec ">
          <div className="topSec-content" >
            <h1 >Add Sections</h1>
            <div>
              <img alt="img" src="https://img.icons8.com/bubbles/100/null/purchase-order.png"/>
            </div>
          </div>
          <div className='botSec-content addSec'>
            <div className="addSectionCont">
              <div className="col">
                <form action="" onSubmit={handleSubmit}>
                  <input type="text" required name ='categoryName' onChange={(e)=>setCategory_name(e.target.value)} placeholder="أسم القسم"/>
                  {/* <input type="text" onChange={(e)=>setSub_categories([{sub_category_name:e.target.value}])} name ='subName' placeholder="قسم فرعي"/> */}
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
                    {/* <th>الاقسام الفرعيه</th> */}
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
                          <td >{section.category_name}</td>
                          {/* <td>
                            <select>
                              {section.sub_categories.map((sub)=>
                              <option key={sub.id} value="">{sub.sub_category_name}</option>
                              )}
                            </select>
                          </td> */}
                          <td>
                            <button><i className="fa-regular fa-pen-to-square"></i></button>
                            <button onClick={()=>handleDelete(section)}><i className="fa-solid fa-trash"></i></button>
                          </td>
                        </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      {/* } */}
    </Fragment>
  )
}

export default AddSections_copy
