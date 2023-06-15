import React, { useState, useEffect, useContext } from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import styled from "styled-components";

const RankingButtonContainer = styled.div`
    display: flex;
    width: 100%;
    border: 1px solid rgb(220,220,224);
    border-radius: 2px;
    /* padding: 2px 5px; */
`;

const RankingButton = styled(Button)`
    display: flex;
    width: 100%;
    font-family: "Inter" !important;
    font-weight: bold !important;
    font-size: 12px !important;
    color: rgb(52, 52, 52) !important;
    background-color: ${({ groupby }) => groupby === "true" ? "#dadada !important" : "unset"};
    text-transform: none !important;
    
`;

export default function RankingButtonComponent({ title, page, groupby, handleOnChange }) {

    const onClick = (event) => {
        if (page === "/aws/billing/costAnalysis") {

            handleOnChange(title === 'Account' ? {'linked_account': "true", 'service': "false"} : {'linked_account': "false", 'service': "true"})

        } else if (page === "/gcp/billing/costAnalysis") {

            handleOnChange(title === 'Project' ? {'project': "true", 'service': "false"} : {'project': "false", 'service': "true"})

        } else if (page === "/azure/billing/costAnalysis") {

            handleOnChange(title === 'Project' ? {'service_family': "true", 'service_name': "false"} : {'service_family': "false", 'service_name': "true"})

        } else {
            
            handleOnChange(title === 'Account' ? {'linked_account': "true", 'service': "false"} : {'linked_account': "false", 'service': "true"})
        }
    }

    return (
        <RankingButtonContainer>
            <RankingButton onClick={onClick} groupby={groupby}>{ title }</RankingButton>
        </RankingButtonContainer>
    );
}