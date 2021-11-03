import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import Copyright from './../common/copyright';

import useStyles from './styles';

const Footer = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Copyright />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Footer;
