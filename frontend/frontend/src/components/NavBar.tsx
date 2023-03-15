import Search from './Search';
import '../styles/navbar.css';
import IonIcon from '@reacticons/ionicons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext, UserVisibleContext } from './Contexts';
import Logo from '../imgs/icon-qc.png';

// props: {
//   toggleUserVisible: () => void;
//   user: UserInterface;
// }

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { userVisible, setUserVisible } = useContext(UserVisibleContext);

  if (location.pathname === '/') return null;

  return (
    <nav>
      <button onClick={() => navigate('/')} className='nav-logo-btn'>
        <img className='nav-logo' src={Logo} alt='Quiver Chat Logo' />
      </button>
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
