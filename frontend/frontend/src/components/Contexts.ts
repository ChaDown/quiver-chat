import { createContext } from 'react';
import { UserInterface } from './interfaces';

interface UserContextInterface {
  user: UserInterface | null;
  setUser(user: UserInterface | null): void;
}

export const UserContext = createContext<UserContextInterface>({
  user: null,
  setUser: (user: UserInterface) => {},
});
export const UserVisibleContext = createContext({
  userVisible: false,
  setUserVisible: (userVisible: boolean) => {},
});
