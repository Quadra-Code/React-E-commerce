import React ,{Component, Fragment} from 'react'

class AddProducts extends Component {
  render(){
    return(
      <>
        <section className="topSec">
          <div className="topSec-content" >
            <h1>Add Products</h1>
            <div>
              <img alt="img" src="https://img.icons8.com/bubbles/100/null/purchase-order.png"/>
            </div>
          </div>
          <div className='botSec-content addSec'>
            <div className="addSectionCont">
              <div className="col">
                <form action="">
                  <input type="text" placeholder="أسم الصنف"/>
                  <input type="number" placeholder="سعر الوحده / الكيلو"/>
                  <input type="file" placeholder="سعر الوحده / الكيلو"/>
                  <select name="" id="">
                    <option value="قسم الالبان">قسم الالبان</option>
                    <option value="قسم الالبان">قسم الالبان</option>
                    <option value="قسم الالبان">قسم الالبان</option>
                  </select>
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
        </section>
      </>
    )
  }
}
export default AddProducts;