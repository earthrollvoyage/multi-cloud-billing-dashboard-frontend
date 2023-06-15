import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Close, CloseOutlined } from "@material-ui/icons";
import { sidebarData } from "../../sidebar/sidebarData";
import styled from "styled-components";
import Submenu from "../../sidebar/submenu";
// import Playground from "../../../aotocomplete/playground/aws/dashboard";
import { DateRangePicker } from 'rsuite';
import MonthsPicker from "../../../components/picker/month";
import RadioButtonsGroup from "../../../components/formInput/radioButtons/home";
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
  margin-top: 30px;
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

const SidebarApplyBottomWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  border-radius: 3px;
  padding: 6px;
  color: #fff;
  background-color: rgba(236, 140, 52, 0.7);
  height: 30px;
  width: 100px;
  transition: 350ms;
  margin-right: 20px;

  &:hover {
    cursor: pointer;
    color: rgb(236, 140, 52);
    background-color: rgb(52, 52, 52);
  }
`;

const SidebarCancelBottomWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  border-radius: 3px;
  padding: 6px;
  color: #fff;
  background-color:rgb(134, 134, 134);
  height: 30px;
  width: 100px;
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
  return (
    <SidebarContainer>
      <SidebarNav sidebar={sidebarActive}>
        <SidebarTitleWrap>FILTERS</SidebarTitleWrap>
        <SidebarFilterInputWrap>
          <MonthsPicker />
          <RadioButtonsGroup />
          {/* <Playground /> */}
          
          {/* {sidebarData.map((item, index) => {
            return <Submenu key={index} item={item} />;
          })} */}

        </SidebarFilterInputWrap>
        <SidebarBottomContainer>
          <SidebarCancelBottomWrap onClick={showSidebar} >
            Cancle
          </SidebarCancelBottomWrap>
          <SidebarApplyBottomWrap>
            Apply filters
          </SidebarApplyBottomWrap>
        </SidebarBottomContainer>
      </SidebarNav>
    </SidebarContainer>
  );
};

export default Sidebar;
