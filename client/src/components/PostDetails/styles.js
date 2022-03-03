import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
<<<<<<< HEAD
    maxHeight: '600px',
=======
    maxHeight: '800px',
    maxWidth: '600px',
    cursor: 'zoom-in',
>>>>>>> master
  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRaduis: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  }, 
  commentsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    width: '100%',
  },
  commentsInnerContainer: {
    height: '100%',
    overflowY: 'auto',
    marginRight: '20px',
  },
  recommendedPosts: {
    display: 'flex',
  },
  recommendedPost: {
    padding: '10px', 
    margin: '15px', 
    cursor: 'pointer', 
    width: '250px',
  },
}));