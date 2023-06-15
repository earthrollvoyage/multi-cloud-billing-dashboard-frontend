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
import { ChartSelectContext } from "../../../../../data/chartSelectContext";

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

const ChartTypeDropdown = () => {
  const { toggleChart, handleChange } = useContext(ChartSelectContext);

  const onChange = (event) => {
    event.preventDefault();
    handleChange(event.target.value);
  };

  return (
    <DropDownContainer>
      <FormControl
        style={{
          width: toggleChart === "line" ? "100px" : "90px",
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
          value={toggleChart}
          onChange={onChange}
        >
          <MenuItem value="line">
            <SelectDisplayWrap>
              <TimelineIcon />
              <SelectDisplay>Line</SelectDisplay>
            </SelectDisplayWrap>
          </MenuItem>
          <MenuItem value="bar">
            <SelectDisplayWrap>
              <BarChartIcon />
              <SelectDisplay>Bar</SelectDisplay>
            </SelectDisplayWrap>
          </MenuItem>
        </Select>
      </FormControl>
    </DropDownContainer>
  );
};

export default ChartTypeDropdown;
