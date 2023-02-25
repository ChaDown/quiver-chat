import { useState } from 'react';

const LogIn = () => {
  const [apiRes, setApiRes] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch('http://localhost:3000/api/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setApiRes(data.message);
        console.log(data);
      });
  };

  return (
    // <form method='post' action='http://localhost:3000/api/login'>
    <form className='user-form' onSubmit={onSubmit}>
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
      <div>{apiRes}</div>
    </form>
  );
};

export default LogIn;
