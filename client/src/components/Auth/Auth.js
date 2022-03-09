import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import PhoneInput from 'react-phone-input-2';
import FileBase from 'react-file-base64';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import useStyles from './styles';
import { signin, signup } from '../../actions/auth';
import { GoogleLogin } from 'react-google-login';
import Icon from './icon';
import { AUTH } from '../../constants/actionTypes';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  profile_pic: ''
}

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
      if (isSignup) {
      console.log(isNaN(formData.phone));
      if (formData.phone.length === 11 && parseInt(formData.phone)){
        dispatch(signup(formData, navigate));
        console.log(formData);
      }
      else 
        alert("please input correct phone number")
      } 
     else {
      dispatch(signin(formData, navigate));
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };


  const googleFail = () => {
    alert('Could not log in with your Google account. Please try again later.');
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setFormData(initialState);
    setIsSignup((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  }

  const handleShowPassword = () => setShowPassword(!showPassword); // Toggling

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                <Input name="phone" label="phone" handleChange={handleChange} />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'password' : 'text'} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
            {isSignup && (
              <>
              <Typography component="h1" variant="body1">{"Upload a profile picture"}</Typography>
              <div className={classes.fileInput}></div>
              <FileBase type="file" multiple={false} onDone={({ base64 }) => setFormData({...formData, profile_pic: base64 })} />
              </>
            )}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          {!isSignup && (<GoogleLogin
            clientId="994062158876-f87p12lgb1ri0fa6ueq7unfjon6ej2qj.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button classNmae={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFail}
            cookiePolicy="single_host_origin"
          />)}
          <Grid container justify='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Sign in' : 'Sign up'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;