import React, { useState, useEffect, useRef, createRef } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { user_time_zones, delete_user_time_zone } from './../../services/timeZoneService';

const columns = [
  { id: 'name', label: 'Time Zone Name', minWidth: 170 },
  { id: 'city', label: 'City', minWidth: 100 },
  { id: 'current_time_in_time_zone', label: 'Current Time In TimeZone', minWidth: 100 },
  { id: 'browser_time_and_time_zone_difference', label: 'Time Zone Difference', minWidth: 100 },
  { id: 'action', label: 'Actions', minWidth: 170, align: 'center' }
];

const TimeZoneTable = ({user_id,  reload, setReload}) => {

  const [rows, setRows] = useState([]);

  useEffect(async () => {
    let data = await user_time_zones(user_id);
    if(data) {
      setRows(data);
    }
  }, [reload]);


  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleDeleteButtonClick = (id) => {
    setReload(!reload);
    delete_user_time_zone(id);
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 &&
            rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const id = row["id"];
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {(column.id == "action") ? (
                                  <Button
                                    type="button"
                                    variant="contained"
                                    onClick={ e => handleDeleteButtonClick(id)}
                                  >
                                    <DeleteIcon></DeleteIcon>
                                  </Button>) : value
                          }
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {rows.length > 5 &&
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />}
    </Paper>
  );
}

export default TimeZoneTable;