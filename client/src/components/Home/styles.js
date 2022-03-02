import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
    marginBottom: '3rem',
    justifyContent: 'center'
  },
}));