import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  profilePaper: {
    padding: '20px', 
    borderRadius: '15px', 
  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  profileContent: {
    display:"flex",
    margin:"0px 25px",
    padding: '20px',
  },
  profileInfo: {
    margin: "30px 10px 10px 45px",
    display: 'flex',
    flexDirection: 'column',
  },
  media: {
    width: '160px', 
    height: '160px', 
    borderRadius: '100px',
  },
  userPosts: {
    margin: '10px 10px',
  },
  rating: {
    display: 'flex',
    flexDirection: 'row',
  },
  userPosts: {
    display: 'flex',
  },
  userPost: {
    padding: '10px', 
    margin: '15px', 
    cursor: 'pointer', 
    width: '250px',
  },
}));