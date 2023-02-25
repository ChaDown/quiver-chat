import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Add from './components/Add';
import Home from './components/Home';
import User from './components/User';
import Model from './components/Model';
import NavBar from './components/NavBar';
import './App.css';

function App() {
  const [user, setUser] = useState({});
  const [userVisible, setUserVisible] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/api/user/me`)
      .then((res) => {
        console.log(res);
        if (!res.ok) return;
        res.json();
      })
      .then((data) => console.log(data));
  }, []);

  const toggleUserVisible = () => {
    setUserVisible(!userVisible);
  };

  return (
    <div>
      <div className={userVisible ? 'overlay' : ''}></div>
      <User visible={userVisible} toggleUserVisible={toggleUserVisible} />
      <div className={userVisible ? 'unclickable' : ''}>
        <NavBar toggleUserVisible={toggleUserVisible} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/surfboard-model/:urlString' element={<Model />} />
          {/* <Route path='/user/:userId' element={<User />} />
        <Route path='/add' element={<Add />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
