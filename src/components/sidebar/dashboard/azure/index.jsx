import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Close, CloseOutlined } from "@material-ui/icons";
import { sidebarData } from "../../sidebarData";
import styled from "styled-components";
import Submenu from "../../submenu";
import Playground from "../../../formInput/aotocomplete/playground/dashboard/azure";
import { DateRangePicker } from 'rsuite';
import CalendarsDateRangePicker from "../../../picker/daily";
import RadioButtonsGroupBy from "../../../formInput/radioButtons/dashboard/azure/groupBy";
import RadioButtonsGranularity from "../../../formInput/radioButtons/dashboard/azure/granularity";
import { AzureFilterDataContext } from "../../../../data/dashboardFilter/azure/filterDataContext";
// import 'rsuite/dist/styles/rsuite-default.css';

const SidebarContainer = styled.div`
  display: flex;
`;

const CloseOutlinedIcon = styled(CloseOutlined)`
  margin-right: 5px;
  font-size: 20px !important;
  color: red;
`;

const SidebarIcon = styled(Link)`
  margin-right: 0.5em;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background-color: white;
  width: 270px;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  position: fixed;
  top: 94px;
  right: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
  background-color: #fff;
  border-left: 3px solid rgb(252, 252, 252);
  /* background-color: rgb(52, 52, 52); */
  /* background-color: rgb(252, 252, 252); */
  /* border-left: 2px solid rgb(236, 140, 52); */
`;

const SidebarTitleWrap = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  font-size: 18px;
  font-weight: bold;
  color: rgb(52, 52, 52);
  padding: 5px 0px;
  margin-bottom: 10px;
  margin-left: 20px;
  margin-right: 20px;
  border-bottom: 1px solid rgb(236, 140, 52);
`;

const SidebarFilterInputWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const SidebarBottomContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 50px;
  /* justify-content: space-between; */
  /* margin-left: 20px;
  margin-right: 20px; */
  align-items: center;
  justify-content: center;
`;

// const SidebarBottomWrap = styled.div`
//   /* height: 30px;
//   display: flex;
//   align-items: center;
//   justify-content: center; */
//   /* margin-left: 70px;
//   margin-right: 70px; */
//   background-color: rgb(236, 140, 52);
// `;

const SidebarApplyButtonWrap = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: bold;
  border-radius: 3px;
  padding: 6px;
  color: #fff;
  background-color: rgba(236, 140, 52, 0.7);
  border: 1px solid rgba(236, 140, 52, 0.7);
  height: 30px;
  width: 120px;
  transition: 350ms;
  margin-right: 20px;

  &:hover {
    cursor: pointer;
    color: rgb(236, 140, 52);
    background-color: rgb(52, 52, 52);
  }
`;

const SidebarCancelButtonWrap = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: bold;
  border-radius: 3px;
  padding: 6px;
  color: #fff;
  background-color:rgb(134, 134, 134);
  border: 1px solid rgb(134, 134, 134);
  height: 30px;
  width: 120px;
  transition: 350ms;
  margin-right: 10px;
  margin-left: 20px;

  &:hover {
    cursor: pointer;
    color: rgb(236, 140, 52);
    background-color: rgb(52, 52, 52);
  }
`;

const CloseIcon = styled(Close)`
  font-size: 16px !important;
  color: #fff;
  background-color: rgb(236, 140, 52);

  &:hover {
    cursor: pointer;
    color: rgb(236, 140, 52);
    background-color: rgb(52, 52, 52);
  }
`;

const Sidebar = ({ sidebarActive, showSidebar }) => {
  const { azureFilterDataSet, handleChangeAzureFilter } = useContext(AzureFilterDataContext);
  const [ dateRange, setDateRange ] = useState([azureFilterDataSet.dateRange.startDate, azureFilterDataSet.dateRange.endDate]);
  const [ granularity, setGranularity ] = useState(azureFilterDataSet.granularity);
  const [ groupBy, setGroupBy ] = useState(azureFilterDataSet.groupBy);
  const [ listSelectBy, setListSelectBy ] = useState(azureFilterDataSet.listSelectBy);

  const handleOnChangeDate = (value) => {
    setDateRange({startDate: value[0], endDate: value[1]});
  }

  const handleOnChangeGranularity = (value) => {
    setGranularity(value);
  }

  const handleOnChangeGroupBy = (value) => {
    setGroupBy(value);
  }

  const handleOnChangeSelectBy = (value) => {
    setListSelectBy(value);
  }

  const handleOnClick = () => {
    let startDate = Array.isArray(dateRange) ? dateRange[0] : dateRange.startDate;
    let endDate = Array.isArray(dateRange) ? dateRange[1] : dateRange.endDate;

    const dataFilter = {
      dateRange: { startDate: startDate, endDate: endDate },
      granularity: granularity,
      groupBy: groupBy,
      listSelectBy: listSelectBy
    }

    handleChangeAzureFilter(dataFilter);
  }

  return (
    <SidebarContainer>
      <SidebarNav sidebar={sidebarActive}>
        <SidebarTitleWrap>FILTERS</SidebarTitleWrap>
        <SidebarFilterInputWrap>
          <CalendarsDateRangePicker dateRange={dateRange} handleOnChange={handleOnChangeDate}/>
          <RadioButtonsGranularity granularity={granularity} handleOnChange={handleOnChangeGranularity}/>
          <RadioButtonsGroupBy groupBy={groupBy} handleOnChange={handleOnChangeGroupBy}/>
          <Playground listSelectBy={listSelectBy} handleOnChange={handleOnChangeSelectBy}/>
          
          {/* {sidebarData.map((item, index) => {
            return <Submenu key={index} item={item} />;
          })} */}

        </SidebarFilterInputWrap>
        <SidebarBottomContainer>
          <SidebarCancelButtonWrap onClick={showSidebar} >
            Cancel
          </SidebarCancelButtonWrap>
          <SidebarApplyButtonWrap onClick={handleOnClick} >
            Apply filters
          </SidebarApplyButtonWrap>
        </SidebarBottomContainer>
      </SidebarNav>
    </SidebarContainer>
  );
};

export default Sidebar;
