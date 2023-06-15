import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { InnerPageContainer } from "../../pageContainer";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@mui/x-data-grid";
import { BorderColorRounded, DeleteOutline } from "@material-ui/icons";
import { listDailyAWSCost } from "../../../services/billing/costAnalysis/aws/listDailyCost";
import { listMonthlyAWSCost } from "../../../services/billing/costAnalysis/aws/listMonthlyCost";
import { listDailyGCPCost } from "../../../services/billing/costAnalysis/gcp/listDailyCost";
import { listMonthlyGCPCost } from "../../../services/billing/costAnalysis/gcp/listMonthlyCost";

const CostTableGroupContainer = styled(InnerPageContainer)`
  flex: unset;
  height: 200px;
  align-items: unset;
`;

const TableCellWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const UserCellImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
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

const ActionCellDeleteIcon = styled(DeleteOutline)`
  color: red;
  cursor: pointer;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDataGrid-columnsContainer": {
    //   backgroundColor: "rgb(52, 52, 52)",
      color: "rgb(52, 52, 52)",
      fontWeight: 'bolder !important',
    },
  },
}));

const DashboardCostTableGroup = ({ filterDataSet, granularity, page }) => {
  const classes = useStyles();
  const [columns, setColumns] = useState([]);
  const [listCost, setListCost] = useState([]);

  useEffect(() => {
    if(page === '/aws/billing/costAnalysis') {
      if(granularity === "MONTHLY") {
          listMonthlyAWSCost('2021-01-01', '2021-11-30', 'linked_account').then((res) => {
              setColumns(res.series);
              setListCost(res.data)
          })
      } else {
          listDailyAWSCost('2021-01-01', '2021-11-30', 'service').then((res) => {
              setColumns(res.series);
              setListCost(res.data)
          })
      }
    } else {
      if(granularity === "MONTHLY") {
        listMonthlyGCPCost('2021-01-01', '2021-11-30', 'project_cost').then((res) => {
            setColumns(res.series);
            setListCost(res.data)
        })
    } else {
        listDailyGCPCost('2021-11-01', '2021-11-30', 'project_cost').then((res) => {
            setColumns(res.series);
            setListCost(res.data)
        })
    }
    }
  }, []);

  return (
    <CostTableGroupContainer>
      <DataGrid
        className={classes.root}
        rows={listCost}
        columns={columns}
        pageSize={12}
        userRowsPerPageOptions={[5]}
      />
    </CostTableGroupContainer>
  );
};

export default DashboardCostTableGroup;
