import React from "react";
import styled from "styled-components";

const ButtonWrapper = styled.button`
    border: none;
    outline: none;
    color: #fff;
    padding: 6px 1em;
    font-size: ${({ size }) => size ? size + "px" : "18px"};
    font-weight: 600;
    border-radius: 3px;
    background-color: rgb(73,140,200);
    cursor: pointer;
    transition: all 200ms ease-in-out;

    &:hover {
        background-color: #2974b6;
    }

    &:focus {
        outline: none;
    }
`;

const Button = ({ children, size, className }) => {
    return <ButtonWrapper size={ size } className={ className }>{ children }</ButtonWrapper>
}

export default Button; 