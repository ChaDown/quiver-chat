//USer Sidebar element

import React, { useState, useContext } from 'react';
import '../styles/user.css';
import LogIn from './LogIn';
import SignUp from './SignUp';
import IonIcon from '@reacticons/ionicons';
import { UserInterface } from './interfaces';
import { UserContext, UserVisibleContext } from './Contexts';
import UserInfo from './UserInfo';

const User = () => {
  const { user, setUser } = useContext(UserContext);
  const { userVisible, setUserVisible } = useContext(UserVisibleContext);
  const [apiRes, setApiRes] = useState(null);
  const userClass = userVisible ? 'show-sidebar' : 'hide-sidebar';
  const classes = `user-sidebar ${userClass}`;
  const [logInTab, setLogInTab] = useState(true);
  // Use for switching between log in / sign up tabs

  // This function will be called when we login in and also sign up. New users will be logged in automatically upon signing up.
  const loginAndSetCookie = async (
    username: string,
    password: string,
    e?: React.FormEvent<HTMLFormElement>
  ) => {
    if (e) e.preventDefault();
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        username,
        password,
      }),
      credentials: 'include',
    });

    const data = await response.json();
    setApiRes(data.message);
    if (data.user) setUser(data.user);
  };

  return (
    <section className={classes}>
      <button
        className='close-user-btn'
        onClick={() => setUserVisible(!userVisible)}
      >
        <IonIcon
          className='close-user-icon'
          name='chevron-forward-outline'
          size='large'
        />
      </button>
      {user ? (
        <UserInfo />
      ) : (
        <div>
          <div className='log-sign-tab'>
            <button
              className={logInTab ? 'active tab' : 'tab'}
              onClick={() => setLogInTab(true)}
            >
              Log In
            </button>
            <button
              className={logInTab ? 'tab' : 'active tab'}
              onClick={() => setLogInTab(false)}
            >
              {' '}
              Sign Up
            </button>
          </div>

          {logInTab ? (
            <LogIn logInHandler={loginAndSetCookie} apiRes={apiRes} />
          ) : (
            <SignUp logInHandler={loginAndSetCookie} apiRes={apiRes} />
          )}
        </div>
      )}
    </section>
  );
};

export default User;
