import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { useForm, Controller } from "react-hook-form";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles, Link, Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container } from '@material-ui/core';
import { login, getCurrentUser } from './../../services/authService';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginForm({reload, setReload}) {

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
    let { email, password } = data;
    login(email, password);
    setReload(!reload);
    setTimeout(() => {
      location.href = '/'
    }, 300)
  });
  const classes = useStyles();

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={onSubmit}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) =>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Email Address"
                  autoComplete="email"
                  autoFocus
                  helperText={errors.email}
                  {...field}
              />}
            />
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
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
  );
}