import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import useStyles from './styles';
import SecondPaw from '../images/SecondPaw5.svg';
import { useDispatch } from 'react-redux';

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    history('/');
    setUser(null); 
  }

  console.log(user);

  useEffect(() => {
    const token = user?.token;
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img src={SecondPaw} alt="Website Logo" align="left" height="20px" />
      </Link>
      <Toolbar className={classes.toolbar}>
        {
          user ? (
            <div className={classes.profile}>
              <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
              <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
              <Button variant="contained" className={classes.logout} color='secondary' onClick={logout}>logout</Button>
            </div>
          ) : (
            <Button component={Link} to="/auth" variant="contained" color="primary">sign in</Button>
          )
        }        
        {
          //edit post button ui
            <Button component={Link} to="/editpost" variant="contained" color="primary">create a sell</Button>
        }
      </Toolbar>
    </AppBar >
  );
}

export default Navbar;