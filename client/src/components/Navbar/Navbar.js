import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Toolbar, Typography, TextField, Grid, Container, Button } from '@material-ui/core';
import useStyles from './styles';
import SecondPaw9 from '../images/SecondPaw5.svg';
import default_profile_pic from '../images/bruin_logo.jpeg';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import * as actionType from '../../constants/actionTypes';
import ChipInput from 'material-ui-chip-input';
import { getPostsBySearch } from '../../actions/posts';
import '../button.css';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const query = useQuery();

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      navigate('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) { //enter
      searchPost();
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);

  const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate('/');
    setUser(null);
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

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
      <Link to="/" className={classes.logoContainer}>
        <img src={SecondPaw9} alt='' width="700px" />
      </Link>
      <div className={classes.searchBar}>
        <TextField 
          style={{background: 'white', width: '220px', height: '70px', margin: '10px 10px 10px 50px', border: '3px light black'}}
          class="button-54-edited"
          name="search"
          variant="outlined"
          label="Search Sales"
          fullWidth
          onKeyPress={handleKeyPress}
          value={search}
          onChange={(e) => { setSearch(e.target.value) }}
        />
        <ChipInput
          style={{background: 'white', width: '220px', height: '70px', margin: '10px', border: '3px light black'}}
          class="button-54-edited"
          value={tags}
          onAdd={(tag) => handleAdd(tag)}
          onDelete={(tag) => handleDelete(tag)}
          label="Search Tags"
          variant="outlined"
        />
        <Button onClick={searchPost} class="button-54" style={{margin: '10px', padding: '10px', height: '40px' }}>
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
          </svg>
        </Button>
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result && (
            <div onClick={(e) => {
                e.stopPropagation();
                navigate(`/user/${user?.result?._id}`);
            }}>
                <Avatar className={classes.avatar} alt={user?.result.name} src={user?.result?.profile_pic || default_profile_pic} style={{margin:'0px 15px 0px 0px'}} />
            </div>
          )}        
        <div className={classes.dashboard} >
          <Button
            id="menuButton"
            aria-controls={open ? 'menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="contained" color="primary" class="button-54" size="small"
            onClick={handleClick}
          >
            DASHBOARD
          </Button>
          <Menu
            className={classes.menu} 
            id="menu"
            MenuListProps={{
              'aria-labelledby': 'menuButton',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            {user?.result ? (
                <div className={classes.menuList}>
                  <MenuItem disableRipple onClick={() => navigate("/editpost")}>
                    <EditIcon />
                    <Typography>&nbsp;&nbsp;Create Post</Typography>
                  </MenuItem>
                  <MenuItem disableRipple onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/user/${user?.result?._id}`);
                    }}>
                    <AccountCircleIcon />
                    <Typography>&nbsp;&nbsp;Profile</Typography>
                  </MenuItem>
                  <MenuItem disableRipple onClick={() => navigate(`/user/${user?.result?._id}/reservation/`)}>
                    <BookmarksIcon />
                    <Typography>&nbsp;&nbsp;Reservation</Typography>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem disableRipple onClick={logout}>
                    <LogoutIcon />
                    <Typography>&nbsp;&nbsp;Logout</Typography>
                  </MenuItem>
                </div>
              ) : (
                <MenuItem disableRipple onClick={() => navigate("/auth")}>
                <LoginIcon />
                <Typography>&nbsp;Sign In</Typography>
                </MenuItem>
              )}
          </Menu>
        </div>
      </Toolbar>
    </AppBar >
  );
};

export default Navbar;