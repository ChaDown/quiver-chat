import { useContext, useEffect, useState } from 'react';
import { UserContext, UserVisibleContext } from './Contexts';
import { UserDocument } from './interfaces';
import IonIcon from '@reacticons/ionicons';

const AccountInfo = (props: {
  isActive: 'home' | 'account' | 'activity';
  setIsActive: (s: 'home' | 'account' | 'activity') => void;
}) => {
  const { user, setUser } = useContext(UserContext);
  const [newUsername, setNewUsername] = useState<string>('');
  const [newUsername1, setNewUsername1] = useState<string>('');
  const [newUsernameVisible, setNewUsernameVisible] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPassword1, setNewPassword1] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [apiMessage, setApiMessage] = useState<string>('');

  // Submit username -> Check it's okay -> Change Username on usercontext
  async function submitUsernameHandler(e?: React.FormEvent<HTMLFormElement>) {
    if (e) e.preventDefault();
    if (newUsername !== newUsername1) return;

    const response = await fetch(
      'http://localhost:3000/api/user/change-username',
      {
        method: 'put',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          username: newUsername,
        }),
        credentials: 'include',
      }
    );

    const data = await response.json();
    setApiMessage(data.message);
  }

  // Submit password -> Check current password is valid -> Check new passwords match -> Update current password
  async function submitPasswordHandler(e?: React.FormEvent<HTMLFormElement>) {
    if (e) e.preventDefault();
    if (newPassword !== newPassword1) {
      setApiMessage("Passwords don't match!");
      return;
    }

    const response = await fetch(
      'http://localhost:3000/api/user/change-password',
      {
        method: 'put',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          password: password,
          newPassword: newPassword,
        }),
        credentials: 'include',
      }
    );

    const data = await response.json();
    setApiMessage(data.message);
  }

  if (!user) return null;
  //   if (!userDetails) return null;

  return (
    <div
      className={
        props.isActive === 'account'
          ? ' panel active-info'
          : 'panel info-hidden '
      }
    >
      <section className='user-info-account'>
        <button
          className='edit-icon go-back-btn'
          onClick={() => {
            props.setIsActive('home');
            setApiMessage('');
          }}
        >
          Go Back
        </button>
        <div className='details-span'>
          Email: <span>{user.email}</span>
        </div>
        <div className='details-span'>
          Username:{' '}
          <span>
            {user.username}
            <button
              className='edit-icon'
              onClick={() => setNewUsernameVisible(!newUsernameVisible)}
            >
              <IonIcon name='pencil-outline' />
            </button>
          </span>
        </div>
        {newUsernameVisible ? (
          <form
            className='edit-form'
            onSubmit={(e) => {
              submitUsernameHandler(e);
              setUser({ ...user, username: newUsername });
              console.log(user);
              setNewUsernameVisible(false);
            }}
          >
            <label htmlFor='username'>New Username</label>
            <input
              className='user-edit-input'
              type='text'
              name='username'
              value={newUsername}
              minLength={6}
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <label htmlFor='username1'>Confirm</label>
            <input
              className='user-edit-input'
              type='text'
              name='username1'
              minLength={6}
              value={newUsername1}
              onChange={(e) => setNewUsername1(e.target.value)}
            />
            <button className='form-btn save-btn' type='submit'>
              Save
            </button>
          </form>
        ) : (
          ''
        )}
        <div className='details-span'>
          Password:{' '}
          <span>
            *******{' '}
            <button
              className='edit-icon'
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              <IonIcon name='pencil-outline' />
            </button>
          </span>
        </div>
        {passwordVisible ? (
          <form
            className='edit-form'
            onSubmit={(e) => {
              submitPasswordHandler(e);
              setPasswordVisible(false);
            }}
          >
            <label htmlFor='password'>Current Password</label>
            <input
              className='user-edit-input'
              type='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor='newPassword'>New Password</label>
            <input
              className='user-edit-input'
              type='password'
              name='newPassword'
              value={newPassword}
              minLength={6}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label htmlFor='newPassword1'>Confirm</label>
            <input
              type='password'
              name='newPassword1'
              value={newPassword1}
              minLength={6}
              onChange={(e) => setNewPassword1(e.target.value)}
            />{' '}
            <button className='form-btn save-btn' type='submit'>
              Save
            </button>
          </form>
        ) : (
          ''
        )}
        <div className='api-msg'>{apiMessage}</div>
      </section>
    </div>
  );
};

export default AccountInfo;
