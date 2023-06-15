import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { AuthenticationContext } from '../authentication';
import {
  BoxContainer,
  FormContainer,
  Input,
  SubmitButton,
} from '../accountBox/commonForm';
import { Marginer } from '../marginer';
import { AccountContext } from './accountContext';

const ConfirmSignupForm = () => {
  const { switchToSignin } = useContext(AccountContext);
  const { currentUser, onSubmitAuthCode, onResetUserDataWithOutSignin } = useContext(AuthenticationContext);
  const [errMessage, SetErrMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { authCode } = e.target.elements;
    try {
      console.log(
        'currentUser 0:',
        currentUser,
        typeof currentUser,
        currentUser.user
      );
      const confirmSignup = await Auth.confirmSignUp(
        currentUser.user.username,
        authCode.value
      );

      // console.log('confirmSignup :', confirmSignup);
      if (confirmSignup && confirmSignup === 'SUCCESS') {
        onSubmitAuthCode(confirmSignup);
      }
    } catch (err) {

      if (err === 'The user is not authenticated') {
        console.log('err confirmSignup 1:', err);
        onSubmitAuthCode(err);

      } else if (err.message === 'Invalid verification code provided, please try again.') {
        SetErrMessage(err.message);
      } else {
        console.log('err confirmSignup 2:', currentUser, err);
      }
    }
  };

  // console.log('currentUser confirmSignup 1:', currentUser, typeof currentUser);
  if (currentUser && (currentUser.userConfirmed || currentUser === 'The user is not authenticated')) {
    // console.log('currentUser confirmSignup 2:', currentUser, typeof currentUser);
    switchToSignin();
    onResetUserDataWithOutSignin(currentUser);
    return <Navigate to='/user/access/signin' />;
  }

  return (
    <BoxContainer>
      <FormContainer onSubmit={handleSubmit}>
        <Input type='text' name='authCode' placeholder='Authorization Code' />
        <Marginer direction='vertical' margin='1.6em' />
        {
          errMessage && (
            <p>{ errMessage }</p>
          )
        }
        <SubmitButton type='submit'>Confirm</SubmitButton>
      </FormContainer>
    </BoxContainer>
  );
};

export default ConfirmSignupForm;
