import React from 'react';
import Form from './components/Form/Form.js';
import Posts from './components/Posts/Posts.js';
import { Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';

const App = () => {
  return ( 
    <Container maxWidth="lg">
      <AppBar position="static" color="inherit">
        <Typography variant='h2' align="center">
          Second Paw
        </Typography>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacein={3}>
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={7}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;