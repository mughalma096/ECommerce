import React, { useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, CssBaseline,TextField, FormControlLabel,
  Checkbox, Link, Grid, Box, Typography, makeStyles, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { register } from './../../services/userService';
import { getCurrentUser } from "./../../services/authService";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function RegisterForm({reload, setReload}) {
  const classes = useStyles();
  const navigate = useNavigate()

  useEffect(() => {
    if(getCurrentUser()){
      navigate('/');
    }
  }, []);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    register(data);
    setReload(!reload);
    setTimeout(() => {
      location.href = '/'
    }, 300)
  });

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) =>
                    <TextField
                      autoComplete="name"
                      variant="outlined"
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      autoFocus
                      helperText={errors.name}
                      {...field}
                    />}
                  />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) =>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      helperText={errors.email}
                      {...field}
                    />}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) =>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      helperText={errors.password}
                      {...field}
                    />}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive promotions via email."
                />
              </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
  );
}