import { useState } from 'react';

const SignUp = () => {
  const [apiRes, setApiRes] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check passwords match
    if (password !== password1) {
      setApiRes("Passwords aren't matching, try again.");
      return;
    }
    fetch('http://localhost:3000/api/signup', {
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
        console.log(data);
      });
  };

  return (
    // <form method='post' action='http://localhost:3000/api/login'>
    <form className='user-form' onSubmit={onSubmit}>
      <label htmlFor='username'>*Username</label>
      <input
        type='text'
        name='username'
        value={username}
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label htmlFor='password'>*Retype Password</label>
      <input
        type='password'
        name='password'
        value={password1}
        onChange={(e) => setPassword1(e.target.value)}
      />
      <button type='submit' className='form-btn'>
        Submit
      </button>
      <div>{apiRes}</div>
    </form>
  );
};

export default SignUp;
