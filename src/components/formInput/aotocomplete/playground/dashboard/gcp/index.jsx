import React, { useState, useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { listGCPResourceData } from "../../../../../../services/billing/costAnalysis/gcp/listResourceData";

const moment = require('moment');

export default function Playground({ listSelectBy, handleOnChange }) {
  const [value, setValue] = useState({ project: [], service: [] });

  useEffect(() => {
    let startDate = moment(new Date()).subtract(12,'months')
    let endDate = moment(new Date()).subtract(1,'months')
    let startDateDefault = new Date(startDate.year(), startDate.month(), 1);
    let endDateDefault = new Date(endDate.year(), endDate.month() + 1, 0);

    listGCPResourceData(startDateDefault, endDateDefault).then((res) => {
      setValue(res)
    });
  }, []);

  const defaultProject = {
    options: value.project,
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
        {...defaultProject}
        id="project-on-select"
        multiple
        onChange={onChange}
        renderInput={(params) => (
          <TextField {...params} label="Project" variant="standard" />
        )}
      />
      <Autocomplete
        {...defaultService}
        style={{ marginTop: "1px" }}
        id="service-on-select"
        multiple
        onChange={onChange}
        renderInput={(params) => (
          <TextField {...params} label="Service" variant="standard" />
        )}
      />
    </Stack>
  );
}
