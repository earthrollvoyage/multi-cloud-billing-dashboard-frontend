import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BrandLogo from '../brandLogo';
import Button from '../button';
import { Marginer } from '../marginer'


const NavbarContainer = styled.div`
    width: 100%;
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5em;
    position: sticky;
    top: 0;
    /* background-color: ${({ useTransparent }) => useTransparent ? '#fff' : 'rgba(137, 196, 244, 0.7)' }; */
    background: ${({ useTransparent }) => useTransparent ? '#fff' : 'rgb(205, 235, 255)'};
    /* background:  ${({ useTransparent }) => useTransparent ? `linear-gradient(
        90deg,
        rgba(255, 255, 255, 1) 20%,
        rgba(255, 255, 255, 1) 100%
    )`: `linear-gradient(
        90deg,
        rgba(205, 235, 255, 1) 20%,
        rgba(120, 201, 255, 1) 100%
    )`}; */
`;

const AccessibiliyContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
`;

const AnchorLink = styled(Link)`
    font-size: 12px;
    /* color: rgb(39,107,166); */
    color: rgb(73,140,200);
    cursor: pointer;
    outline: none;
    text-decoration: none;
    transition: all 200ms ease-in-out;

    &:hover {
        filter: contrast(0.6);
    }
`;

const Seperator = styled.div`
    height: 35%;
    width: 1px;
    background-color: rgb(73,140,200);
`

const Navbar = ({ useTransparent=true }) => {
    return (
        <NavbarContainer useTransparent={ useTransparent }>
            <BrandLogo  logoSize={ 60 }/>
            <AccessibiliyContainer>
                <AnchorLink to='/'>Specialists Portal</AnchorLink>
                <Marginer direction='horizontal' margin={ 10 }></Marginer>
                <Seperator />
                <Marginer direction='horizontal' margin={ 10 }></Marginer>
                <Link to='/user/access/signup'>
                    <Button size={ 11 }>Register</Button>
                </Link>
                <Marginer direction='horizontal' margin={ 8 }></Marginer>
                <AnchorLink to='/user/access/signin'>Sign in</AnchorLink>
            </AccessibiliyContainer>
        </NavbarContainer>
    )
}

export default Navbar;