import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import useStyles from './styles';
import SecondPaw from '../images/SecondPaw5.svg';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import * as actionType from '../../constants/actionTypes';

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate('/');
    setUser(null);
  }

  console.log(user);

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img src={SecondPaw} alt="Website Logo" align="left" height="20px" />
      </Link>
      <Toolbar className={classes.toolbar}>
        {
          user?.result ? (
            <div className={classes.profile}>
              <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
              <Typography className={classes.userName} variant='h6'>{user?.result.name}</Typography>
              <Button variant="contained" className={classes.logout} color='secondary' onClick={logout}>logout</Button>
            </div>
          ) : (
            <Button component={Link} to="/auth" variant="contained" color="primary" size="small">sign in</Button>
          )
        }        
        {
          (user &&
            <Button component={Link} to="/editpost" variant="contained" color="primary" size="small">create new sell</Button>
          )
        }
      </Toolbar>
    </AppBar >
  );
}

export default Navbar;