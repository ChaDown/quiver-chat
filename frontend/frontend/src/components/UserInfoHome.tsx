import { useContext, useState } from 'react';
import { UserContext, UserVisibleContext } from './Contexts';

const UserInfoHome = (props: {
  isActive: 'home' | 'account' | 'activity';
  setIsActive: (s: 'home' | 'account' | 'activity') => void;
}) => {
  const { user, setUser } = useContext(UserContext);
  const { userVisible, setUserVisible } = useContext(UserVisibleContext);
  const [errMsg, setErrMsg] = useState<null | string>(null);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/logout', {
        method: 'post',
        credentials: 'include',
      });
      if (response?.ok) {
        setUser(null);
        setUserVisible(false);
      } else {
        setErrMsg(
          `Server error - ${response.status}. Please refresh and try again.`
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={
        props.isActive === 'home' ? 'panel active-info ' : ' panel info-hidden'
      }
    >
      <section className='user-info-btns'>
        <h1>Hi {user ? user.username : ''}</h1>
        <button
          className='user-info-btn'
          onClick={() => props.setIsActive('account')}
        >
          Account Info
        </button>

        <button
          className='user-info-btn'
          onClick={() => props.setIsActive('activity')}
        >
          Activity
        </button>
        <button className='user-info-btn' onClick={() => handleLogout()}>
          Log Out
        </button>
        <p>{errMsg}</p>
      </section>
    </div>
  );
};

export default UserInfoHome;
