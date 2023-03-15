import React, { useState, useEffect } from 'react';
import { Model } from './interfaces';
import { register } from 'swiper/element/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import 'swiper/swiper-bundle.css';
register();

const RecentModels = (props: { recentModels: Model[] }) => {
  if (props.recentModels.length === 0) return null;

  function decodeHtml(html: any) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  return (
    <Swiper
      className='swiper-container'
      tag='section'
      wrapperTag='ul'
      id='main'
      centeredSlides={true}
      loop={true}
      slidesPerView={1}
      autoplay={{
        delay: 1000,
        reverseDirection: true,
        pauseOnMouseEnter: true,
      }}
      speed={2000}
      breakpoints={{
        500: {
          slidesPerView: 3,
        },
      }}
    >
      {props.recentModels.map((model, index) => (
        <SwiperSlide className='swiper-slide' tag='li' key={index}>
          <Link to={`/surfboard-model/${model.urlString}`}>
            <div className='img-container'>
              <img
                className='swiper-image'
                src={decodeHtml(model.imgLink)}
                alt={`${model.shaper}-${model.title}`}
              />
              <div className='slider-image-text'>{`${model.shaper} - ${model.title}`}</div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RecentModels;

{
  /* <div className='recent-models-container'>
        <div
          className='slider-image'
          style={{
            backgroundImage: `url(${props.recentModels[currentIndex].imgLink})`,
          }}
        ></div>
        <div
          className='slider-left-image slider-image'
          style={{
            backgroundImage: `url(${props.recentModels[previousIndex].imgLink})`,
          }}
        ></div>
        <div
          className='slider-right-image slider-image'
          style={{
            backgroundImage: `url(${props.recentModels[nextIndex].imgLink})`,
          }}
        ></div>
      </div>
      <div className='left-arrow' onClick={goToNext}>
        ⭅
      </div>
      <div className='right-arrow' onClick={goToPrevious}>
        ⭆
      </div>
    </div> */
}

// const goToNext = () => {
//   const newIndex =
//     currentIndex < props.recentModels.length - 1 ? currentIndex + 1 : 0;
//   const nextIndex =
//     newIndex < props.recentModels.length - 1 ? newIndex + 1 : 0;
//   const previousIndex =
//     newIndex !== 0 ? newIndex - 1 : props.recentModels.length - 1;
//   setCurrentIndex(newIndex);
//   setNextIndex(nextIndex);
//   setPreviousIndex(previousIndex);
// };

// const goToPrevious = () => {
//   const newIndex =
//     currentIndex !== 0 ? currentIndex - 1 : props.recentModels.length - 1;
//   const previousIndex =
//     newIndex !== 0 ? newIndex - 1 : props.recentModels.length - 1;
//   const nextIndex =
//     newIndex < props.recentModels.length - 1 ? newIndex + 1 : 0;
//   setCurrentIndex(newIndex);
//   setPreviousIndex(previousIndex);
//   setNextIndex(nextIndex);
// };
