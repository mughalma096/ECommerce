import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import { Avatar, Button, CssBaseline,TextField, FormControlLabel,
  Checkbox, Grid, Box, Typography, makeStyles, Container } from '@material-ui/core';

import { add_user_time_zone } from './../../services/timeZoneService';

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

export default function TimeZoneForm({reload, setReload}) {
  const classes = useStyles();
  const navigate = useNavigate()

  // Get ID from URL
  let { user_id } = useParams();


  const { handleSubmit, control, formState: { errors } } = useForm();

  const onSubmit = handleSubmit((data) => {
    add_user_time_zone(user_id, data);
    setReload(!reload)
    navigate(`/profile/${user_id}`);
  });

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.toolbar} />
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add Time Zone
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
                    label="Time Zone Name"
                    autoFocus
                    helperText={errors.name}
                    {...field}
                  />}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="city"
                control={control}
                defaultValue=""
                render={({ field }) =>
                  <TextField
                    autoComplete="city"
                    variant="outlined"
                    required
                    fullWidth
                    id="city"
                    label="Time Zone City"
                    autoComplete="city"
                    autoFocus
                    helperText={errors.name}
                    {...field}
                  />}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="utc_difference"
                control={control}
                defaultValue=""
                render={({ field }) =>
                  <TextField
                    variant="outlined"
                    required
                    type="number"
                    fullWidth
                    id="utc_difference"
                    autoComplete="utc_difference"
                    label="Difference From GMT/UTC"
                    autoComplete="city"
                    autoFocus
                    helperText={errors.name}
                    {...field}
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