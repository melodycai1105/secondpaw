import React from 'react';
import Post from './Post/Post';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import useStyles from './styles';

const Posts = () => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();
  
  if (!posts.length && !isLoading) return 'No posts';

  return (
<<<<<<< HEAD
    isLoading ? <CircularProgress size='7em' color="grey" /> : (
=======
    isLoading ? <CircularProgress size='6em' color="secondary" /> : (
>>>>>>> master
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