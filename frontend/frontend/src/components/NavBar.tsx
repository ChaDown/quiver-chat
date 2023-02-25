import Search from './Search';
import '../styles/navbar.css';
import IonIcon from '@reacticons/ionicons';
import { useLocation } from 'react-router-dom';

const NavBar = (props: { toggleUserVisible: () => void }) => {
  const location = useLocation();

  if (location.pathname === '/') return null;

  return (
    <nav>
      <Search isHomePage={false} />
      <IonIcon
        className='user-icon'
        name='person-circle-outline'
        size='large'
        onClick={props.toggleUserVisible}
      />
    </nav>
  );
};

export default NavBar;
