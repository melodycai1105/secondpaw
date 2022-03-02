import React, { useEffect } from 'react';
import { Paper, Typography, Divider, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate, UNSAFE_NavigationContext } from 'react-router-dom';
 
import CommentSection from './CommentSection';
import { getPost, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles'; 

const PostDetails = () => {
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

  if (!post) return null;

  if (isLoading) {
    return <Paper className={classes.loadingPaper}elevation={6}>
      <CircularProgress size='7em' color="secondary" />
    </Paper>
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id).slice(0, 4);

  const openPost = (_id) => navigate(`/posts/${_id}`);

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Seller: {post.name}</Typography>
          <Typography variant="body1">
            {(moment(post.createdAt).isSame(moment(), 'day')) && (
                <strong>NEW!&nbsp;</strong>
              )}
            Created {moment(post.createdAt).fromNow()}
          </Typography>
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
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <Paper className={classes.recommendedPost} elevation={6} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img src={selectedFile} alt='' width='230px' />
              </Paper>
            ))}
          </div>
        </div>
      )}
  </Paper>
  );
};

export default PostDetails;