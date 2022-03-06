import React from 'react';
import { Card, CardActions, CardContent, CardMedia, CardActionArea, Button, Typography } from '@material-ui/core';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import default_bruin from '../../images/secondpaw.png'
import NumberFormat from 'react-number-format';

import { getPost, likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles'

const Post = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));

  const Likes = () => {
    if (post?.likes?.length > 0) {
      return post.likes.find((like) => like === (user?.result?._id || user?.result?.googleId))
        ? (
          <div style={{color: '#ff6d75'}}><Favorite style={{color: '#ff6d75'}} fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</div>
        ) : (
          <div><FavoriteBorder fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</div>
        );
    }

    return <div><FavoriteBorder fontSize="small" />&nbsp;Like</div>;
  };

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <CardActionArea className={classes.cardAction} onClick={openPost}>
        <CardMedia className={classes.media} image={post.selectedFile || default_bruin} title={post.title} />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <div className={classes.overlay2} name="edit">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/editpost/${post._id}`);
              }}
              style={{ color: 'white' }}
              size="small"
            >
              <MoreVertIcon fontSize="medium" />
            </Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <Typography style={{padding: '0 16px'}} variant="h6">{post.title}</Typography>
        <Typography style={{padding: '0 16px'}} variant="subtitle1" gutterBottom>
          <NumberFormat value={post.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{post.message.split(' ').splice(0, 20).join(' ')}...</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
          <Likes />
        </Button>
        {(user?.result?._id === post?.creator || user?.result?.googleId === post?.creator) && (
          <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id, user?.result?._id))}>
            <DeleteIcon fontSize="small" />
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
export default Post;