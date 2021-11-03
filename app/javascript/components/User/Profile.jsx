import React, { useState, useEffect }  from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Grid, Typography, Button } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TimeZoneTable from './../TimeZone/TimeZoneTable';

import capitalize from './../common/capitalize';
import { get_user, delete_user } from "./../../services/userService";
import { logout, getCurrentUser } from "./../../services/authService";

import useStyles from './styles';

const Profile = ({reload, setReload}) => {
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
        navigate('/');
      }
    }
    else{
      setProfileUser(await get_user(id))
    }
  }, [id, reload]);

  const handleDeleteButtonClick = (id) => {
    setReload(!reload)
    delete_user(id);
    let current_user = getCurrentUser();
    if(current_user && !current_user.admin){
      logout();
    }
    setTimeout(() => {
      location.href = '/'
    }, 300)
  }

  let admin_user = profileUser && profileUser.admin;
  let name = profileUser && profileUser.name ? profileUser.name : ""

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center">
        <div className="card">
          <div className="card-body">
            <div className="avatar" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <div>
                <img
                  src="https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon-thumbnail.png"
                  className="card-img-top"
                  alt=""
                  width={60}
                  height={60}
                />
              </div>
              <div style={{marginTop: 0, marginLeft: 10}}>
                <h3 className="card-title">
                  {capitalize(name)}
                </h3>
                <p className="card-text">
                  <span className="phone">{profileUser && profileUser.email}</span>
                </p>
              </div>
            </div>
            <div>
              <Button
                type="button"
                variant="contained"
                className={classes.submit}
                to={`/user/${id || profileUser.id}`}
                component={Link}
              >
                <EditIcon></EditIcon>
              </Button>
              {!admin_user &&
              <Button
                type="button"
                variant="contained"
                className={classes.submit}
                style={{marginLeft: 20}}
                onClick={ e => handleDeleteButtonClick(profileUser && profileUser.id)}
              >
                <DeleteIcon></DeleteIcon>
              </Button>}
            </div>
          </div>
        </div>
      </Grid>
      <div>
        <div style={{display: 'flex', justifyContent: 'center' }}>
          <h3 style={{marginBottom: 5}}>Time Zones</h3>
          <Button
            style={{borderRadius: 5, position: "absolute", right: 22}}
            className="btn btn-light"
            size="small"
            to={`/${id}/add-timezone`}
            component={Link}
          >
            <AddIcon />
          </Button>
        </div>
        <TimeZoneTable user_id={id} reload={reload} setReload={setReload} />
      </div>
    </main>

  );
}

export default Profile;
