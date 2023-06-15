import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CloseOutlined,
  Home,
  Menu,
  LineStyle,
  Dashboard,
  Analytics,
  Assessment,
  Timeline,
  Poll,
  TrendingUp,
  PersonOutline,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  Feedback,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import { sidebarData } from "./sidebarData";
import styled from "styled-components";
import Submenu from "./submenu";

const SidebarContainer = styled.div`
  flex: 1;
  height: calc(100vh - 50px);
  background-color: rgb(251, 251, 255);
  position: sticky;
  top: 50px;
`;

const SidebarWrapper = styled.div`
  padding: 20px;
  color: rgb(73, 140, 200);
`;

const SidebarMenu = styled.div`
  margin-top: 10px;
`;

const SidebarTitle = styled.h3`
  font-size: 13px;
  color: rgb(187, 186, 186);
`;

const SidebarSubTitle = styled.ul`
  list-style: none;
  padding: 5px;
`;

const SidebarSubTitleItem = styled.li`
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  border-radius: 10px;
`;

const LineStyleIcon = styled(LineStyle)`
  margin-right: 5px;
  font-size: 20px !important;
`;

const TimelineIcon = styled(Timeline)`
  margin-right: 5px;
  font-size: 20px !important;
`;

const TrendingUpIcon = styled(TrendingUp)`
  margin-right: 5px;
  font-size: 20px !important;
`;

const PersonOutlineIcon = styled(PersonOutline)`
  margin-right: 5px;
  font-size: 20px !important;
`;

const StorefrontIcon = styled(Storefront)`
  margin-right: 5px;
  font-size: 20px !important;
`;

const AttachMoneyIcon = styled(AttachMoney)`
  margin-right: 5px;
  font-size: 20px !important;
`;

const BarChartIcon = styled(BarChart)`
  margin-right: 5px;
  font-size: 20px !important;
`;

const MailOutlineIcon = styled(MailOutline)`
  margin-right: 5px;
  font-size: 20px !important;
`;

const ChatBubbleOutlineIcon = styled(ChatBubbleOutline)`
  margin-right: 5px;
  font-size: 20px !important;
`;

const FeedbackIcon = styled(Feedback)`
  margin-right: 5px;
  font-size: 20px !important;
`;

const WorkOutlineIcon = styled(WorkOutline)`
  margin-right: 5px;
  font-size: 20px !important;
`;

const AssessmentIcon = styled(Assessment)`
  margin-right: 5px;
  font-size: 20px !important;
`;

const ReportIcon = styled(Report)`
  margin-right: 5px;
  font-size: 20px !important;
`;

const MenuIcon = styled(Menu)`
  margin-right: 5px;
  font-size: 20px !important;
  color: red;
`;

const CloseOutlinedIcon = styled(CloseOutlined)`
  margin-right: 5px;
  font-size: 20px !important;
  color: red;
`;

const AnchorLink = styled(Link)`
  display: flex;
  align-items: center;
  color: #6daaf0;
  cursor: pointer;
  text-decoration: none;
  transition: all 200ms ease-in-out;
  margin-right: 20px;

  &:hover {
    filter: contrast(0.6);
  }
`;

const Nav = styled.div`
  background-color: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2em;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
  background-color: #15171c;
  width: 270px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar2 = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <SidebarContainer>
      <Nav>
        <NavIcon to="#">
          <MenuIcon onClick={showSidebar} />
        </NavIcon>
      </Nav>
      <SidebarNav sidebar={sidebar}>
        <SidebarWrap>
          <SidebarIcon to="#">
            <CloseOutlinedIcon onClick={showSidebar} />
          </SidebarIcon>
          {sidebarData.map((item, index) => {
            return <Submenu key={index} item={item} />;
          })}
        </SidebarWrap>
      </SidebarNav>
    </SidebarContainer>
  );
};

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarTitle>Dashboard</SidebarTitle>
          <SidebarSubTitle>
            <AnchorLink to="/home">
              <SidebarSubTitleItem>
                <LineStyleIcon />
                Home
              </SidebarSubTitleItem>
            </AnchorLink>
            <AnchorLink to="/home">
              <SidebarSubTitleItem>
                <TimelineIcon />
                Analytics
              </SidebarSubTitleItem>
            </AnchorLink>
          </SidebarSubTitle>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarTitle>Quik Mene</SidebarTitle>
          <SidebarSubTitle>
            <AnchorLink to="/users">
              <SidebarSubTitleItem>
                <PersonOutlineIcon />
                User
              </SidebarSubTitleItem>
            </AnchorLink>
            <AnchorLink to="/products">
              <SidebarSubTitleItem>
                <StorefrontIcon />
                Products
              </SidebarSubTitleItem>
            </AnchorLink>
            <AnchorLink to="/users">
              <SidebarSubTitleItem>
                <AttachMoneyIcon />
                Transactions
              </SidebarSubTitleItem>
            </AnchorLink>
            <AnchorLink to="/users">
              <SidebarSubTitleItem>
                <BarChartIcon />
                Reports
              </SidebarSubTitleItem>
            </AnchorLink>
          </SidebarSubTitle>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarTitle>Notification</SidebarTitle>
          <SidebarSubTitle>
            <AnchorLink to="/users">
              <SidebarSubTitleItem>
                <MailOutlineIcon />
                Mail
              </SidebarSubTitleItem>
            </AnchorLink>
            <AnchorLink to="/users">
              <SidebarSubTitleItem>
                <ChatBubbleOutlineIcon />
                Message
              </SidebarSubTitleItem>
            </AnchorLink>
            <AnchorLink to="/users">
              <SidebarSubTitleItem>
                <FeedbackIcon />
                Feedback
              </SidebarSubTitleItem>
            </AnchorLink>
          </SidebarSubTitle>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarTitle>Administration</SidebarTitle>
          <SidebarSubTitle>
            <AnchorLink to="/users">
              <SidebarSubTitleItem>
                <WorkOutlineIcon />
                Manage
              </SidebarSubTitleItem>
            </AnchorLink>
            <AnchorLink to="/users">
              <SidebarSubTitleItem>
                <AssessmentIcon />
                Analytics
              </SidebarSubTitleItem>
            </AnchorLink>
            <AnchorLink to="/users">
              <SidebarSubTitleItem>
                <ReportIcon />
                Reports
              </SidebarSubTitleItem>
            </AnchorLink>
          </SidebarSubTitle>
        </SidebarMenu>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar2;
