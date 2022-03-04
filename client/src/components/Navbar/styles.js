import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  // appBarSearch: {
  //   borderRadius: 4,
  //   marginBottom: '1rem',
  //   display: 'flex',
  //   padding: '16px',
  // },
  appBar: {
    background: 'transparent',
    boxShadow: 'none',
    borderRadius: 15,
    margin: '10px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0px',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  searchBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  menu: {
    marginTop: '20px',
    background: 'transparent',
  },
  menuList: {
    background: 'transparent',
  },
}));