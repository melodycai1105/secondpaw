import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  profilePaper: {
    padding: '20px', 
    borderRadius: '15px', 
  },
  card: {
    width: '100%',
    display:"flex",
    justifyContent: 'center',
    // [theme.breakpoints.down('sm')]: {
    //   flexWrap: 'wrap',
    //   flexDirection: 'column',
    // },
  },
  profileContent: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'row',
  },
  profileInfo: {
    marginLeft: '50px',
    display: 'flex',
    flexDirection: 'column',
  },
  media: {
    width: '160px', 
    height: '160px', 
    borderRadius: '100px',
  },
  rating: {
    display: 'flex',
    flexDirection: 'row',
  },
  userPosts: {
    display: 'flex',
    margin: '10px 10px',
  },
  userPost: {
    padding: '10px', 
    margin: '15px', 
    cursor: 'pointer', 
    width: '250px',
  },
}));