import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import styled from 'styled-components';

const CircularIndeterminateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  width: 100%;
`;

export default function CircularIndeterminate() {
  return (
    <CircularIndeterminateContainer>
      <Box>
        <CircularProgress />
      </Box>
    </CircularIndeterminateContainer>
  );
}