import React, { useState, useEffect, useContext } from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import styled from "styled-components";

const DownloadButtonContainer = styled.div`
    display: flex;
    border: 1px solid rgb(220,220,224);
    border-radius: 2px;
    /* width: 100%; */
`;

const DownloadButton = styled(Button)`
    display: flex;
    width: 100%;
    font-family: "Inter" !important;
    font-weight: bold !important;
    font-size: 13px !important;
    color: rgb(52, 52, 52) !important;
    padding: 2px 5px !important;
    text-transform: none !important;
    background-color: rgb(244,244,244) !important;

    &:hover {
      cursor: pointer;
      color: rgb(107,178,244) !important;
    }
`;

export default function DownloadButtonComponent({ Download }) {

  const onClick = (event) => {
    Download();
  }
  return (
    <DownloadButtonContainer>
        <DownloadButton onClick={onClick}>Download CSV</DownloadButton>
    </DownloadButtonContainer>
  );
}
