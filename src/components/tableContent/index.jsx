import React from "react";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import {
  ModeEdit,
  BorderColorRounded,
  DeleteOutline,
} from "@material-ui/icons";
import { costData } from "../../data/dummy";
import UserList from "./oldCode/dd1";
import HomeCostTable from "./home";
import DashboardAWSCostTableGroup from "./dashboard/aws/testd";
import DashboardGCPCostTableGroup from "./dashboard/gcp";
import DashboardAzureCostTableGroup from "./dashboard/azure";
import DashboardHuaweiCostTableGroup from "./dashboard/huawei";

const TableContentContainer = styled.div`
  height: 100%;
  flex: ${({ boxValue }) => (boxValue ? boxValue : "4")};
  /* margin-top: 15px; */
  /* margin-bottom: 15px; */
  margin-left: ${({ marginLeftValue }) =>
    marginLeftValue ? `${marginLeftValue}px` : "0px"};
  margin-right: ${({ marginRightValue }) =>
    marginRightValue ? `${marginRightValue}px` : "0px"};
  padding-top: 20px;
  /* padding-bottom: 20px; */
  border-radius: 2px;
  background-color: #fff;
`;

const ChartTitle = styled.h3`
  margin-top: 2px;
  margin-left: 20px;
  margin-bottom: 10px;
  font-size: ${({ fontsize }) => fontsize};
  color: rgb(52, 52, 52);
  padding: 5px 0px;
  /* border-bottom: 2px solid rgb(244,244,244);; */
`;

const ChartSubtitle = styled.h5`
  margin-left: 20px;
  margin-bottom: 20px;
  color: rgb(141, 141, 141);
  font-size: 12px;
  font-weight: 20px;
`;

const StatusOnTable = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 10px;
  color: rgb(52, 52, 52);
  justify-content: space-between;
  /* padding: 5px 0px; */
`;

const StatusContentOnTable = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: ${({ fontsize }) => fontsize};
  color: rgb(52, 52, 52);
  flex-direction: column;
  /* border: 2px solid rgb(244,244,244); */
  /* border-bottom: 2px solid rgb(244,244,244);; */
`;

const StatusInnerContentOnTable = styled.div`
  display: flex;
  font-size: ${({ fontsize }) => fontsize};
  color: rgb(52, 52, 52);
  /* border-bottom: 2px solid rgb(244,244,244);; */
`;

const TableContent = ({
  title,
  filterDataSet,
  boxValue,
  marginLeftValue,
  marginRightValue,
  page,
  fontsize
}) => {
  return (
    <TableContentContainer
      boxValue={boxValue}
      marginLeftValue={marginLeftValue}
      marginRightValue={marginRightValue}
    >
      {page === "/home" && (<HomeCostTable filterDataSet={filterDataSet} />)}
      {page === "/aws/billing/costAnalysis" && (<DashboardAWSCostTableGroup filterDataSet={filterDataSet} page={page}/>)}
      {page === "/gcp/billing/costAnalysis" && (<DashboardGCPCostTableGroup filterDataSet={filterDataSet} page={page}/>)}
      {page === "/azure/billing/costAnalysis" && (<DashboardAzureCostTableGroup filterDataSet={filterDataSet} page={page}/>)}
      {page === "/huawei/billing/costAnalysis" && (<DashboardHuaweiCostTableGroup filterDataSet={filterDataSet} page={page}/>)}
    </TableContentContainer>
  );
};

export default TableContent;
