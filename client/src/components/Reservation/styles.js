import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  loadingPaper: {
    borderRadius: '15px',
  },
  paperContainer: {
    padding: '20px', 
    borderRadius: '15px', 
  },
  reservedPosts: {
    display: 'flex',
    justifyContent: 'center',
  },
  reservedPost: {
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