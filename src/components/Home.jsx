import React ,{ useEffect, Fragment} from 'react'
import scrollreveal from 'scrollreveal';
import Navbar from './navbar';
import Landing from './landing';
import Information from './aboutUS';
import MenuSec from './menuSec';
import Clients from './clients';
import Footer from './footer';
import { useState } from 'react';
import HashLoader from "react-spinners/HashLoader"


function Home() {
  const [loading, setLoading] = useState(false);
  const override ={
    position:'absolute',
    top : '40%',
    right : '45%',
    transform: 'translateY(-50%, -50%)'
  }
  useEffect (()=>{
    animation()
    setLoading(true);
    setTimeout(()=>{
    setLoading(false);
    },1500)
  },[])
  const animation = () => {
    scrollreveal({ 
      reset: false ,
      distance:'60px',
      duration:1500,
      delay:400,
    });
    scrollreveal().reveal('.servicer-content .col', { delay: 50, origin: 'bottom', interval:'200' });
    scrollreveal().reveal('.features-container .features', { delay: 50, origin: 'right', interval:'200' });
    scrollreveal().reveal('.landingRe1', { delay: 10, origin: 'top' });
    scrollreveal().reveal('.landingRe2', { delay: 10, origin: 'top' });
    scrollreveal().reveal('.landingRe3', { delay: 10, origin: 'bottom' });
  }
  return (
    <main className='home-page'>
      {
      
      loading ?
      <HashLoader
        color={"#906fee"}
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
        cssOverride={override}
      />
      :
      <Fragment>
        <Navbar/>
        <Landing/>
        {/* <Information/> */}
        <MenuSec/>
        <Clients/>
        <Footer/>
      </Fragment>
      }
    </main>
  )
}

export default Home