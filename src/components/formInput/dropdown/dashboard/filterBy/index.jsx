import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
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
import { listAWSResourceData } from "../../../../../services/billing/costAnalysis/aws/listResourceData";
import { listAzureResourceData } from "../../../../../services/billing/costAnalysis/azure/listResourceData";
import { listGCPResourceData } from "../../../../../services/billing/costAnalysis/gcp/listResourceData";

const moment = require('moment');

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
  font-size: 10px;
  font-weight: bold;
  color: rgb(52, 52, 52);
`;

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     width: "100px",
//   },
// }));

const DropDownContainer = styled.div``;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

export default function FilterByDropdown({ cloudBrand, listSelectBy, handleOnChange, groupBy }) {
  const [name, setName] = React.useState([]);
  // const [groupByData, setGroupByData] = React.useState(groupBy);
  const [filterValue, setFilterValue] = useState(
    cloudBrand === 'aws' ? { linked_account: [], service: [] } :
    cloudBrand === 'gcp' ? { project: [], service: [] } : 
    { billing_profile: [], subscription: [], services_group: [], service_name: [] }
  );

  useEffect(() => {

    let startDate = moment(new Date()).subtract(12,'months')
    let endDate = moment(new Date()).subtract(1,'months')
    let startDateDefault = new Date(startDate.year(), startDate.month(), 1);
    let endDateDefault = new Date(endDate.year(), endDate.month() + 1, 0);
    cloudBrand === 'aws' ? (
    listAWSResourceData(startDateDefault, endDateDefault).then((res) => {
      setFilterValue(res)
    })) : (cloudBrand === 'gcp' ? listGCPResourceData(startDateDefault, endDateDefault).then((res) => {
      setFilterValue(res)
    }) : (listAzureResourceData(startDateDefault, endDateDefault).then((res) => {
      setFilterValue(res)
    })))
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
    handleOnChange(event.target.value);
  };

  return (
    <div>
        <FormControl 
          style={{
            width: "200px",
            height: "40px",
            marginLeft: 5
          }}
          variant="outlined" 
          size="small">
        <InputLabel id="demo-multiple-checkbox-label" shrink={false} style={{
          display: "flex", 
          // paddingTop: 3, 
          // paddingBottom: 3, 
          justifyContent: "center",
          fontSize: "14px", 
          fontFamily: "Inter", 
          fontWeight: "bold", 
          color: "rgb(52, 52, 52)" 
        }}>
          {typeof name === 'object' &&  name.length === 0 ? "Include All" : ""}
        </InputLabel>
        <SelectContainer
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          SelectDisplayProps={{ style: { display: "flex", paddingTop: 3, paddingBottom: 3, justifyContent: "center" } }}
          multiple
          value={name}
          onChange={handleChange}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {
            cloudBrand === 'aws' ? (
               groupBy === 'linked_account' ? filterValue.linked_account.map((item, index) => (
                <MenuItemComponent style={{fontSize: "10px"}} key={item.title} value={item.title}>
                  <SelectDisplayWrap>
                    <SelectDisplay>
                      <Checkbox style={{fontSize: "10px !important", fontFamily: "Inter !important", fontWeight: "bold !important"}} checked={name.indexOf(item.title) > -1} />
                      <ListItemText style={{fontSize: "10px !important", fontFamily: "Inter !important", fontWeight: "bold !important"}} primary={item.title} />
                    </SelectDisplay>
                  </SelectDisplayWrap>
                </MenuItemComponent>
              )) : filterValue.service.map((item, index) => (
                <MenuItemComponent style={{fontSize: "10px"}} key={item.title} value={item.title}>
                  <SelectDisplayWrap>
                    <SelectDisplay>
                      <Checkbox style={{fontSize: "10px !important", fontFamily: "Inter !important", fontWeight: "bold !important"}} checked={name.indexOf(item.title) > -1} />
                      <ListItemText style={{fontSize: "10px !important", fontFamily: "Inter !important", fontWeight: "bold !important"}} primary={item.title} />
                    </SelectDisplay>
                  </SelectDisplayWrap>
                </MenuItemComponent>
            ))) : cloudBrand === 'gcp' ? (
              groupBy === 'project_cost' ? filterValue.project.map((item, index) => (
                <MenuItemComponent style={{fontSize: "10px"}} key={item.title} value={item.title}>
                  <SelectDisplayWrap>
                    <SelectDisplay>
                      <Checkbox style={{fontSize: "10px !important", fontFamily: "Inter !important", fontWeight: "bold !important"}} checked={name.indexOf(item.title) > -1} />
                      <ListItemText style={{fontSize: "10px !important", fontFamily: "Inter !important", fontWeight: "bold !important"}} primary={item.title} />
                    </SelectDisplay>
                  </SelectDisplayWrap>
                </MenuItemComponent>
              )) : filterValue.service.map((item, index) => (
                <MenuItemComponent style={{fontSize: "10px"}} key={item.title} value={item.title}>
                  <SelectDisplayWrap>
                    <SelectDisplay>
                      <Checkbox style={{fontSize: "10px !important", fontFamily: "Inter !important", fontWeight: "bold !important"}} checked={name.indexOf(item.title) > -1} />
                      <ListItemText style={{fontSize: "10px !important", fontFamily: "Inter !important", fontWeight: "bold !important"}} primary={item.title} />
                    </SelectDisplay>
                  </SelectDisplayWrap>
                </MenuItemComponent>
            ))) : (
              groupBy === 'service_family' ? filterValue.services_group.map((item, index) => (
                <MenuItemComponent style={{fontSize: "10px"}} key={item.title} value={item.title}>
                  <SelectDisplayWrap>
                    <SelectDisplay>
                      <Checkbox style={{fontSize: "10px !important", fontFamily: "Inter !important", fontWeight: "bold !important"}} checked={name.indexOf(item.title) > -1} />
                      <ListItemText style={{fontSize: "10px !important", fontFamily: "Inter !important", fontWeight: "bold !important"}} primary={item.title} />
                    </SelectDisplay>
                  </SelectDisplayWrap>
                </MenuItemComponent>
              )) : filterValue.service_name.map((item, index) => (
                <MenuItemComponent style={{fontSize: "10px"}} key={item.title} value={item.title}>
                  <SelectDisplayWrap>
                    <SelectDisplay>
                      <Checkbox style={{fontSize: "10px !important", fontFamily: "Inter !important", fontWeight: "bold !important"}} checked={name.indexOf(item.title) > -1} />
                      <ListItemText style={{fontSize: "10px !important", fontFamily: "Inter !important", fontWeight: "bold !important"}} primary={item.title} />
                    </SelectDisplay>
                  </SelectDisplayWrap>
                </MenuItemComponent>
            )))
          }
        </SelectContainer>
      </FormControl>
    </div>
  );
}

// export default FilterByDropdown;
