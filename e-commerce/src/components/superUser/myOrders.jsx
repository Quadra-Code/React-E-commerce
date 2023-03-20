import React ,{Component, Fragment} from 'react'

class MyOrders extends Component {
  render(){
    return(
      <>
        <section className="topSec">
          <div className="topSec-content" >
            <h1>My Orders</h1>
            <div>
              <img alt ="pic" src="https://img.icons8.com/bubbles/100/null/purchase-order.png"/>
            </div>
          </div>
          <div className="botSec-content">
            <div className="outer-wrapper">
              <div className="table-header-cont">
              </div>
              <div className="table-wrapper">
                <table id="myTable">
                  <thead>
                    <tr>
                      <th>اسم العميل</th>
                      <th>رقم الهاتف</th>
                      <th>تفاصيل</th>
                    </tr>
                  </thead>
                  <tbody id="tBody">
                    <tr>
                      <td>Eslam Ali</td>
                      <td>01225816393</td>
                      <td>
                        <a href="#details">
                          <i className="fa-regular fa-share-from-square"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>Eslam Ali</td>
                      <td>01225816393</td>
                      <td>
                        <a href="#details">
                          <i className="fa-regular fa-share-from-square"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>Eslam Ali</td>
                      <td>01225816393</td>
                      <td>
                        <a href="#details">
                          <i className="fa-regular fa-share-from-square"></i>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }
}
export default MyOrders;