import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { AuthenticationContext } from '../authentication';
import {
  BoxContainer,
  FormContainer,
  Input,
  SubmitButton,
  MutedLink,
  BoldLink,
} from '../accountBox/commonForm';
import { Marginer } from '../marginer';
import { AccountContext } from './accountContext';

const LoginForm = () => {
  const { switchToSignup } = useContext(AccountContext);
  const { currentUser } = useContext(AuthenticationContext);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = e.target.elements;
    try {
      console.log('username :', username.value, password.value);
      console.log('username :', username.value);
      await Auth.signIn(username.value, password.value);

    } catch (err) {
      alert('err :', err);
    }
  };

  // console.log('currentUser 1:', currentUser, typeof(currentUser));
  if(currentUser && currentUser !== 'The user is not authenticated') {
    // console.log('currentUser 2:', currentUser, typeof(currentUser), 'userConfirmed' in currentUser, !('userConfirmed' in currentUser));
    if (!('userConfirmed' in currentUser)) {
      return <Navigate to='/dashboard' />;
    }
  }

  return (
    <BoxContainer>
      <FormContainer onSubmit={ handleSubmit }>
        <Input type='text' name='username' placeholder='Username' />
        <Input type='password' name='password' placeholder='Password' />
        <Marginer direction='vertical' margin={10} />
        <MutedLink href='#'>Forgot your password?</MutedLink>
        <Marginer direction='vertical' margin='1.6em' />
        <SubmitButton type='submit'>Sign in</SubmitButton>
      </FormContainer>
      <Marginer direction='vertical' margin='1em' />
      <MutedLink href='#'>
        Don't have an account?
        <BoldLink href='#' onClick={switchToSignup}>
          Sign up
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
};

export default LoginForm;
