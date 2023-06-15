import React, { useState, useEffect, useContext } from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import styled from "styled-components";

const SubmitButtonContainer = styled.div`
    display: flex;
    border: ${({ backgroundColor}) => backgroundColor !== "unset" ? "1px solid rgb(220,220,224)" : backgroundColor };
    margin-left: ${({ backgroundColor}) => backgroundColor !== "unset" ? "10px" : backgroundColor };
    height: ${({ backgroundColor}) => backgroundColor !== "unset" ? "38px" : backgroundColor };
    border-radius: ${({ backgroundColor}) => backgroundColor !== "unset" ? "5px" : backgroundColor };
    /* width: 100%; */
`;

const SubmitButton = styled(Button)`
    display: flex;
    width: 100%;
    font-family: "Inter" !important;
    font-weight: bold !important;
    font-size: 13px !important;
    color: rgb(52, 52, 52) !important;
    text-transform: none !important;
    padding: 2px 15px !important;
    background-color: ${({ backgroundColor}) => backgroundColor } !important;

    &:hover {
      cursor: pointer;
      color: rgb(107,178,244) !important;
      background-color: rgb(244,244,244) !important;
    }
`;

export default function SubmitButtonComponent({ title, submit, backgroundColor }) {

  const onClick = (event) => {
    submit();
  }
  return (
    <SubmitButtonContainer backgroundColor={backgroundColor}>
        <SubmitButton backgroundColor={backgroundColor} onClick={onClick}>{title}</SubmitButton>
    </SubmitButtonContainer>
  );
}
