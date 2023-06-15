import { useState, useEffect} from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateRangePicker from '@mui/lab/DateRangePicker';
import styled from "styled-components";
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';

const DateRangePickerComponent = styled.div`
  width: 100%;
`;

export default function CalendarsDateRangePicker({ dateRange, handleOnChange }) {
  const [value, setValue] = useState(dateRange);

  const onChange = (value) => {
    setValue(value);
    handleOnChange(value);
  }

  return ( 
    <DateRangePickerComponent>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateRangePicker
            // outerHeight
            // calendars={1}
            value={value}
            onChange={onChange}
            renderInput={({ inputProps, ...startProps }, endProps) => {
              const startValue = inputProps.value;
              delete inputProps.value
              return (
                <input
                  // variant="filled"
                  size="small"
                  style={{ 
                    width: "300px", 
                    height: "30px", 
                    borderRadius: "5px",
                    fontSize: "15px",
                    paddingLeft: 10,
                    fontFamily: "Inter",
                    fontWeight: "bold", 
                    color: "rgb(52, 52, 52)" ,
                    border: "1px solid rgb(196,196,196)"}}
                  // {...startProps}
                  // inputProps={inputProps}
                  ref={inputProps.inputRef}
                  {...inputProps}
                  value={`${startValue}-${endProps.inputProps.value}`}
              />
              )
            }}
          />
      
      </LocalizationProvider>
    </DateRangePickerComponent>
  );
}