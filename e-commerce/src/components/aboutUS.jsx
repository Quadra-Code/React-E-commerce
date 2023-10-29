
import React,{useState} from 'react';

function AboutUS() {
  const [name, setName] = useState(
    {
      Object1: 'نقوم بستخدام افضل انواع الدقيق و المكونات المستخدمه ونقوم بصناعة السمن المستخدم بأنفسنا',
      Object2: 'خمسة عشر عاما من الخبره في مجال صناعة الحلوي',
      Object3: 'لدينا ما يقرب من 2500 شيف و عامل ',
    }
    );
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
              {name.Object1}
            </span>
          </div>
          <div className="col">
            <div className="i-cont">
              <i className="fa-solid fa-ranking-star"></i>
            </div>
            <h3>سنوات الخبره</h3>
            <span>
            {name.Object2}
            </span>
          </div>
          <div className="col">
            <div className="i-cont">
              <i className="fa-solid fa-user-tie"></i>
            </div>
            <h3>الايدي العامله</h3>
            <span>
            {name.Object3}
            </span>
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutUS

