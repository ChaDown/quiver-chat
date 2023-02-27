import { UserContext, UserVisibleContext } from './Contexts';
import { useContext } from 'react';

const UserInfo = () => {
  const { user, setUser } = useContext(UserContext);
  const { userVisible, setUserVisible } = useContext(UserVisibleContext);
  return (
    <section className='user-info-btns'>
      <h1>Hi {user ? user.username : ''}</h1>
      <button>Account Info</button>
      <button>Recent Activity</button>
      <button>Log Out</button>
    </section>
  );
};

export default UserInfo;
