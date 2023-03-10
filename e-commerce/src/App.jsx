import React ,{Component , Fragment} from 'react';
import scrollreveal from 'scrollreveal';
import Navbar from './components/navbar';
import Landing from './components/landing';
import Information from './components/aboutUS';
import MenuSec from './components/menuSec';
import Clients from './components/clients';
import Footer from './components/footer';

class App extends Component {
  animation = () => {
    scrollreveal({ 
      reset: true ,
      distance:'60px',
      duration:1500,
      delay:400,
    });
    scrollreveal().reveal('.servicer-content .col', { delay: 50, origin: 'bottom', interval:'200' });
    scrollreveal().reveal('.features-container .features', { delay: 50, origin: 'right', interval:'200' });
    scrollreveal().reveal('.landingRe1', { delay: 300, origin: 'top' });
    scrollreveal().reveal('.landingRe2', { delay: 200, origin: 'top' });
    scrollreveal().reveal('.landingRe3', { delay: 100, origin: 'bottom' });
  }
  componentDidMount (){
    this.animation();
  }
  render() {
    return (
      <>
        <main>
          <Navbar/>
          <Landing/>
          <Information/>
          <MenuSec/>
          <Clients/>
          <Footer/>
        </main>
      </>
    )
  }
}
export default App;
