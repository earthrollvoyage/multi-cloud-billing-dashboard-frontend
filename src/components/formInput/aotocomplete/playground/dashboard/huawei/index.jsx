import React, { useState, useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { listAWSResourceData } from "../../../../../../services/billing/costAnalysis/aws/listResourceData";

const moment = require('moment');

export default function Playground({ listSelectBy, handleOnChange}) {

  const [value, setValue] = useState({ 'linked_account': [], 'service': [] });

  useEffect(() => {
    let startDate = moment(new Date()).subtract(12,'months')
    let endDate = moment(new Date()).subtract(1,'months')
    let startDateDefault = new Date(startDate.year(), startDate.month(), 1);
    let endDateDefault = new Date(endDate.year(), endDate.month() + 1, 0);

    listAWSResourceData(startDateDefault, endDateDefault).then((res) => {
      setValue(res)
    });
  }, []);

  const defaultLinkedAccount = {
    options: value.linked_account,
    getOptionLabel: (option) => option.title || "",
  };

  const defaultService = {
    options: value.service,
    getOptionLabel: (option) => option.title || "",
  };

  const onChange = (event, value) => {
    handleOnChange(value)
  }

  return (
    <Stack spacing={1} sx={{ width: 225 }}>
      <Typography style={{ 
        fontSize: "15px", 
        fontFamily: "Inter", 
        marginTop: "10px", 
        // color: "rgb(236, 140, 52)",
        fontWeight: "bold" }}>Select by</Typography>
      <Autocomplete
        {...defaultLinkedAccount}
        id="linked-account-on-select"
        clearOnEscape
        onChange={onChange}
        renderInput={(params) => (
          <TextField {...params} label="Linked Account" variant="standard" />
        )}
      />
      <Autocomplete
        {...defaultService}
        style={{ marginTop: "1px" }}
        id="service-on-select"
        disableCloseOnSelect
        onChange={onChange}
        renderInput={(params) => (
          <TextField {...params} label="Service" variant="standard" />
        )}
      />
    </Stack>
  );
}
