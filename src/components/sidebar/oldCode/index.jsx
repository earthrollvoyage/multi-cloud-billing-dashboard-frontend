import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CloseOutlined } from "@material-ui/icons";
import { sidebarData } from "./sidebarData";
import styled from "styled-components";
import Submenu from "./submenu";

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
  height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  position: fixed;
  top: 50;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = ({ sidebarActive }) => {

  return (
    <SidebarContainer>
      <SidebarNav sidebar={sidebarActive}>
        <SidebarWrap>
          {sidebarData.map((item, index) => {
            return <Submenu key={index} item={item} />;
          })}
        </SidebarWrap>
      </SidebarNav>
    </SidebarContainer>
  );
};

export default Sidebar;
