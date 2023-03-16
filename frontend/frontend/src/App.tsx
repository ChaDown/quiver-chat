import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import User from './components/User';
import Model from './components/ModelPage';
import NavBar from './components/NavBar';
import { UserContext, UserVisibleContext } from './components/Contexts';
import './App.css';
import { UserInterface } from './components/interfaces';

function App() {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [userVisible, setUserVisible] = useState(false);
  const userValue = { user, setUser };
  const userVisibleValue = { userVisible, setUserVisible };

  useEffect(() => {
    fetch(`https://quiver-chat-api.onrender.com/api/user/me`, {
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) return;
        return res.json();
      })
      .then((data) => {
        if (data) setUser(data.user);
      });
  }, []);

  return (
    <UserContext.Provider value={userValue}>
      <UserVisibleContext.Provider value={userVisibleValue}>
        <div className={userVisible ? 'overlay' : ''}></div>
        <User />
        <div className={userVisible ? 'unclickable' : ''}>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/surfboard-model/:urlString' element={<Model />} />
            {/* <Route path='/user/:userId' element={<User />} />
         <Route path='/add' element={<Add />} /> */}
          </Routes>
        </div>
      </UserVisibleContext.Provider>
    </UserContext.Provider>
  );
}

export default App;

// return (
//   <UserContext.Provider value={user}>
//     <UserVisibleContext.Provider value={userVisible}>
//     <div className={userVisible ? 'overlay' : ''}></div>
//     <User
//       visible={userVisible}
//       toggleUserVisible={toggleUserVisible}
//       user={user}
//     />
//     <div className={userVisible ? 'unclickable' : ''}>
//       <NavBar toggleUserVisible={toggleUserVisible} user={user} />
//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/surfboard-model/:urlString' element={<Model />} />
//         {/* <Route path='/user/:userId' element={<User />} />
//       <Route path='/add' element={<Add />} /> */}
//       </Routes>

//       </div>
//       </UserVisibleContext.Provider>
//       </UserContext.Provider>
// )
// }
