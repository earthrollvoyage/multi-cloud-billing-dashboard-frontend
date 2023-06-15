import React, { useState, useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { listAzureResourceData } from "../../../../../../services/billing/costAnalysis/azure/listResourceData";

const moment = require('moment');

export default function Playground({ listSelectBy, handleOnChange}) {

  const [value, setValue] = useState({ 'billing_profile': [], 'subscription': [], 'services_group': [], 'service_name': [] });

  useEffect(() => {
    let startDate = moment(new Date()).subtract(12,'months')
    let endDate = moment(new Date()).subtract(1,'months')
    let startDateDefault = new Date(startDate.year(), startDate.month(), 1);
    let endDateDefault = new Date(endDate.year(), endDate.month() + 1, 0);

    listAzureResourceData(startDateDefault, endDateDefault).then((res) => {
      setValue(res)
    });
  }, []);

  const defaultBillingProfile = {
    options: value.billing_profile,
    getOptionLabel: (option) => option.title || "",
  };

  const defaultSubscription = {
    options: value.subscription,
    getOptionLabel: (option) => option.title || "",
  };

  const defaultServiceGroup = {
    options: value.services_group,
    getOptionLabel: (option) => option.title || "",
  };

  const defaultServiceName = {
    options: value.service_name,
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
        {...defaultBillingProfile}
        id="billing-rofile-on-select"
        multiple
        onChange={onChange}
        renderInput={(params) => (
          <TextField {...params} label="Billing Profile" variant="standard" />
        )}
      />
      <Autocomplete
        {...defaultSubscription}
        style={{ marginTop: "1px" }}
        id="subscription-on-select"
        multiple
        onChange={onChange}
        renderInput={(params) => (
          <TextField {...params} label="Subscription" variant="standard" />
        )}
      />
      <Autocomplete
        {...defaultServiceGroup}
        id="service-group-on-select"
        multiple
        onChange={onChange}
        renderInput={(params) => (
          <TextField {...params} label="Service Group" variant="standard" />
        )}
      />
      <Autocomplete
        {...defaultServiceName}
        style={{ marginTop: "1px" }}
        id="service-name-on-select"
        multiple
        onChange={onChange}
        renderInput={(params) => (
          <TextField {...params} label="Service Name" variant="standard" />
        )}
      />
    </Stack>
  );
}
