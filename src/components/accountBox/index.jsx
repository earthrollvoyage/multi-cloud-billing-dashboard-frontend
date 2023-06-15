import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import LoginForm from './loginForm';
import { motion } from 'framer-motion';
import { AccountContext } from './accountContext';
import SignupForm from './signupForm';
import ConfirmSignupForm from './confirmSignupForm';
import { AuthenticationContext } from '../authentication';

const BoxContainer = styled.div`
  width: 280px;
  min-height: 550px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 5em;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const HeaderText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  margin: 0;
`;

const SmallText = styled.div`
    color: #fff;
    font-size: 13px;
    font-weight: 500;
    z-index: 10;
    margin: 0;
    margin-top: 7px;
`;

const BackDrop = styled(motion.div)`
  width: 160%;
  min-height: 550px;
  position: absolute;
  transform: rotate(60deg);
  top: -290px;
  left: -70px;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  background: rgb(39,107,166);
  background: linear-gradient(
    90deg, 
    rgba(39,107,166,1) 20%, 
    rgba(179,233,255,1) 100%
  );
`;

const InnerContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.8em;
`;

const backDropVariants = {
  expended: {
    width: '233%',
    height: '1050px',
    borderRadius: '20%',
    transform: 'rotate(60deg)'
  },
  collapsed: {
    width: '160%',
    height: '550px',
    borderRadius: '50%',
    transform: 'rotate(60deg)'
  }
};

const expendingTransition = {
  type: 'spring',
  duration: '2.3',
  stiffness: '30'
};

const AccoutBox = ({ initialActive }) => {
  // console.log('initialActive :', initialActive)
  const { currentUser, onResetUserDataWithOutSignin } = useContext(AuthenticationContext);
  const [isExpaned, setExpaned] = useState(false);
  const [active, setActive] = useState(initialActive);

  useEffect(() => {
    setActive(initialActive ? initialActive : 'home');
    // console.log("currentUser check eff:", currentUser);
    if (currentUser && initialActive !== 'confirm-signup'){
      onResetUserDataWithOutSignin(currentUser);
    }
  }, [initialActive])


  const playExpandingAnimation = () => {
    setExpaned(true);
    setTimeout(() => {
      setExpaned(false);
    }, expendingTransition.duration * 1000 - 1500);
  };

  const switchToHome = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive('home')
    }, 400);
  };

  const switchToSignup = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive('signup')
    }, 400);
    return <Navigate to='/user/access/signin' />
  };

  const switchToSignin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive('signin')
    }, 400);
    return <Navigate to='/user/access/signup' />
  };

  const switchToConfirmSignup = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive('confirm-signup')
    }, 400);
  };
  
  const contextValue = { switchToHome, switchToSignup, switchToSignin, switchToConfirmSignup };

  return (
    <AccountContext.Provider value={ contextValue }>
      {
        active === 'home' ? (<Navigate to='/home' />) : (
          <BoxContainer>
            <TopContainer>
              <BackDrop 
                initial={ false } 
                animate={ isExpaned ? 'expended' : 'collapsed' } 
                variants={ backDropVariants }
                transition={ expendingTransition } />
              { active === 'signin' && <HeaderContainer>
                <HeaderText>Welcome</HeaderText>
                <HeaderText>Back</HeaderText>
                <SmallText>Please sign-in to continue!</SmallText>
              </HeaderContainer> }
              { active === 'signup' && <HeaderContainer>
                <HeaderText>Create</HeaderText>
                <HeaderText>Account</HeaderText>
                <SmallText>Please sign-up to continue!</SmallText>
              </HeaderContainer> }
              { active === 'confirm-signup' && <HeaderContainer>
                <HeaderText>Confirm</HeaderText>
                <HeaderText>Account</HeaderText>
                <SmallText>Please input your're authorization code.</SmallText>
              </HeaderContainer> }
            </TopContainer>
            <InnerContentContainer>
              { active === 'signin' && <LoginForm /> }
              { active === 'signup' && <SignupForm /> }
              { active === 'confirm-signup' && <ConfirmSignupForm /> }
            </InnerContentContainer>
          </BoxContainer>
        )
      }
    </AccountContext.Provider>
  );
};

export default AccoutBox;
