import { useContext, useState } from 'react';
import { UserContext } from './Contexts';

const LogIn = (props: {
  logInHandler(
    username: string,
    password: string,
    e?: React.FormEvent<HTMLFormElement>
  ): void;
  apiRes: string | null;
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form
      className='user-form'
      onSubmit={(e) => props.logInHandler(username, password, e)}
    >
      <label htmlFor='username'>*Username or Email</label>
      <input
        type='text'
        name='username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor='password'>*Password</label>
      <input
        type='password'
        name='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type='submit' className='form-btn'>
        Submit
      </button>
      <div>{props.apiRes}</div>
    </form>
  );
};

export default LogIn;
