import React ,{Component, Fragment} from 'react';

class MenuSec extends Component {
  state = {
    product1: {
      img:require('../NEW QC/New folder/Pro4.jpg'),
      bestSeller:true,
      label:'هاني كيك نوتيلا',
      preif:'الكيكه الاسفنجيه المحشوه بكريمة النوتيلا و مغطاة بطبقه من اللوتس',
    }
  }
  changeAboutContent = ()=> {
    console.log('yes')
  }
  render() {
    return(
      <>
        <section id="aboutus" className="aboutUs-container">
          <div className="aboutUs-content">
            <h2 className="sec-label">المنيو بتاعنا</h2>
            <div className ="aboutUs-list">
              <div className="aboutUs-listCol active" id="team" onClick={this.changeAboutContent('#team')}>
                قسم الالبان
              </div>
              <div className="aboutUs-listCol" id="process" onClick={this.changeAboutContent('#process')}>
                الركن الشرقي
              </div>
              <div className="aboutUs-listCol" id="delivery" onClick={this.changeAboutContent('#delivery')}>
                الركن الغربي
              </div>
              <div className="aboutUs-listCol" id="chooseUs" onClick={this.changeAboutContent('#chooseUs')}>
                المخبوزات
              </div>
              <div className="aboutUs-listCol " id="team1" onClick={this.changeAboutContent('#team1')}>
                التورت
              </div>
              <div className="aboutUs-listCol" id="more" onClick={this.changeAboutContent('#team')}>
                المنيو كله
              </div>
            </div>
            <div className="aboutContent">
              <div className="aboutUs-ourTeam"  id="teamCont">
                <div className="col">
                  <span className="header">الاكثر مبيعا</span>
                  <div className="features-container">
                    <div className="features cart1">
                      <img src={this.state.product1.img} alt=""/>
                      <div className="feat">
                        <span className="bestSeller">الاكثر مبيعا</span>
                        <span>{this.state.product1.label}</span>
                        <span className="description">{this.state.product1.preif}</span>
                        <div className="links-container">
                          <a href="#cart">
                            <i className="fa-solid fa-cart-shopping"></i>
                          </a>
                          <span>20$</span>
                        </div>
                      </div>
                    </div>
                    <div className="features cart1">
                      <img src={require('../NEW QC/New folder/Pro5.jpg')} alt=""/>
                      <div className="feat">
                        <span>هاني كيك نوتيلا</span>
                        <span className="description">الكيكه الاسفنجيه المحشوه بكريمة النوتيلا و مغطاة بطبقه من اللوتس</span>
                        <div className="links-container">
                          <a href="#3">
                            <i className="fa-solid fa-cart-shopping"></i>
                          </a>
                          <span>20$</span>
                        </div>
                      </div>
                    </div>
                    <div className="features cart1">
                      <img src={require('../NEW QC/New folder/Pro1.jpg')} alt=""/>
                      <div className="feat">
                        <span>هاني كيك نوتيلا</span>
                        <span className="description">الكيكه الاسفنجيه المحشوه بكريمة النوتيلا و مغطاة بطبقه من اللوتس</span>
                        <div className="links-container">
                          <a href="#3">
                            <i className="fa-solid fa-cart-shopping"></i>
                          </a>
                          <span>20$</span>
                        </div>
                      </div>
                    </div>
                    <div className="features cart1">
                      <img src={require('../NEW QC/New folder/Pro3.jpg')} alt=""/>
                      <div className="feat">
                        <span>هاني كيك نوتيلا</span>
                        <span className="description">الكيكه الاسفنجيه المحشوه بكريمة النوتيلا و مغطاة بطبقه من اللوتس</span>
                        <div className="links-container">
                          <a href="#3">
                            <i className="fa-solid fa-cart-shopping"></i>
                          </a>
                          <span>20$</span>
                        </div>
                      </div>
                    </div>
                    <div className="features cart1">
                      <img src={require('../NEW QC/New folder/Pro1.jpg')} alt=""/>
                      <div className="feat">
                        <span>هاني كيك نوتيلا</span>
                        <span className="description">الكيكه الاسفنجيه المحشوه بكريمة النوتيلا و مغطاة بطبقه من اللوتس</span>
                        <div className="links-container">
                          <a href="#3">
                            <i className="fa-solid fa-cart-shopping"></i>
                          </a>
                          <span>20$</span>
                        </div>
                      </div>
                    </div>
                    <div className="features cart1">
                      <img src={require('../NEW QC/New folder/Pro3.jpg')} alt=""/>
                      <div className="feat">
                        <span>هاني كيك نوتيلا</span>
                        <span className="description">الكيكه الاسفنجيه المحشوه بكريمة النوتيلا و مغطاة بطبقه من اللوتس</span>
                        <div className="links-container">
                          <a href="#cart">
                            <i className="fa-solid fa-cart-shopping"></i>
                          </a>
                          <span>20$</span>
                        </div>
                      </div>
                    </div>
                    <div className="features cart1">
                      <img src={require('../NEW QC/New folder/Pro4.jpg')} alt=""/>
                      <div className="feat">
                        <span>هاني كيك نوتيلا</span>
                        <span className="description">الكيكه الاسفنجيه المحشوه بكريمة النوتيلا و مغطاة بطبقه من اللوتس</span>
                        <div className="links-container">
                          <a href="3">
                            <i className="fa-solid fa-cart-shopping"></i>
                          </a>
                          <span>20$</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="more">
                    <div className="content">
                      <span>المزيد</span>
                      <i className="fa-solid fa-arrow-left"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    ) 
  }
}
export default MenuSec; 