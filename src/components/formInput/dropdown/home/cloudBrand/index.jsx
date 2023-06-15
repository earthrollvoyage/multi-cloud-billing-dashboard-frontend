import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "styled-components";
import { makeStyles } from "@mui/styles";
import {
  BarChart,
  Timeline,
  StackedBarChart,
  DonutLarge,
  FilterList,
} from "@material-ui/icons";

const BarChartIcon = styled(BarChart)`
  display: flex;
  align-items: center;
  margin-right: 5px;
  font-size: 16px !important;
  color: rgb(52, 52, 52);
`;

const TimelineIcon = styled(Timeline)`
  display: flex;
  align-items: center;
  margin-right: 5px;
  font-size: 18px !important;
  color: rgb(52, 52, 52);
`;

const SelectDisplayWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SelectDisplay = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: bold;
  color: rgb(52, 52, 52);
`;

const DropDownContainer = styled.div``;

const CloudBrandDropdown = ({ cloudBrand, handleOnChange }) => {

  const onChange = (event) => {
    event.preventDefault();
    handleOnChange(event.target.value);
  };

  return (
    <DropDownContainer>
      <FormControl
        style={{
          width: "90px",
          border: "2px solid rgb(244,244,244)",
          marginLeft: 5,
        }}
        variant="outlined"
        size="small"
      >
        <Select
          SelectDisplayProps={{ style: { display: "flex", paddingTop: 3, paddingBottom: 3, justifyContent: "center" } }}
          style={{
            height: "30px",
          }}
          labelId="select-chart-label"
          id="select-chart"
          value={cloudBrand}
          onChange={onChange}
        >
          <MenuItem value="all">
            <SelectDisplayWrap>
              <SelectDisplay>All</SelectDisplay>
            </SelectDisplayWrap>
          </MenuItem>
          <MenuItem value="aws">
            <SelectDisplayWrap>
              <SelectDisplay>AWS</SelectDisplay>
            </SelectDisplayWrap>
          </MenuItem>
          <MenuItem value="gcp">
            <SelectDisplayWrap>
              <SelectDisplay>GCP</SelectDisplay>
            </SelectDisplayWrap>
          </MenuItem>
          <MenuItem value="azure">
            <SelectDisplayWrap>
              <SelectDisplay>Azure</SelectDisplay>
            </SelectDisplayWrap>
          </MenuItem>
        </Select>
      </FormControl>
    </DropDownContainer>
  );
};

export default CloudBrandDropdown;
