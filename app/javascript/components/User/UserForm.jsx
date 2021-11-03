import React, { useState, useEffect } from 'react';
import {useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from 'react-router-dom';
import { Avatar, Button, CssBaseline,TextField, FormControlLabel,
  Checkbox, Link, Grid, Box, Typography, makeStyles, Container } from '@material-ui/core';

import { get_user, update_user } from './../../services/userService';


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
  toolbar: theme.mixins.toolbar,
}));

export default function UserForm(reload, setReload) {
  const classes = useStyles();
  const navigate = useNavigate()

  // Get ID from URL
  let { id } = useParams();
  const [profileUser, setProfileUser] = useState( null );

  useEffect(async () => {
    if (id == null){
      let currentUser = getCurrentUser();
      if(currentUser){
        setProfileUser(currentUser);
      }
      else{
        navigate(`/profile/${id || profileUser.id}`);
        setReload(!reload);
      }
    }
    else{
      let data = await get_user(id)
      setProfileUser(data);
    }
  }, [id]);

  useEffect(() => {
    setValue('name', profileUser && profileUser.name ? profileUser.name : "" )
    setValue('email', profileUser && profileUser.email ? profileUser.email : "")
  }, [profileUser])

  const { handleSubmit, control, setValue, formState: { errors }} = useForm();

  const onSubmit = handleSubmit((data) => {
    let { name, email, password } = data;
    update_user(id, name, email, password);
    navigate(`/profile/${id || profileUser.id}`);
  });

  const changeHandler = (e) => {
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.toolbar} />
      <CssBaseline />
      <div className={classes.paper}>
        <div style={{marginTop: 10}}>
          <Typography component="h1" variant="h5">
            Edit {'User'}
          </Typography>
        </div>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Controller
                name="name"
                defaultValue=""
                control={control}
                onChange={changeHandler}
                render={({ field: { onChange, onBlur, value, name, ref } }) =>
                  <TextField
                    autoComplete="name"
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    value={value}
                    onChange={onChange}
                    label="Name"
                    autoFocus
                    helperText={errors.name}
                  />}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                defaultValue=""
                control={control}
                onChange={changeHandler}
                render={({ field: { onChange, onBlur, value, name, ref } }) =>
                  <TextField
                    autoComplete="email"
                    variant="outlined"
                    required
                    fullWidth
                    value={value}
                    onChange={onChange}
                    id="email"
                    label="Email"
                    autoFocus
                    helperText={errors.name}
                  />}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                onChange={changeHandler}
                render={({ field: { onChange, onBlur, value, name, ref } }) =>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    onChange={onChange}
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    helperText={errors.password}
                  />}
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
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
}