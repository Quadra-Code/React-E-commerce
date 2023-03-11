import React, {Component, Fragment} from 'react';

class AddSections extends Component{
  render(){
    return(
      <>
        <section className="topSec">
          <div className="topSec-content" >
            <h1>Add sections</h1>
            <div>
              <img alt="icon" src="https://img.icons8.com/bubbles/100/null/purchase-order.png"/>
            </div>
          </div>
          <div className='botSec-content addSec'>
            <div className="addSectionCont">
              <div className="col">
                <input type="text" placeholder="أسم القسم"/>
                <input type="text" placeholder="قسم فرعي"/>
                <button>
                  <span>اضافه</span>
                  <i className="fa-solid fa-arrow-left"></i>
                </button>
                <button>
                  <span>اضافة قسم اخر</span>
                  <i className="fa-regular fa-square-caret-down"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }
}
export default AddSections;