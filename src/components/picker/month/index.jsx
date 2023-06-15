import React, { useState } from "react";
import "date-fns";
import styled from "styled-components";
import TextField, {TextFieldProps} from '@material-ui/core/TextField'
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Typography from '@mui/material/Typography';
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

const moment = require('moment');

const MonthPickerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* background-color: red; */
`;

const MonthPickerStart = styled.div`
  display: flex;
  width: 225px;
  /* margin-top: 10px; */
  align-items: center;
`;

const MonthPickerEnd = styled.div`
  display: flex;
  width: 225px;
  
  margin-left: 10px;
  align-items: center;
`;

const MonthsPicker = ({ monthRange, handleOnChange }) => {
  const [value, setValue] = useState(monthRange);

  let startDate = moment(new Date()).subtract(12,'months')
  let endDate = moment(new Date()).subtract(1,'months')
  let startDateDefault = new Date(startDate.year(), startDate.month(), 1);
  let endDateDefault = new Date(endDate.year(), endDate.month() + 1, 0);

  const onChangeStart = (newValue) => {
    if (newValue && newValue !== undefined && newValue !== 'undefined') {
      value[0] = newValue
      setValue(value);
      handleOnChange(value);
    }
  }

  const onChangeEnd = (newValue) => {
    if (newValue && newValue !== undefined && newValue !== 'undefined') {
      value[1] = newValue
      setValue(value);
      handleOnChange(value);
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MonthPickerContainer>
        <MonthPickerStart>
          <DatePicker
            variant="inline"
            openTo="month"
            views={["year", "month"]}
            label="Start Month"
            minDate={new Date('2021-01-01')}
            maxDate={endDateDefault}
            helperText="Start from year selection"
            value={value[0]}
            onChange={onChangeStart}
            renderInput={(params) => {
              return <TextField 
                {...params} 
                variant="outlined"
                size="small" 
              />;
            }}
          />
        </MonthPickerStart>
        <MonthPickerEnd>
          <DatePicker
            variant="inline"
            openTo="month"
            minDate={new Date('2021-01-01')}
            maxDate={endDateDefault}
            views={["year", "month"]}
            label="End Month"
            helperText="Start from year selection"
            value={value[1]}
            onChange={onChangeEnd}
            renderInput={(params) => {
              return <TextField {...params}
              variant="outlined"
              size="small"/>;
            }}
          />
        </MonthPickerEnd>
      </MonthPickerContainer>
    </LocalizationProvider>
  );
};

export default MonthsPicker;
