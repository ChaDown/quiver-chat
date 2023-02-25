//USer Sidebar element

import React, { useState } from 'react';
import '../styles/user.css';
import LogIn from './LogIn';
import SignUp from './SignUp';
import IonIcon from '@reacticons/ionicons';

const User = (props: { visible: boolean; toggleUserVisible: () => void }) => {
  const userClass = props.visible ? 'show-sidebar' : 'hide-sidebar';
  const classes = `user-sidebar ${userClass}`;

  const [logInTab, setLogInTab] = useState(true);
  // Use for switching between log in / sign up tabs

  return (
    <section className={classes}>
      <button className='close-user-btn' onClick={props.toggleUserVisible}>
        <IonIcon
          className='close-user-icon'
          name='chevron-forward-outline'
          size='large'
        />
      </button>
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
      {logInTab ? <LogIn /> : <SignUp />}
    </section>
  );
};

export default User;
