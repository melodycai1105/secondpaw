import React, { useEffect } from 'react';
import { Paper, Typography, Divider, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";

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
    // const userPosts = posts.filter(({ _id }) => _id !== post._id).slice(0, 4);

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
              <Typography variant="h3">{user.name}</Typography>
              <Typography variant="h7"><strong>Phone: </strong>{user.phone}</Typography>
              <Typography variant="h7"><strong>Email: </strong>{user.email}</Typography>
              <div className={classes.rating}>
                <Typography variant="h7">`rating: 5`</Typography>
              </div>
            </div>
          </div>
          <Divider style={{ margin: '20px 0' }} />
          {!!userPosts?.length && (
            <div className={classes.section}>
              <Typography gutterBottom variant="h5">Your Posts: </Typography>
              {userPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
                <Paper className={classes.userPosts} elevation={6} onClick={() => openPost(_id)} key={_id}>
                  <Typography gutterBottom variant="h6">{title}</Typography>
                  <Typography gutterBottom variant="subtitle2">{name}</Typography>
                  <Typography gutterBottom variant="subtitle2">{message}</Typography>
                  <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                  <img src={selectedFile} alt='' width='230px' />
                </Paper>
              ))}
            </div>
          )}
        </div>
      </Paper>
    );
};

export default UserPage;