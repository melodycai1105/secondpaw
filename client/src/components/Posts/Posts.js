import React from 'react';
import Post from './Post/Post';
import { Grid, CircularProgress, Typography, Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';
import useStyles from './styles';

const Posts = () => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();
  
  if (!posts.length && !isLoading) return (
    <Paper style={{padding: '10px 20px'}}> 
      <Typography gutterBottom variant="h6">NO POSTS FOUND</Typography>
    </Paper>
  );

  return (
    isLoading ? <CircularProgress size='6em' color="secondary" /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts?.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;