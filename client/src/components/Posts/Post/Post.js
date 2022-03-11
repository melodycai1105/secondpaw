import React, { useState } from 'react';
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

import { likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles'

const Post = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(post?.likes);

  const userId = user?.result?._id || user?.result?.googleId;
  const hasLikedPost = post.likes.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([ ...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <div style={{color: '#ff6d75'}}><Favorite style={{color: '#ff6d75'}} fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</div>
        ) : (
          <div><FavoriteBorder fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</div>
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
          <Typography variant="h6" style={{fontSize:16}}>{post.name}</Typography>
          <Typography variant="body2" style={{fontSize:10}}>{moment(post.createdAt).fromNow()}</Typography>
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
        <Typography style={{padding: '0 16px',fontSize:20}} variant="h6">{post.title}</Typography>
        <Typography style={{padding: '0 16px', color:'#C71585', fontSize: 24, marginBottom:'-3px'}} variant="subtitle1" gutterBottom>
          <strong>
          {(post.price === 0) && (<Typography style={{ color: '#dc143c', padding: '0 0px'}} >Discuss in Person  </Typography>) 
          || <NumberFormat value={post.price} style={{margin:'0px 0px 0px 0px'}} displayType={'text'} thousandSeparator={true} prefix={'$'} />
          }
          </strong>
        </Typography>
        <CardContent style={{marginTop:'-7px',marginBottom:'-7px'}}>
          <Typography variant="body2" color="textSecondary" component="p">{post.message.split(' ').splice(0, 20).join(' ')}...</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
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