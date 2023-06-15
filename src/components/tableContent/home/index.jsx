import React, { useState, useEffect, useContext } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { listCostSummary } from "../../../services/billing/summary/listCostSummary";
import { HomeFilterDataContext } from "../../../data/homeFilterContext";
import CircularIndeterminate from '../../progressLoading/circular/circularIndeterminate';


export default function HomeCostTable({ filterDataSet }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [dataFetched, setDataFetched] = useState(false);
  const [columns, setColumns] = useState([]);
  const [listCost, setListCost] = useState([
    {
      id: 1,
      month: "-",
      AWS: 0,
      GCP: 0,
      AZURE: 0,
      // HUAWEI: 0,
    },
  ]);

  const { homeFilterDataSet } = useContext(HomeFilterDataContext);

  useEffect(() => {
    const { monthRange, cloudBrand } = filterDataSet;
    listCostSummary(monthRange.startMonth, monthRange.endMonth, cloudBrand).then((res) => {
      setColumns(res.series);
      setListCost(res.data);
      setDataFetched(true);
    });
  }, [ homeFilterDataSet ]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ minWidth: '50%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
        { !dataFetched ? <CircularIndeterminate /> : <>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.headerAlign}
                    style={{ width: "1px", background: "rgb(252, 252, 252)", borderLeft: "1px solid rgb(228,228,228)" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {listCost
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code} style={ index % 2 ? { background : "rgb(252, 252, 252)" }:{ background : "white"}}>
                      {columns.map((column, index) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align} style={index === 1 ? { borderLeft: "1px solid rgb(228,228,228)"} : { borderLeft: "hide"}}>
                              
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </>
        }
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={listCost.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}