import React, { useContext, useEffect, useState } from 'react';
import Search from './Search';
import RecentModels from './RecentModels';
import '../styles/home.css';
import { Model } from './interfaces';
import RecentComments from './RecentComments';
import IonIcon from '@reacticons/ionicons';
import { UserContext, UserVisibleContext } from './Contexts';
import HomeImg from '../imgs/logo-qc.png';

const Home = () => {
  const [recentModels, setRecentModels] = useState<Model[]>([]);
  const { user } = useContext(UserContext);
  const { userVisible, setUserVisible } = useContext(UserVisibleContext);

  useEffect(() => {
    fetch('https://quiver-chat-api.onrender.com/api/model/all-models')
      .then((res) => res.json())
      .then((data: Model[]) => {
        const lastFive: Model[] = data.slice(-5).reverse();
        setRecentModels(lastFive);
      });
  }, []);

  return (
    <div>
      <div className='searchContainer'>
        <div className='top-row-home'>
          <img className='logo-img' src={HomeImg} alt='Quiver Chat Home' />
          {user ? (
            <button
              className='user-icon user-icon-button user-icon-btn-home'
              onClick={() => setUserVisible(!userVisible)}
            >
              {user.username ? user.username[0].toUpperCase() : ''}
            </button>
          ) : (
            <IonIcon
              className='user-icon'
              name='person-circle-outline'
              size='large'
              onClick={() => setUserVisible(!userVisible)}
            />
          )}
        </div>
        <Search isHomePage={true} />
      </div>
      <RecentModels recentModels={recentModels} />
      <RecentComments />
    </div>
  );
};

export default Home;
