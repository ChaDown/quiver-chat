import Search from './Search';
import '../styles/navbar.css';
import IonIcon from '@reacticons/ionicons';
import { useLocation } from 'react-router-dom';
import { UserInterface } from './interfaces';
import { useContext } from 'react';
import { UserContext, UserVisibleContext } from './Contexts';

// props: {
//   toggleUserVisible: () => void;
//   user: UserInterface;
// }

const NavBar = () => {
  const location = useLocation();
  const { user, setUser } = useContext(UserContext);
  const { userVisible, setUserVisible } = useContext(UserVisibleContext);

  if (location.pathname === '/') return null;

  return (
    <nav>
      <Search isHomePage={false} />
      {user ? (
        <button
          className='user-icon user-icon-button'
          onClick={() => setUserVisible(!userVisible)}
        >
          {user.username ? user.username[0].toUpperCase() : ''}
        </button>
      ) : (
        <IonIcon
          className='user-icon'
          name='person-circle-outline'
          size='large'
          onClick={() => setUserVisible(!userVisible)}
        />
      )}
    </nav>
  );
};

export default NavBar;
