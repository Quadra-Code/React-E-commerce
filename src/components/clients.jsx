import React  from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from "swiper/modules";
// import { useRef, useState } from 'react';

export default function Clients() {
  return(
    <>
      <section className='swiper-section'>
        <h2>أراء عملائنا</h2>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper reveal"
          >
            <SwiperSlide className="swiper-slide">
              <div className="slideCol">
                <span>
                  <i className="fa-solid fa-quote-right"></i>
                </span>
                <span>
                  احلي طعم جربته ف حياتي فحياتيي بقولك
                </span>
                <div className="clientInfo">
                  <img alt ="img" src={"https://img.icons8.com/bubbles/60/null/user.png"}/>
                  <span>فريده أحمد</span>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div className="slideCol">
                <span>
                  <i className="fa-solid fa-quote-right"></i>
                </span>
                <span>
                  احلي طعم جربته ف حياتي فحياتيي بقولك
                </span>
                <div className="clientInfo">
                  <img alt ="img" src={"https://img.icons8.com/bubbles/60/null/user.png"}/>
                  <span>فريده أحمد</span>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div className="slideCol">
                <span>
                  <i className="fa-solid fa-quote-right"></i>
                </span>
                <span>
                  احلي طعم جربته ف حياتي فحياتيي بقولك
                </span>
                <div className="clientInfo">
                  <img alt ="img" src={"https://img.icons8.com/bubbles/60/null/user.png"}/>
                  <span>فريده أحمد</span>
                </div>
              </div>
            </SwiperSlide>
        </Swiper>
      </section>
    </>
  )
}
