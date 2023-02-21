import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Add from './components/Add';
import Home from './components/Home';
import User from './components/User';
import Model from './components/Model';

import './App.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/surfboard-model/:modelId' element={<Model />} />
        <Route path='/user/:userId' element={<User />} />
        <Route path='/add' element={<Add />} /> */}
      </Routes>
    </div>
  );
}

export default App;
