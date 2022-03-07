import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '50px',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    marginLeft: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
    marginBottom: '3rem',
    justifyContent: 'center'
  },
  sort:{
    marginTop: '10px',
    marginLeft: '20px',
  }
}));