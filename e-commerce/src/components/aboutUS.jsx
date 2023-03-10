import React ,{Component, Fragment} from 'react';


class Information extends Component {
  state = {
    Object1: 'نقوم بستخدام افضل انواع الدقيق و المكونات المستخدمه ونقوم بصناعة السمن المستخدم بأنفسنا',
    Object2: 'خمسة عشر عاما من الخبره في مجال صناعة الحلوي',
    Object3: 'لدينا ما يقرب من 2500 شيف و عامل ',
  }
  render () {
    return (
      <>
        <section id="services" className="services-container">
          <h2 className="sec-label">ماذا عنا ؟</h2>
          <div className="servicer-content">
            <div className="col">
              <div className="i-cont">
                <i className="fa-solid fa-utensils"></i>
              </div>
              <h3>الجوده</h3>
              <span>
                {this.state.Object1}
              </span>
            </div>
            <div className="col">
              <div className="i-cont">
                <i className="fa-solid fa-ranking-star"></i>
              </div>
              <h3>سنوات الخبره</h3>
              <span>
              {this.state.Object2}
              </span>
            </div>
            <div className="col">
              <div className="i-cont">
                <i className="fa-solid fa-user-tie"></i>
              </div>
              <h3>الايدي العامله</h3>
              <span>
              {this.state.Object3}
              </span>
            </div>
          </div>
        </section>
      </>
    )
  }
} 
export default Information;