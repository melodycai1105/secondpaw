import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import useStyles from './styles';
import SecondPaw from '../images/SecondPaw5.svg';

const Navbar = () => {
  const classes = useStyles();
  const user = null;
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
              <Button variant="contained" className={classes.logout} color='secondary' onClick={() => { }}>logout</Button>
            </div>
          ) : (
            <Button component={Link} to="/auth" variant="contained" color="primary">sign in</Button>
          )
        }
      </Toolbar>
    </AppBar >
  );
}

export default Navbar;