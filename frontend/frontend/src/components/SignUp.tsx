import { useState, useContext } from 'react';
import { UserContext } from './Contexts';

const SignUp = (props: {
  logInHandler(
    username: string,
    password: string,
    e?: React.FormEvent<HTMLFormElement>
  ): void;
  apiRes: string | null;
}) => {
  const [apiRes, setApiRes] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  // const { user, setUser } = useContext(UserContext);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check passwords match
    if (password !== password1) {
      setApiRes("Passwords aren't matching, try again.");
      return;
    }
    fetch('https://quiver-chat-api.onrender.com/api/signup', {
      method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        username,
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setApiRes(data.message);
        if (data.user) props.logInHandler(username, password);
      });
  };

  return (
    // <form method='post' action='https://quiver-chat-api.onrender.com/api/login'>
    <form className='user-form' onSubmit={onSubmit}>
      <label htmlFor='username'>*Username</label>
      <input
        type='text'
        name='username'
        value={username}
        minLength={6}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor='username'>*Email</label>
      <input
        type='email'
        name='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor='password'>*Password</label>
      <input
        type='password'
        name='password'
        minLength={6}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label htmlFor='password'>*Retype Password</label>
      <input
        type='password'
        minLength={6}
        name='password'
        value={password1}
        onChange={(e) => setPassword1(e.target.value)}
      />
      <button type='submit' className='form-btn'>
        Submit
      </button>
      <div>{props.apiRes}</div>
    </form>
  );
};

export default SignUp;
