import React, { useState } from "react";
import { Link } from "react-router-dom";
import TopAvatarImage from "../../images/avatar/original.jpeg";
import {
  NotificationsNone,
  Language,
  GTranslate,
  Translate,
  Settings,
  Menu,
} from "@material-ui/icons";
import BrandLogo from "../brandLogo";
import styled from "styled-components";
// import { topbarData } from "./oldCode/topbarData";
// import Submenu from "./oldCode/submenu";
import { menuItems } from "./menuItems";
import * as FaIcons from "react-icons/fa";
import DropdownMenu from "./dropdownMenu";

const TopbarContainer = styled.div`
  width: 100%;
  height: 90px;
  background-color: rgb(255, 255, 255);
  position: sticky;
  top: 0;
  z-index: 10;
`;

const TopbarWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TopbarOnTop = styled.div`
  height: 90px;
  margin-top: 3.5px;
  background-color: rgb(255, 255, 255);
  padding: 20px 33px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid rgb(244,244,244);
`;

const TopbarOnTopInnerLeftSide = styled.div`
  margin-top: 11px;
`;

const TopbarOnTopInnerMiddleSide = styled.div`

`;

const TopbarOnTopInnerRightSide = styled.div`
  display: flex;
  align-items: center;
`;

const TopbarOnBottom = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  background-color: rgb(255, 255, 255);
`;

const TopbarOnBottomInnerNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TopbarOnBottomInnerNavUl = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  width: 100%;
  justify-content: flex-start;
  margin-right: 2rem;
`;

const TopbarOnBottomInnerNavLi = styled.li`
  display: flex;
  align-items: center;
  margin-right: 1.5rem;
  height: 90px;
`;

const TopbarOnBottomInnerNavLiLink = styled(Link)`
  text-decoration: none;
  font-size: 13px;
  font-weight: bold;
  color: rgb(52, 52, 52);
  margin-top: 15px;
  padding-right: 30px;

  &:hover {
    color: rgb(4,100,251);
    cursor: pointer;
  }
`;

const TopbarOnBottomInnerNavLiLinkInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const Logo = styled.span`
  font-weight: bold;
  font-size: 25px;
  color: rgb(73, 140, 200);
  letter-spacing: 1px;
  cursor: pointer;
`;

const TopbarIconContainer = styled.div`
  position: relative;
  cursor: pointer;
  margin-right: 30px;
  color: #555;
  margin-top: 3.5px;
`;

const TopbarAvatarContainer = styled.div`
  position: relative;
  cursor: pointer;
  margin-right: 30px;
  margin-top: 3.5px;
`;

const TopIconBadge = styled.span`
  width: 15px;
  height: 15px;
  position: absolute;
  top: -1px;
  left: 12px;
  /* right: 0px; */
  background-color: red;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
`;

const TopAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  object-fit: cover;
`;

const TopbarLeftWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TopbarLeftMenuIcon = styled(Menu)`
  margin-right: 20px;
