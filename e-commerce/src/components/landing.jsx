import React ,{Component, Fragment} from 'react';
import img1 from '../NEW QC/New folder/img1.webP';
import img2 from '../NEW QC/New folder/img2.webP';
import img3 from '../NEW QC/New folder/img3.webP';
import img4 from '../NEW QC/New folder/img4.webP';


class Landing extends Component {
  state = {
    imgsArray : [img1 , img2, img3, img4]
  }
  componentDidMount (){
    //it play one time when the component run, you can make it to show welcome message
    setInterval(() => {
      let landingPage = document.querySelector('.landing-container img');
      let randomNumber = Math.floor(Math.random() * this.state.imgsArray.length)
      landingPage.src = this.state.imgsArray[randomNumber];
    }, 5000);
  }
  render(){
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
}
export default Landing