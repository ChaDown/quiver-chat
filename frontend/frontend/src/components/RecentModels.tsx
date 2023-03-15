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
        600: {
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
