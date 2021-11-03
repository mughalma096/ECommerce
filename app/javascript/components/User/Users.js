import React from 'react';
import useStyles from './styles';
import UserTable from './UserTable';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import { Grid, Button, Typography } from '@material-ui/core';

import { getCurrentUser } from "./../../services/authService";

const Users = ({ user, reload, setReload }) => {
  const classes = useStyles();
  let admin_user = user && user.admin;
  let admin_user_id = user && user.admin && user.id;
  let help_text = user ? <Link to={`/profile/${user.id}`}>Go to Profile</Link> :
    <><Link to={`/login`}>Login</Link> or <Link to={`/register`}>Register</Link></>
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid>
        { admin_user ?
          (<><Grid style={{display: 'flex', height: 50, justifyContent: "center"}}>
            <h2>User List</h2>
            {/*<Button*/}
            {/*  style={{borderRadius: 5, position: "absolute", right: 22}}*/}
            {/*  className="btn btn-light"*/}
            {/*  size="small"*/}
            {/*  to="/add-timezone"*/}
            {/*  component={Link}*/}
            {/*>*/}
            {/*  <AddIcon />*/}
            {/*</Button>*/}
          </Grid>
          <UserTable admin_user_id={admin_user_id} reload={reload} setReload={setReload}   /></>) :
          <Grid style={{display: 'flex', height: 50, justifyContent: "center"}}>
            <h3 >Welcome to ECommerce! {help_text}</h3>
          </Grid>
        }
      </Grid>
    </main>
  );
};

export default Users;



