import React, { useState,useEffect } from 'react'
import img1 from '../NEW QC/New folder/img1.webP';
import img2 from '../NEW QC/New folder/img2.webP';
import img3 from '../NEW QC/New folder/img3.webP';
import img4 from '../NEW QC/New folder/img4.webP';

function Landing() {
  const [imgsArray,setImgsArray] = useState([img1 , img2, img3, img4]);
  useEffect(()=>{
    //it play one time when the component run, you can make it to show welcome message
    setInterval(() => {
      let landingPage = document.querySelector('.landing-container img');
      let randomNumber = Math.floor(Math.random() * imgsArray.length)
      landingPage.src = imgsArray[randomNumber];
    }, 10000);
  },[])
  return (
    <>
      <section id="home" className="landing-container">
        <img src={img4} alt="" />
        <div className="landing-content">
          <span className="landingRe1">عشرون عاما من الخبره</span>
          <h2 className="landingRe2">متخصصون في صناعة الحلويات</h2>
          <span className="landingRe3">نعمل جاهدين لتوفير افضل تجربة لك</span>
        </div>
      </section>
    </>
  )
}
export default Landing
// state = {
//   imgsArray : [img1 , img2, img3, img4]
// }
// componentDidMount (){
//   //it play one time when the component run, you can make it to show welcome message
//   setInterval(() => {
//     let landingPage = document.querySelector('.landing-container img');
//     let randomNumber = Math.floor(Math.random() * this.state.imgsArray.length)
//     landingPage.src = this.state.imgsArray[randomNumber];
//   }, 5000);
// }