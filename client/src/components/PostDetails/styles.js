import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  loadingPaper: {
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
  section: {
    borderRaduis: '20px',
    margin: '20px',
    flex: 1,
  },
  imageContainer: {
    borderRadius: '20px',
    margin: '20px 20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
    cursor: 'zoom-in',
  }, 
  media: {
    objectFit: 'cover',
    maxHeight: '500px',
    maxWidth: '500px',
  },
  createDate: {
    flexDirection: 'row', 
    fontSize: 14, 
    color: '#dc143c', 
    fontWeight: 'bold',
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
    justifyContent: 'center',
  },
  recommendedPost: {
    padding: '10px', 
    margin: '15px', 
    cursor: 'pointer', 
    width: '250px',
    height: '100%',
  },
  imgContainer: {
    maxHeight: '180px',
    overflow: 'hidden',
  },
}));