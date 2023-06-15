import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import BrandLogo from '../brandLogo';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'

const FooterContainer = styled.div`
    width: 100%;
    min-height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2em 3em;
    padding-bottom: 0;
    border-top: 0.6px solid rgba(0, 0, 0, 0.2) ;
`;

const TopContainer = styled.div`
    width: 100%;
    display: flex;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &:not(:last-of-type) {
        margin-right: 3%;
    }
`;

const BottomContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    border-top: 0.6px solid rgba(0, 0, 0, 0.2) ;
    padding: 0 10px;
`;

const RightBottomContainer = styled.div`
    display: flex;
`;

const LeftBottomContainer = styled.div`
    display: flex;
`;

const Title = styled.h2`
    margin: 0;
    margin-bottom: 13px;
    color: rgb(73,140,200);
    font-weight: 600;
    font-size: 20px;
`;

const Link = styled.div`
    /* margin-top: 11px; */
    text-decoration: none;
    color: #5e5d5d;
    font-weight: 500;
    font-size: 15px;
    cursor: pointer;

    &:not(:last-of-type) {
        margin-bottom: 8px;
    }
`;

const PrivacyText = styled.h6`
    color: #828282;
    font-size: 11px;
    margin: auto;
    margin-left: 10px ;
    margin-top: 8px;
    display: flex;
    align-items: center;
`;

const FooterIconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #8A8A8A;
    font-size: 20px;
    cursor: pointer;
    transition: background-color, 200ms ease-in-out;

    &:not(:last-of-type) {
        margin-right: 5px;
    }

    &:hover {
        color: #777777;
    }
`;

const IconLogo = styled.div`
    padding: 0 7px;
    align-items: center;
`;

const IconText = styled.h6`
    color: #8A8A8A;
    margin-top: 24px;
    font-size: 13px;
`;

const Footer = () => {
  return (
    <FooterContainer>
        <TopContainer>
            <ContentContainer>
                <Title>Categories</Title>
                <Link to='/'>Logs Data Analytics</Link>
                <Link to='/'>Logs Reporter</Link> 
                <Link to='/'>Smarter Create Logs</Link>
                <Link to='/'>Logs Management</Link>
            </ContentContainer>
            <ContentContainer>
                <Title>Access</Title>
                <Link to='/'>Sign In</Link>
                <Link to='/'>Join us</Link>
                <Link to='/'>Sign In as Specialist</Link>
            </ContentContainer>
        </TopContainer>
        <BottomContainer>
            <LeftBottomContainer>
                <BrandLogo color='#8A8A8A' hideLogo={ false } textSize={ 25 }/>
                <PrivacyText>&#169; All Rights Reserved. 2021</PrivacyText>
            </LeftBottomContainer>
            <RightBottomContainer>
                <FooterIconContainer>
                    <IconLogo>
                        <FontAwesomeIcon icon={ faEnvelope } />
                    </IconLogo>
                    <IconText>sarapong@mfec.co.th</IconText>
                </FooterIconContainer>
            </RightBottomContainer>
        </BottomContainer>
    </FooterContainer>
  );
};

export default Footer;
