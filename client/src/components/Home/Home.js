import React, { useEffect, useState } from 'react';
import { Container, Grow, Grid, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Posts from '../Posts/Posts';
// import Form from '../Form/Form';
import Pagination from '../Pagination';
import Sort from '../Sort'
import useStyles from './styles';
import Trending from '../images/Trending5.svg';
import NewestArrivals from '../images/NewestArrivals.svg';
import Price from '../images/Price3.svg';
import HotDeal from '../images/fire.png';
import New from '../images/new2.png';
import Tag from '../images/tag.png';
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
    "Sort By Time",
    "Sort By Price",
  ]
  const [sortType, setSortType] = useState(options[0]);
  var display = false;
  var display2 = false;
  var display3 = false;

  if (sortType === options[0]) {
    display = true;
    display2 = false;
    display3 = false;
  } 
  else if (sortType === options[1])
  {
    display = false;
    display2 = true;
    display3 = false;
  }
  else{
    display = false;
    display2 = false;
    display3 = true;
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
              <img src={HotDeal} style={{ margin : "-25px 0px 0px 170px"}} alt="Hot Icon" align="left" width="50px" height="50px" />
              <img src={Trending} alt="Trending Logo" align="left" width="250px" height="400px" 
              style={{ margin : "0px 0px 0px -240px"}}/>
              {/* <img src={Trending} alt="Trending Logo" align="left" width="250px" height="400px" /> */}
              {/* <img src={HotDeal} style={{ marginTop: '-20px', marginLeft: '-60px'}} alt="Hot Icon" align="left" width="50px" height="50px" /> */}
            </>
          )}
          {display2 && (
            <>
              <img src={NewestArrivals} alt="Trending Logo" align="left" width="350px" height="400px" 
              style={{margin : "10px 0px 0px -30px"}} />
              <img src={New} style={{margin: "10px 0px 0px -40px"}} alt="Hot Icon" align="left" width="50px" height="50px" />
            </>
          )}
          {display3 && (
            <>
              <img src={Price} alt="Trending Logo" align="left" width="350px" height="400px" 
              style={{margin : "10px 0px 0px -30px"}} />
              <img src={Tag} style={{margin: "10px 0px 0px -35px"}} alt="Hot Icon" align="left" width="50px" height="50px" />
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