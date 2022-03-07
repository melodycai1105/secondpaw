import { Container, Grow, Grid } from '@material-ui/core';
import Posts from '../Posts/Posts';
import useStyles from './styles';

const Search = () => {
  const classes = useStyles();

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid style={{ marginTop: '30px' }} container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={10} fullWidth>
            <Posts />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
        </Grid>
      </Container>
    </Grow >
  );
}

export default Search;