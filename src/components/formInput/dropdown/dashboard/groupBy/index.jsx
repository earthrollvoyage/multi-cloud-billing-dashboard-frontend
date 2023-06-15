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

const SelectContainer = styled(Select)`
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 5px;
  justify-content: flex-start;
`;

const MenuItemComponent = styled(MenuItem)`
  display: flex;
  width: 100%;
  height: 30px;
  justify-content: center;
`;

const SelectDisplayWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
`;

const SelectDisplay = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  color: rgb(52, 52, 52);
`;

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     width: "100px",
//   },
// }));

const DropDownContainer = styled.div``;

const GroupByDropdown = ({ cloudBrand, groupBy, handleOnChange }) => {

  const [value, setValue] = useState(groupBy);

  const onChange = (event) => {
    event.preventDefault();
    setValue(event.target.value);
    handleOnChange(event.target.value);
  };

  return (
    <DropDownContainer>
      <FormControl
        style={{
          width: "150px",
          height: "40px",
          marginLeft: 5,
        }}
        variant="outlined"
        size="small"
      >
        <SelectContainer
          SelectDisplayProps={{ style: { display: "flex", paddingTop: 3, paddingBottom: 3, justifyContent: "center" } }}
          style={{
            height: "30px",
            width: "150px"
          }}
          labelId="select-chart-label"
          id="select-chart"
          value={value}
          onChange={onChange}
        >
          <MenuItemComponent value={cloudBrand === "aws" ? "linked_account" : cloudBrand === "gcp" ? "project_cost" : "service_family"}>

            <SelectDisplayWrap>
              <SelectDisplay>{cloudBrand === "aws" ? "Linked Account" : cloudBrand === "gcp" ? "Project ID" : "Project Name"}</SelectDisplay>
            </SelectDisplayWrap>
          </MenuItemComponent>
          <MenuItemComponent value={cloudBrand === "aws" ? "service" : cloudBrand === "gcp" ? "service_cost" : "service_name"}>
            <SelectDisplayWrap>
            <SelectDisplay>{cloudBrand === "aws" ? "Service Name" : cloudBrand === "gcp" ? "Service Name" : "Service Name"}</SelectDisplay>
            </SelectDisplayWrap>
          </MenuItemComponent>
        </SelectContainer>
      </FormControl>
    </DropDownContainer>
  );
};

export default GroupByDropdown;
