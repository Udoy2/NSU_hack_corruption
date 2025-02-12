import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./heroSlider.css";

import { EffectFade, Pagination, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";

const HeroSlider = () => {
  return (
    <>
      <header>
        <Swiper
          spaceBetween={30}
          effect={"fade"}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{
            clickable: true,
          }}
          loop={true}
          modules={[EffectFade, Pagination, Autoplay]}
          speed={2000}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="relative w-full h-full flex items-center justify-center text-white">
              <img
                src="https://s.rfi.fr/media/display/72096c12-5263-11ef-aca6-005056a97e36/w:980/p:16x9/1fbebfacfac82bcc44a3dc9a5c4d0183817bf27c.jpg"
                alt="Slide Image"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#000000b1] bg-opacity-50 flex flex-col items-start justify-center p-6">
                <h2 className="lg:text-7xl md:text-5xl text-3xl raleway font-black mb-2 uppercase leading-snug mx-5 sm:mx-20 lg:mx-12 ">
                  <span className="text-[#36A688]">Report Corruption.</span>{" "}
                  <br />
                  Stay Safe. Make a Change.
                </h2>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-full flex items-center justify-center text-white">
              <img
                src="https://img.freepik.com/free-photo/hands-passing-money-table-corruption-bribery_53876-139611.jpg?t=st=1739221750~exp=1739225350~hmac=53ba27449c0fccfd2c6cdb388a497f35d26fb89cac6eb50022bae841121c4219&w=1380"
                alt="Slide Image"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#000000b1] bg-opacity-50 flex flex-col items-start justify-center p-6">
                <h2 className="lg:text-7xl md:text-5xl text-3xl raleway font-black mb-2 uppercase leading-snug mx-5 sm:mx-20 lg:mx-12 ">
                  Identity Fighting <br />
                  Corruption.{" "}
                  <span className="text-[#36A688]">
                    One Report <br />
                    at a Time!
                  </span>
                </h2>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-full flex items-center justify-center text-white">
              <img
                src="https://images.unsplash.com/photo-1670602152500-e14c206b5335?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Slide Image"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#000000b1] bg-opacity-50 flex flex-col items-start justify-center p-6">
                <h2 className="lg:text-7xl md:text-5xl text-3xl raleway font-black mb-2 uppercase leading-snug mx-5 sm:mx-20 lg:mx-12 ">
                  <span className="text-[#36A688]">Report Corruption.</span>
                  <br />
                  Stay Safe. Make a Change.
                </h2>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-full flex items-center justify-center text-white">
              <img
                src="/images/hero-image.jpg"
                alt="Slide Image"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#000000b1] bg-opacity-50 flex flex-col items-start justify-center p-6">
                <h2 className="lg:text-7xl md:text-5xl text-3xl raleway font-black mb-2 uppercase leading-snug mx-5 sm:mx-20 lg:mx-12 ">
                  Identity Fighting <br />
                  Corruption.{" "}
                  <span className="text-[#36A688]">
                    One Report <br />
                    at a Time!
                  </span>
                </h2>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </header>
    </>
  );
};

export default HeroSlider;
