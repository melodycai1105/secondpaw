import React, { useEffect, useState } from 'react';
import { Container, Grow, Grid, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Posts from '../Posts/Posts';
// import Form from '../Form/Form';
import Pagination from '../Pagination';
import Sort from '../Sort'
import useStyles from './styles';
import Trending from '../images/Trending.svg';
import HotDeal from '../images/hot-deal.png';
import { getPosts } from '../../actions/posts';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const query = useQuery();
  const page = query.get('page') || 1;
  const classes = useStyles();
  const dispatch = useDispatch();
  const options = [
    "Sort By Popularity",
    "Sort By Date",
    "Sort By Price",
  ]
  const [sortType, setSortType] = useState(options[0]);
  var display = false;

  if (sortType === options[0]) {
    display = true;
  } else {
    display = false;
  }

  useEffect(() => {
    if (page) {
      dispatch(getPosts(page, sortType)); 
    }
  }, [dispatch, sortType])

  function onChangeSortType(value) {
    setSortType(value);
  };
  
  return (
    <Grow in>
      <Container maxWidth="xl">
        <div className={classes.header}>
          {display && (
            <>
              <img src={Trending} alt="Trending Logo" align="left" width="300px" height="400px" />
              <img src={HotDeal} style={{ marginTop: '20px', marginLeft: '-20px'}} alt="Hot Icon" align="left" width="70px" height="70px" />
            </>
          )}
          <div className={classes.pagination}>
            <Pagination page={page} sortType={sortType} />
          </div>
          <div className={classes.sort}>
            <Sort selected={sortType} options={options} onChange={onChangeSortType} />
          </div>
        </div>
        <Grid style={{ marginTop: '30px' }} container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={10} fullWidth>
            <Posts />
          </Grid>
        </Grid>
        {/* <Grid item xs={12} sm={6} md={3}>
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </Grid> */}
      </Container>
    </Grow >
  );
}

export default Home;