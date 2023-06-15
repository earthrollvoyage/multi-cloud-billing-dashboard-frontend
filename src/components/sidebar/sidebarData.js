import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import {
  Home,
  LineStyle,
  DashboardOutlined,
  WorkOutline,
  AssessmentOutlined,
  AccountCircleOutlined,
  SupervisorAccountOutlined,
  TimelineOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@material-ui/icons";
import styled from "styled-components";

const KeyboardArrowDownIcon = styled(KeyboardArrowDown)`
  margin-right: 5px;
  font-size: 20px !important;
`;

const KeyboardArrowUpIcon = styled(KeyboardArrowUp)`
  margin-right: 5px;
  font-size: 20px !important;
`;

const DashboardOutlinedIcon = styled(DashboardOutlined)`
  margin-right: 5px;
  font-size: 20px !important;
`;

const WorkOutlineIcon = styled(WorkOutline)`
  margin-right: 5px;
  font-size: 20px !important;
`;

const AssessmentOutlinedIcon = styled(AssessmentOutlined)`
  margin-right: 5px;
  font-size: 20px !important;
`;

const SupervisorAccountOutlinedIcon = styled(SupervisorAccountOutlined)`
  margin-right: 5px;
  font-size: 20px !important;
`;

const AccountCircleOutlinedIcon = styled(AccountCircleOutlined)`
  margin-right: 5px;
  font-size: 20px !important;
`;

const LineStyleIcon = styled(LineStyle)`
  margin-right: 5px;
  font-size: 20px !important;
`;

const HomeIcon = styled(Home)`
  margin-right: 5px;
  font-size: 20px !important;
`;

const TimelineOutlinedIcon = styled(TimelineOutlined)`
  margin-right: 5px;
  font-size: 20px !important;
`;

export const sidebarData = [
  {
    title: "Dashboard",
    path: "#",
    icon: <DashboardOutlinedIcon />,
    iconClosed: <KeyboardArrowDownIcon />,
    iconOpened: <KeyboardArrowUpIcon />,
    subNav: [
      {
        title: "Overview",
        path: "/home",
        icon: <HomeIcon />,
      },
      {
        title: "Logs Analytics",
        path: "/log-summary",
        icon: <TimelineOutlinedIcon />,
      },
    ],
  },
  {
    title: "Log Management",
    path: "/logs",
    icon: <WorkOutlineIcon />,
    iconClosed: <KeyboardArrowDownIcon />,
    iconOpened: <KeyboardArrowUpIcon />,
  },
  {
    title: "Reports",
    path: "/report",
    icon: <AssessmentOutlinedIcon />,
    iconClosed: <KeyboardArrowDownIcon />,
    iconOpened: <KeyboardArrowUpIcon />,
  },
  {
    title: "User Manage",
    path: "/users",
    icon: <AccountCircleOutlinedIcon />,
    iconClosed: <KeyboardArrowDownIcon />,
    iconOpened: <KeyboardArrowUpIcon />,
  },
  {
    title: "Admin Tools",
    path: "/admin-management",
    icon: <SupervisorAccountOutlinedIcon />,
    iconClosed: <KeyboardArrowDownIcon />,
    iconOpened: <KeyboardArrowUpIcon />,
    subNav: [
      {
        title: "Admin1",
        path: "#",
        icon: <LineStyleIcon />,
      },
      {
        title: "Admin2",
        path: "#",
        icon: <LineStyleIcon />,
      },
    ],
  },
];
