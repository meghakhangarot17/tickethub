import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import { Wrapper } from './wrapper';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password
    },
    onSuccess: () => Router.push('/')
  });

  // const [errors, setErrors] = useState([]);

  const onSubmit = async event => {
    event.preventDefault();

    
    await doRequest();
    
      // try{
  //     const response = await axios.post('/api/users/signup', {
  //       email, password
  //     })

  //     console.log(response.data);
  // }
  // catch(err){
  //   // console.log(err.response.data);
  //   console.log(err.response.data.errors);
  // }
    // console.log(email, password);
  // };
    
  };

  return (
    <Wrapper title="Sign Up">
  <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>Email Address</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
      </div>
      {errors}
      <button className="mt-2 btn btn-primary">Sign Up</button>
    </form>
  </Wrapper>
  );
};
