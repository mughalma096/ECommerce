import React from "react";

const NotFound = () => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center" spacing={4}>
        <h1>Not Found!</h1>
      </Grid>
    </main>
  );
};

export default NotFound;
