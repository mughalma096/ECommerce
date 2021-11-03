import React from 'react';
import { Link, Typography } from '@material-ui/core';

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" style={{margin: "auto"}}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Assessment
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}