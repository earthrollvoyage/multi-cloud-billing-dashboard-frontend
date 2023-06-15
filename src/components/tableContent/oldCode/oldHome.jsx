import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { InnerPageContainer } from "../../pageContainer";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@mui/x-data-grid";
import { BorderColorRounded, DeleteOutline } from "@material-ui/icons";
import UserAvatar from "../../../images/avatar/3ca46bfcfa43ef92f2875eaaa3199af6.jpeg";
import { listCostSummary } from "../../../services/billing/summary/listCostSummary";

const CostSummaryTableContainer = styled(InnerPageContainer)`
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

const CostSummaryTable = () => {
  const classes = useStyles();
  const [listCost, setListCost] = useState([
    {
      id: 1,
      month: "-",
      AWS: 0,
      GCP: 0,
      AZURE: 0,
      HUAWEI: 0,
    },
  ]);

  useEffect(() => {
    listCostSummary('January 2021', 'November 2021').then((res) => {
      setListCost(res);
    });
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "month",
      headerName: "Month",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "AWS",
      headerName: "AWS",
      width: 200,
      headerAlign: "center",
      align: "right",
    },
    {
      field: "GCP",
      headerName: "GCP",
      width: 200,
      headerAlign: "center",
      align: "right",
    },
    {
      field: "AZURE",
      headerName: "AZURE",
      width: 200,
      headerAlign: "center",
      align: "right",
    },
    {
      field: "HUAWEI",
      headerName: "HUAWEI",
      width: 200,
      headerAlign: "center",
      align: "right",
    },
    {
      field: "total",
      headerName: "Cost Total",
      width: 200,
      headerAlign: "center",
      align: "right",
    },
  ];

  return (
    <CostSummaryTableContainer>
      <DataGrid
        className={classes.root}
        rows={listCost}
        columns={columns}
        pageSize={12}
        userRowsPerPageOptions={[5]}
      />
    </CostSummaryTableContainer>
  );
};

export default CostSummaryTable;
