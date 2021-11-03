import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { users, delete_user } from './../../services/userService';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'actions', label: 'Actions', minWidth: 170, align: 'center' }
];

const UserTable = ({admin_user_id, reload, setReload}) => {

  const [rows, setRows] = useState([]);
  useEffect(async () => {
    let data = await users();
    if(data) {
      setRows(data);
    }
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleDeleteButtonClick = (id) => {
    setReload(!reload)
    delete_user(id);
    setTimeout(() => {
      location.href = '/'
    }, 300)
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
                          {
                            (column.id == "name") ?
                              (<Link color="primary" variant="outlined" underline="always" to={`/profile/${id}`} >{value}</Link> )
                              : (column.id == "actions") ? (
                                <Grid container justify="space-around" spacing={4}>
                                  <Button
                                    style={{borderRadius: 5}}
                                    className="btn btn-light btn-block w-50 mx-auto"
                                    to={`/user/${id}`}
                                    component={Link}
                                  >
                                    <EditIcon></EditIcon>
                                  </Button>
                                  { admin_user_id != id && <Button
                                    style={{borderRadius: 5}}
                                    className="btn btn-light btn-block w-50 mx-auto"
                                    onClick={ e => handleDeleteButtonClick(id)}
                                  >
                                    <DeleteIcon></DeleteIcon>
                                  </Button> }
                                </Grid>) : value
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
      {rows.length > 10 &&
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
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

export default UserTable;