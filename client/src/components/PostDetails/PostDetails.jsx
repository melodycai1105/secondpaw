import React, { useEffect, useState } from 'react';
import { Chip, Avatar, Paper, Typography, Divider, CircularProgress, Grid, Button } from '@material-ui/core';
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
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import default_bruin from '../images/secondpaw.png';
import default_profile_pic from '../images/bruin_logo.jpeg';
import Zoom from 'react-img-zoom';

import CommentSection from './CommentSection';
import { getPost, getPostsBySearch, makePurchase } from '../../actions/posts';
import useStyles from './styles';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TagIcon from '@mui/icons-material/Tag';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import { getUser, updateRating } from '../../actions/posts';

const PostDetails = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const postCreator = useSelector((state) => state.user.user);
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();
  const [reserved, setReserved] = useState(false);
  const [rateVal, setRate] = useState(0);
  console.log(post?.rating);

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post?.creator){
        dispatch(getUser(post?.creator));
    }
  }, [post?.creator]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }
  }, [post]);

  useEffect(() => {
    if (rateVal){
      dispatch(updateRating(id, rateVal));
    }
  }, [rateVal])

  const userId = user?.result?._id || user?.result?.googleId;
  // const hasReserved = user?.result?.purchased?.find((purchased) => purchased === post._id);
  const hasReserved = post?.buyer;

  const handleReserve = () => {
    setReserved(true);
    dispatch(makePurchase(userId, id));
  }

  const Reservation = () => {
    return (hasReserved)
      ? (
        <Button disabled><BookmarkIcon fontSize='large' />Reserved</Button>
      ) : (
        <Button color='primary' disabled={reserved} onClick={handleReserve}><BookmarkBorderIcon fontSize='large' />Reserve</Button>
      );
  };

  if (!post) return null;

  if (isLoading) {
    return <Paper className={classes.loadingPaper} elevation={6}>
      <CircularProgress size='7em' color="secondary" />
    </Paper>
  }

  const toUser = () => {
    navigate(`/user/${post.creator}`)
  }

  // const toTag = (tags) => {
  //   var search = '';
  //   if (search.trim() || tags){
  //     dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
  //     navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
  //   }else{
  //     navigate('/');
  //   }
  // }

  const toTag = (tags) => {
    var search = '';
    if (search.trim() || tags){
      dispatch(getPostsBySearch({ search, tags }));
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags}`);
    }else{
      navigate('/');
    }
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
        <div className={classes.imageContainer}>
          <Zoom className={classes.media} img={post.selectedFile || default_bruin}
            zoomScale={2.5} width={500} height={500} />
        </div>
        <div className={classes.section}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography gutterBottom variant="h4" component="h2">{post.title}</Typography>
            {user?.result?.name && (
              <Reservation />
            ) || (
                <Button disabled><BookmarkBorderIcon fontSize='large' />Login to Reserve</Button>
              )}
          </div>
          <div className={classes.ratingContainer}>
            {(user?.result?._id === post.buyer && user?.result?.name !== null) && (
              <div style={{ display: 'flex', flexDirection: 'row', }}>
                <Rating value={post?.rating} IconContainerComponent={IconContainer} onClick={(e) => setRate(e.target.value)} highlightSelectedOnly />
                <Typography gutterBottom variant="subtitle1" >&nbsp;&nbsp;</Typography>
              </div>
            ) || (
                <div>
                  <Rating value={post?.rating} IconContainerComponent={IconContainer} readOnly />
                  <Typography gutterBottom variant="subtitle1" style={{ fontSize: 10 }}>You need to purchase the item to rate</Typography>
                </div>
              )}
          </div>
          <Typography className={classes.createDate} gutterBottom variant="body1">
            {(moment(post.createdAt).isSame(moment(), 'day')) && (
              <strong style={{ color: 'red' }}><LocalFireDepartmentIcon style={{ color: 'red', paddingBottom: '5px' }} />NEW&nbsp;&nbsp;</strong>
            )}
            Created {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: '10px 0' }} />
          <div style={{ display: 'flex', margin: '0px 0px -15px 0px' }}>
            <Typography gutterBottom variant="subtitle1" component="p" style={{ margin: '2px 0px 0px 0px' }}>Price:</Typography>
            <Typography variant="h6" gutterBottom>
              <NumberFormat value={post.price} style={{ color: '#dc143c', margin: '0px 0px 0px 5px', fontSize: 25 }} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </Typography>
          </div>
          <div style={{ display: 'flex', margin: '15px 0px 0px 0px' }}>
            <Typography gutterBottom variant="subtitle1" style={{ margin: '5px 0px 0px 0px' }}>Seller:</Typography>
            <Chip color='secondary' avatar={<Avatar src={postCreator?.profile_pic || default_profile_pic} />}
              // <img className={classes.media} src={user.profile_pic || default_profile_pic} />
              label={post.name} onClick={toUser} style={{ margin: '5px 0px 0px 5px' }}>
            </Chip>
          </div>
          <Typography gutterBottom variant="subtitle1" component="p" style={{ margin: '15px 0px 15px 0px' }}>Descriptions: {post.message}</Typography>
          {/* <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography> */}
            {post.tags?.map((tag) => (
              <Chip icon={<AutoAwesomeIcon style={{ color: '#6a5acd'}} />} onClick={() => toTag(tag)} 
              style={{ fontSize: 12, color: '#6a5acd' }} gutterBottom variant="h6" size="medium" component="h2" 
              label={tag}>
              </Chip>
            ))}
            {/* <Chip icon={<AutoAwesomeIcon style={{ color: '#6a5acd' }} />} onClick={() => toTag(post.tags)} 
              style={{ fontSize: 12, color: '#6a5acd' }} gutterBottom variant="h6" size="medium" component="h2" 
              label={post.tags.map((tag) => `${tag} `)}>
            </Chip> */}
          <Divider style={{ margin: '10px 0' }} />
          <CommentSection post={post} />
        </div>
      </div>
      {
        !!recommendedPosts.length && (
          <div>
            <Divider style={{ margin: '20px 0' }} />
            <div className={classes.section} style={{ display: 'flex'}}>
              <AddReactionIcon style={{ color: '#6a5acd' }} />
              <Typography gutterBottom variant="h5" style={{ fontSize: 18, margin: "5px 0px 0px 10px", color: '#6a5acd' }}>You May Also Like:</Typography>
            </div>
            <Grid className={classes.recommendedPosts} container alignItems="stretch" spacing={1} style={{marginBottom:"50px"}}>
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
                    <div className={classes.imgContainer}><img src={selectedFile} alt='' width='230px' /></div>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </div>
        )
      }
    </Paper >
  );
};

export default PostDetails;