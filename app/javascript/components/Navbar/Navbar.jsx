import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, Typography, Button } from '@material-ui/core';
import {Link, NavLink, useLocation} from 'react-router-dom';

import capitalize from './../common/capitalize';

import logo from '../../assets/images/commerce.png';
import useStyles from './styles';

const NavBar = ({user}) => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
            <img src={logo} alt="commerce.js" height="25px" className={classes.image} /> ECommerce
          </Typography>
          <div className={classes.grow} />
          {!user && (
              <React.Fragment>
                <NavLink color="primary" variant="outlined" className={classes.link} to="/login">
                  Login
                </NavLink>
                <NavLink color="primary" variant="outlined" className={classes.link} to="/register">
                  Register
                </NavLink>
              </React.Fragment>
          )}
          {user && (
              <React.Fragment>
                <NavLink color="primary" variant="outlined" className={classes.link} to={`/profile/${user.id}`}>
                  {capitalize(user.name)}
                </NavLink>
                <NavLink color="primary" variant="outlined" className={classes.link} to="/logout">
                  Logout
                </NavLink>
              </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
