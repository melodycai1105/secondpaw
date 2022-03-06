import React, { useEffect } from 'react';
import { Paper, Typography, Divider, CircularProgress, Button, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";
import Rating from '@mui/material/Rating';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import Tooltip from '@mui/material/Tooltip';
import NumberFormat from 'react-number-format';

import { getUser, getPostsByUser } from '../../actions/posts';
import useStyles from './styles';

const UserPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { isLoading, user } = useSelector((state) => state.user);
    const { isLoadingPost, posts } = useSelector((state) => state.posts);
    const userPosts = posts.data;

    const navigate = useNavigate();
    const classes = useStyles();
    const openPost = (_id) => navigate(`/posts/${_id}`);

    useEffect(() => {
        dispatch(getUser(id));
      }, [id]);

    useEffect(() => {
        dispatch(getPostsByUser(id));
    }, [id]);

    if (!user) return null;

    if (isLoading || isLoadingPost) {
        return <Paper className={classes.loadingPaper}elevation={6}>
        <CircularProgress size='7em'/>
        </Paper>
   }

    return (
      <Paper className={classes.profilePaper} elevation={6}>
        <div className={classes.card}>
          <div className={classes.profileContent}>
            <div className={classes.profileImg}>
              <img className={classes.media} src="https://ci.xiaohongshu.com/e9214814-9bd7-c815-91a2-e8fe078918f5?imageView2/2/w/540/format/jpg"/>
            </div>
            <div className={classes.profileInfo}>
              <Typography variant="h3" >{user.name}</Typography>
              <Tooltip title="SEND AN EMAIL" placement="right" arrow>
                <Button onClick={() => window.open(`mailto:${user.email}?subject=SecondPaw`)} style={{cursor: 'pointer'}}>
                  <MailIcon color="primary"/>
                  <Typography variant="subtitle1" style={{marginLeft: '10px'}}>{user.email}</Typography>
                </Button>
              </Tooltip>
              <div disabled style={{margin: '5px 0 10px 10px'}}>
                <PhoneIcon color="secondary"/>
                <Typography variant="subtitle1" style={{marginLeft: '10px'}}>{user.phone}</Typography>
              </div>
              <div className={classes.rating}>
                <Typography variant="subtitle1"><strong>Rating:  </strong></Typography>
                <Rating value={5} readOnly />
              </div>
            </div>
          </div>
        </div>
          <Divider style={{ margin: '20px 0' }} />
          {!!userPosts?.length && (
            <div className={classes.section}>
              <Typography gutterBottom variant="h5" style={{marginLeft: '20px'}}>Your Posts: </Typography>
              <Grid className={classes.userPosts} container alignItems="stretch" spacing={1}>
                {userPosts.map(({ title, name, price, message, likes, selectedFile, _id }) => (
                  <Grid key={_id} item>
                    <Paper className={classes.userPost} elevation={6} onClick={() => openPost(_id)} key={_id}>
                      <Typography gutterBottom variant="h6">{title}</Typography>
                      <Typography gutterBottom variant="subtitle2">{name}</Typography>
                      <Typography gutterBottom variant="subtitle2">
                        <NumberFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                      </Typography>
                      <Typography gutterBottom variant="subtitle2">{message}</Typography>
                      <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                      <img src={selectedFile} alt='' width='230px' />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </div>
          )}
      </Paper>
    );
};

export default UserPage;