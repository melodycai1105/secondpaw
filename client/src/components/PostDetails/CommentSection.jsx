import React, { useState, useRef } from 'react';
import { Typography, TextField, Button, Divider } from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import CommentIcon from '@mui/icons-material/Comment';

import { commentPost } from '../../actions/posts';
import useStyles from './styles';

const CommentSection = ({post}) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(post?.comments);
    const dispatch = useDispatch();
    const classes = useStyles();
    const commentsRef = useRef();
  
    const handleClick = async () => {
      const latestComment = `${user.result.name}: ${comment}`;
      const newComments = await dispatch(commentPost(latestComment, post._id));

      setComment('');
      setComments(newComments);

    //   commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className={classes.commentsOuterContainer}>
            <div className={classes.commentsInnerContainer}>
                <Typography gutterBottom variant="h6" style={{fontSize:16, margin:'0px 0px 15px 0px'}}>{comments.length} Reviews</Typography>
                {comments?.map((c, i) => (
                    <Typography key={i} gutterBottom variant="subtitle1">
                        <strong>{c.split(': ')[0]}</strong>
                        {c.split(':')[1]}
                    </Typography>
                ))}
                {!comments.length && (
                    <Typography gutterBottom variant="subtitle1" style={{fontSize:13}}>Be the first to write a review for this product!</Typography>
                )}
                <div ref={commentsRef} />
            </div>
            <div className={classes.section} style={{margin:'20px 0px 0px 0px'}}>
            {user?.result?.name && (
                <div>
                    <Typography gutterBottom variant="h6" style={{fontSize:16}}><CommentIcon />&nbsp;Write a review</Typography>
                    <TextField style={{ maxWidth: '600px' }} fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
                    <br />
                    <Button style={{ marginTop: '10px', maxWidth: '600px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleClick}>
                        COMMENT
                    </Button>
                </div>
            ) || (
                <Typography gutterBottom variant="subtitle1" style={{fontSize:10}}>You are logged out. Login to write a review.</Typography>
            )}</div>
        </div>
    );
}

export default CommentSection;