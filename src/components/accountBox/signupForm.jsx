import React, { useContext } from 'react';
import { BoxContainer, FormContainer, Input, SubmitButton, MutedLink, BoldLink } from './commonForm';
import { Marginer } from '../marginer';
import { AccountContext } from './accountContext';
import { Navigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { AuthenticationContext } from '../authentication';

const SignupForm = () => {
  const { switchToSignin, switchToConfirmSignup } = useContext(AccountContext);
  const { currentUser } = useContext(AuthenticationContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      username,
      password,
      email,
      given_name,
      family_name,
      phone_number,
    } = e.target.elements;

    try {
      
      await Auth.signUp({
        username: username.value,
        password: password.value,
        attributes: {
          preferred_username: username.value,
          email: email.value,
          given_name :given_name.value,
          family_name: family_name.value,
          phone_number: phone_number.value,
        },
      });

    } catch (err) {
      console.log('err :', err, err.name === 'UserNotConfirmedException');
      switch (err.name) {
        case 'UserNotConfirmedException' :
          console.log('err :', err);
          break;
        case 'UsernameExistsException' :
          console.log('err :', err);
          break;
        default:
          console.log('err :', err);
          break;
      }
    }
  }; 

  if (currentUser && !currentUser.userConfirmed) {
    switchToConfirmSignup();
    return <Navigate to='/user/access/confirm-signup' />;
  }

  return (
    <BoxContainer>
      <FormContainer onSubmit={ handleSubmit }>
        <Input type='text' name='given_name' placeholder='First Name' />
        <Input type='text' name='family_name' placeholder='Surname' />
        <Input type='text' name='username' placeholder='UserName' />
        <Input type='password' name='password' placeholder='Password' />
        <Input type='password' name='confirmPassword' placeholder='Confirm Password'   />
        <Input type='email' name='email' placeholder='Email' />
        <Input type='text' name='phone_number' placeholder='Phone Number' />
        <SubmitButton type='submit'>Sign up</SubmitButton>
      </FormContainer>
      {/* <Marginer direction='vertical' margin={30} /> */}
      
      <Marginer direction='vertical' margin='1em' />
      <MutedLink href='#'>
        Already have an account?
        <BoldLink href='#' onClick={ switchToSignin }>
          Sign in
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
};

export default SignupForm;
