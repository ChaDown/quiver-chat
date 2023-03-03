import { UserContext, UserVisibleContext } from './Contexts';
import { useContext, useState } from 'react';
import AccountInfo from './AccountInfo';
import UserInfoHome from './UserInfoHome';
import { IsActive } from './interfaces';
import UserRecentActivity from './UserRecentActivity';

const UserInfo = () => {
  //   const { user, setUser } = useContext(UserContext);
  //   const { userVisible, setUserVisible } = useContext(UserVisibleContext);
  //   const [errMsg, setErrMsg] = useState<null | string>(null);
  //   const [accInfoVisible, setAccInfoVisible] = useState<boolean>(false);
  //   const [activityVisible, setActivityVisible] = useState<boolean>(false);
  //   const [userHomeVisible, setUserHomeVisible] = useState<boolean>(true);
  const [isActive, setIsActive] = useState<'home' | 'account' | 'activity'>(
    'home'
  );

  return (
    <section className='user-panel-container'>
      <UserInfoHome isActive={isActive} setIsActive={setIsActive} />
      <AccountInfo isActive={isActive} setIsActive={setIsActive} />
      <UserRecentActivity isActive={isActive} setIsActive={setIsActive} />
    </section>
  );
};

export default UserInfo;
