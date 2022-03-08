import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import NumberFormat from 'react-number-format';

import { getUser, getReservationByUser, getPost } from '../../actions/posts';
import useStyles from './styles';

const Reservation = () => {
    const { id } = useParams();
    const { isLoading, user } = useSelector((state) => state.user);
    const { isLoadingPost, posts } = useSelector((state) => state.posts);
    // const userReservations = user?.purchased;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();

    const openPost = (_id) => navigate(`/posts/${_id}`);

    useEffect(() => {
      dispatch(getUser(id));
    }, [id]);

    useEffect(() => {
      dispatch(getReservationByUser(id));
    }, [id]);

    useEffect(() => {
      dispatch(getPost(id));
    }, [id]);

    // if (!userReservations) return null;

    if (isLoading || isLoadingPost) {
      return <Paper className={classes.loadingPaper} elevation={6}>
      <CircularProgress size='7em'/>
      </Paper>
    }

    // const reservedPosts = Array.isArray(posts) ? posts.data.filter(({ _id }) => userReservations.includes(_id)) : [];
    // const reservedPosts = Array.isArray(posts) ? posts.data.filter((el) => userReservations.includes(el._id)) : [];

    return (
      <Paper className={classes.paperContainer} elevation={6}>
        {!!!posts?.data?.length && (
          <Typography gutterBottom variant="h6">You haven't reserved anything! Go check it out:)</Typography>
        )}
        {!!posts?.data?.length && (
          <div className={classes.content}>
            <Typography gutterBottom variant="h5" style={{marginLeft: '20px', marginBottom: '20px'}}>Your Reservations: </Typography>
            <Grid className={classes.reservedPosts} container alignItems="stretch" spacing={3}>
              {posts?.data?.map(({ title, name, price, message, likes, selectedFile, _id }) => (
                <Grid key={_id} item>
                  <Paper className={classes.reservedPost} elevation={6} onClick={() => openPost(_id)} key={_id}>
                    <Typography gutterBottom variant="h6">{title}</Typography>
                    <Typography gutterBottom variant="subtitle2">{name}</Typography>
                    <Typography gutterBottom variant="subtitle2">
                      <NumberFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                    </Typography>
                    <Typography gutterBottom variant="subtitle2">{message}</Typography>
                    <Typography gutterBottom variant="subtitle1">Likes: {likes?.length}</Typography>
                    <div className={classes.imgContainer}><img src={selectedFile} alt='' width='230px' /></div>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </div>
        )}
      </Paper>
    );
};

export default Reservation;