`;

const Topbar = ({ showSidebar }) => {
  const [userDropdown, setUserDropdown] = useState(false);
  const [costAnalysisDropdown, setCostAnalysisDropdown] = useState(false);
  const onMouseEnterUser = () => setUserDropdown(true);
  const onMouseLeaveUser = () => setUserDropdown(false);
  const onMouseEnterCostAnalysis = () => setCostAnalysisDropdown(true);
  const onMouseLeaveCostAnalysis = () => setCostAnalysisDropdown(false);

  return (
    <TopbarContainer>
      <TopbarWrapper>
        <TopbarOnTop>
          <TopbarOnTopInnerLeftSide>
            <TopbarLeftWrapper>
              {/* <TopbarLeftMenuIcon onClick={showSidebar} /> */}
              <BrandLogo logoSize={60} />
            </TopbarLeftWrapper>
          </TopbarOnTopInnerLeftSide>
          <TopbarOnTopInnerMiddleSide>
            <TopbarOnBottomInnerNav>
              <TopbarOnBottomInnerNavUl>
                {menuItems.map((item, index) => {
                  if (item.title === "USER MANAGEMENT") {
                    return (
                      <TopbarOnBottomInnerNavLi
                        key={index}
                        onMouseEnter={onMouseEnterUser}
                        onMouseLeave={onMouseLeaveUser}
                      >
                        <TopbarOnBottomInnerNavLiLink to={item.path}>
                          <TopbarOnBottomInnerNavLiLinkInner>
                            {item.title}
                            {!userDropdown ? item.iconClosed : item.iconOpened}
                          </TopbarOnBottomInnerNavLiLinkInner>
                        </TopbarOnBottomInnerNavLiLink>
                        {userDropdown && <DropdownMenu click={ userDropdown } mainMenu={ item.title }/>}
                      </TopbarOnBottomInnerNavLi>
                    );
                  }

                  if (item.title === "COST ANALYSIS") {
                    return (
                      <TopbarOnBottomInnerNavLi
                        key={index}
                        onMouseEnter={onMouseEnterCostAnalysis}
                        onMouseLeave={onMouseLeaveCostAnalysis}
                      >
                        <TopbarOnBottomInnerNavLiLink to={item.path}>
                          <TopbarOnBottomInnerNavLiLinkInner>
                            {item.title}
                            {!costAnalysisDropdown ? item.iconClosed : item.iconOpened}
                          </TopbarOnBottomInnerNavLiLinkInner>
                        </TopbarOnBottomInnerNavLiLink>
                        {costAnalysisDropdown && <DropdownMenu click={ costAnalysisDropdown } mainMenu={ item.title }/>}
                      </TopbarOnBottomInnerNavLi>
                    );
                  }

                  return (
                    <TopbarOnBottomInnerNavLi key={index}>
                      <TopbarOnBottomInnerNavLiLink to={item.path}>
                        {item.title}
                      </TopbarOnBottomInnerNavLiLink>
                    </TopbarOnBottomInnerNavLi>
                  );
                })}
              </TopbarOnBottomInnerNavUl>
            </TopbarOnBottomInnerNav>
          </TopbarOnTopInnerMiddleSide>
          <TopbarOnTopInnerRightSide>
            <TopbarIconContainer>
              <NotificationsNone />
              <TopIconBadge>2</TopIconBadge>
            </TopbarIconContainer>
            <TopbarIconContainer>
              <Language />
              <TopIconBadge>2</TopIconBadge>
            </TopbarIconContainer>
            <TopbarIconContainer>
              <Settings />
            </TopbarIconContainer>
            <TopbarAvatarContainer>
              <TopAvatar
                src={TopAvatarImage}
                alt="top-avatar-profile"
                className="topAvatar"
              />
            </TopbarAvatarContainer>
          </TopbarOnTopInnerRightSide>
        </TopbarOnTop>
        {/* <TopbarOnBottom>
          <TopbarOnBottomInnerNav>
            <TopbarOnBottomInnerNavUl>
              {menuItems.map((item, index) => {
                if (item.title === "USER MANAGEMENT") {
                  return (
                    <TopbarOnBottomInnerNavLi
                      key={index}
                      onMouseEnter={onMouseEnterUser}
                      onMouseLeave={onMouseLeaveUser}
                    >
                      <TopbarOnBottomInnerNavLiLink to={item.path}>
                        <TopbarOnBottomInnerNavLiLinkInner>
                          {item.title}
                          {!userDropdown ? item.iconClosed : item.iconOpened}
                        </TopbarOnBottomInnerNavLiLinkInner>
                      </TopbarOnBottomInnerNavLiLink>
                      {userDropdown && <DropdownMenu click={ userDropdown } mainMenu={ item.title }/>}
                    </TopbarOnBottomInnerNavLi>
                  );
                }

                if (item.title === "COST ANALYSIS") {
                  return (
                    <TopbarOnBottomInnerNavLi
                      key={index}
                      onMouseEnter={onMouseEnterCostAnalysis}
                      onMouseLeave={onMouseLeaveCostAnalysis}
                    >
                      <TopbarOnBottomInnerNavLiLink to={item.path}>
                        <TopbarOnBottomInnerNavLiLinkInner>
                          {item.title}
                          {!costAnalysisDropdown ? item.iconClosed : item.iconOpened}
                        </TopbarOnBottomInnerNavLiLinkInner>
                      </TopbarOnBottomInnerNavLiLink>
                      {costAnalysisDropdown && <DropdownMenu click={ costAnalysisDropdown } mainMenu={ item.title }/>}
                    </TopbarOnBottomInnerNavLi>
                  );
                }

                return (
                  <TopbarOnBottomInnerNavLi key={index}>
                    <TopbarOnBottomInnerNavLiLink to={item.path}>
                      {item.title}
                    </TopbarOnBottomInnerNavLiLink>
                  </TopbarOnBottomInnerNavLi>
                );
              })}
            </TopbarOnBottomInnerNavUl>
          </TopbarOnBottomInnerNav>
        </TopbarOnBottom> */}
      </TopbarWrapper>
    </TopbarContainer>
  );
};

export default Topbar;
