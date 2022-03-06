import React, { useEffect, useState } from 'react';
import { Paper, Typography, Divider, CircularProgress, Grid, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate, UNSAFE_NavigationContext } from 'react-router-dom';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import PropTypes from 'prop-types';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import NumberFormat from 'react-number-format';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import CommentSection from './CommentSection';
import { getPost, getPostsBySearch, makePurchase } from '../../actions/posts';
import useStyles from './styles'; 

const PostDetails = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }
  }, [post]);

  const userId = user?.result?._id || user?.result?.googleId;
  // const hasReserved = user?.result?.purchased?.find((purchased) => purchased === post._id);
  const hasReserved = post?.buyer === userId;

  const handleReserve = () => {
    dispatch(makePurchase(userId, id));
  }

  const Reservation = () => {
    return (hasReserved)
    ? (
      <Button disabled><BookmarkIcon fontSize='large' />Reserved</Button>
    ) : (
      <Button color='primary' onClick={handleReserve}><BookmarkBorderIcon fontSize='large' />Reserve</Button>
    );
  };

  if (!post) return null;

  if (isLoading) {
    return <Paper className={classes.loadingPaper} elevation={6}>
      <CircularProgress size='6em' color="secondary" />
    </Paper>
  }

  const toUser = () => {
      navigate(`/user/${post.creator}`)
  }
  const openPost = (_id) => navigate(`/posts/${_id}`);

  const recommendedPosts = Array.isArray(posts) ? posts.filter(({ _id }) => _id !== post._id) : [];

  const customIcons = {
    1: { icon: <SentimentVeryDissatisfiedIcon />, label: 'Very Dissatisfied', },
    2: { icon: <SentimentDissatisfiedIcon />, label: 'Dissatisfied', },
    3: { icon: <SentimentSatisfiedIcon />, label: 'Neutral', },
    4: { icon: <SentimentSatisfiedAltIcon />, label: 'Satisfied', },
    5: { icon: <SentimentVerySatisfiedIcon />, label: 'Very Satisfied', },
  };

  const IconContainer = (props) => {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

  IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
  };

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <Typography gutterBottom variant="h4" component="h2">{post.title}</Typography>
            {user?.result?.name && (
              <Reservation />
            ) || (
              <Button disabled><BookmarkBorderIcon fontSize='large' />Login to Reserve</Button>
            )}
          </div>
          <Typography variant="h6" gutterBottom>
            <NumberFormat value={post.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
          </Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="subtitle1" component="p">{post.message}</Typography>
          <Typography gutterBottom variant="h6" onClick={toUser}>Seller: {post.name}</Typography>
          <Typography gutterBottom variant="body1" style={{display: 'flex', flexDirection: 'row'}}>
            {(moment(post.createdAt).isSame(moment(), 'day')) && (
                <strong><NewReleasesIcon style={{paddingBottom: '5px'}} />NEW&nbsp;&nbsp;</strong>
              )}
            Created {moment(post.createdAt).fromNow()}
          </Typography>
          <div className={classes.ratingContainer} style={{marginTop: '10px'}}>
            {user?.result?.name && (
              <div style={{display: 'flex', flexDirection: 'row',}}>
                <Rating defaultValue={2} IconContainerComponent={IconContainer} highlightSelectedOnly/>
                <Typography gutterBottom variant="subtitle1" >&nbsp;&nbsp;from 0 customers</Typography>
              </div>
            ) || (
              <div>
                <Rating defaultValue={2} IconContainerComponent={IconContainer} readOnly/>
                <Typography gutterBottom variant="subtitle1">You are logged out. Login to rate.</Typography>
              </div>
            )}
          </div>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile} alt='' />
        </div>
      </div>
      {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You May Also Like</Typography>
          <Grid className={classes.recommendedPosts} container alignItems="stretch" spacing={1}>
            {recommendedPosts.map(({ title, name, price, message, likes, selectedFile, _id }) => (
              <Grid key={_id} item>
                <Paper className={classes.recommendedPost} elevation={6} onClick={() => openPost(_id)} key={_id}>
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

export default PostDetails;