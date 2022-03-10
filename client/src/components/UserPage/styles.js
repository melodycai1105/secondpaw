import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  loadingPaper: {
    borderRadius: '15px',
  },
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
  contactInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  rating: {
    display: 'flex',
    flexDirection: 'row',
  },
  userPosts: {
    display: 'flex',
    justifyContent: 'center',
  },
  userPost: {
    padding: '10px', 
    cursor: 'pointer', 
    width: '250px',
    height: '100%',
  },
  imgContainer: {
    maxHeight: '200px',
    overflow: 'hidden',
  },
}));