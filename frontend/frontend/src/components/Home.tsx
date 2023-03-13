import React, { useContext, useEffect, useState } from 'react';
import Search from './Search';
import RecentModels from './RecentModels';
import '../styles/home.css';
import { Model } from './interfaces';
import RecentComments from './RecentComments';
import IonIcon from '@reacticons/ionicons';
import { UserContext, UserVisibleContext } from './Contexts';

const Home = () => {
  const [recentModels, setRecentModels] = useState<Model[]>([]);
  const { user, setUser } = useContext(UserContext);
  const { userVisible, setUserVisible } = useContext(UserVisibleContext);

  useEffect(() => {
    fetch('http://localhost:3000/api/model/all-models')
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
          <h1>Quiver Chat</h1>
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
        <h2>Let's Talk Surfboards</h2>
        <Search isHomePage={true} />
      </div>
      <RecentModels recentModels={recentModels} />
      <section className='recent-comments'>
        <RecentComments />
      </section>
    </div>
  );
};

export default Home;
