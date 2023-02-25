import React, { useEffect, useState } from 'react';
import Search from './Search';
import RecentModels from './RecentModels';
import '../styles/home.css';
import { Model } from './interfaces';

const Home = () => {
  // const [recentComments, setRecentComments] = useState();

  // useEffect(() => {
  //   fetch('http://localhost:3000/api/model/all-models')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setRecentComments(data);
  //     });
  // }, []);
  const [recentModels, setRecentModels] = useState<Model[]>([]);

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
        <h1>Quiver Chat</h1>
        <h2>Let's Talk Surfboards</h2>
        <Search isHomePage={true} />
      </div>
      <RecentModels recentModels={recentModels} />
    </div>
  );
};

export default Home;
