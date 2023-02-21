import React, { useEffect, useState } from 'react';
import HomeSearch from './HomeSearch';
import '../styles/home.css';

const Home = () => {
  const [recentComments, setRecentComments] = useState();
  const [recentModels, setRecentModels] = useState();

  useEffect(() => {
    fetch('http://localhost:3000/api/model/get-recent-models')
      .then((res) => res.json())
      .then((data) => {
        setRecentModels(data);
      });
    fetch('http://localhost:3000/api/model/get-recent-comments')
      .then((res) => res.json())
      .then((data) => {
        setRecentComments(data);
      });
  }, []);

  return <HomeSearch />;
};

export default Home;
