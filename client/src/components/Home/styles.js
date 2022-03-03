import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
<<<<<<< HEAD
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
=======
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    marginLeft: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
>>>>>>> master
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
    marginBottom: '3rem',
    justifyContent: 'center'
  },
}));