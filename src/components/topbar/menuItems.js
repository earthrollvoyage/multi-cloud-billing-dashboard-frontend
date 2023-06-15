import React from "react";
import {
  Home,
  DashboardOutlined,
  TimelineOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  FilterList,
} from "@material-ui/icons";
import styled from "styled-components";

const KeyboardArrowDownIcon = styled(KeyboardArrowDown)`
  margin-left: 5px;
  font-size: 16px !important;
`;

const KeyboardArrowUpIcon = styled(KeyboardArrowUp)`
  margin-left: 5px;
  font-size: 16px !important;
`;

const DashboardOutlinedIcon = styled(DashboardOutlined)`
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

const FilterListIcon = styled(FilterList)`
  margin-right: 5px;
  font-size: 20px !important;
`;


export const menuItems  = [
  {
    title: "HOME",
    path: "/home",
    iconClosed: <KeyboardArrowDownIcon />,
    iconOpened: <KeyboardArrowUpIcon />,
  },
  {
    title: "COST ANALYSIS",
    path: "#",
    iconClosed: <KeyboardArrowDownIcon />,
    iconOpened: <KeyboardArrowUpIcon />,
  },
  {
    title: "REPORT",
    path: "#",
    iconClosed: <KeyboardArrowDownIcon />,
    iconOpened: <KeyboardArrowUpIcon />,
  },
  {
    title: "USER MANAGEMENT",
    path: "#",
    iconClosed: <KeyboardArrowDownIcon />,
    iconOpened: <KeyboardArrowUpIcon />,
  }
];

export const userSubmenuItems  = [
  {
    title: "DASHBOARD",
    path: "#",
  },
  {
    title: "ADMIN CREATE ACCOUNT",
    path: "#",
  },
  {
    title: "ADMIN APPROVAL",
    path: "#",
  },
];

export const dashboardSubmenuItems  = [
  {
    title: "AWS",
    path: "/aws/billing/costAnalysis",
  },
  {
    title: "GCP",
    path: "/gcp/billing/costAnalysis",
  },
  {
    title: "AZURE",
    path: "/azure/billing/costAnalysis",
  },
  // {
  //   title: "HUAWEI",
  //   path: "/huawei/billing/costAnalysis",
  // },
];
