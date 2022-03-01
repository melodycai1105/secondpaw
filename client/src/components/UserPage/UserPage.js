import React, { useEffect } from 'react';
import { Paper, Typography, Divider, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";

import { getUser } from '../../actions/posts';

const UserPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const obj = useSelector((state) => state);

    console.log(obj)

    useEffect(() => {
        dispatch(getUser(id));
      }, [id]);

    console.log(id)
    return (
        <div>
            Hello
        </div>
    )
//   const { post, posts, isLoading } = useSelector((state) => state.posts);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const classes = useStyles();
//   const { id } = useParams();

//   useEffect(() => {
//     dispatch(getPost(id));
//   }, [id]);

//   useEffect(() => {
//     if (post) {
//       dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
//     }
//   }, [post]);

//   if (!post) return null;

//   if (isLoading) {
//     return <Paper className={classes.loadingPaper}elevation={6}>
//       <CircularProgress size='7em'/>
//     </Paper>
//   }

//   const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

//   const openPost = (_id) => navigate(`/posts/${_id}`);

//   return (
//     <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
//       <div className={classes.card}>
//         <div className={classes.section}>
//           <Typography variant="h3" component="h2">{post.title}</Typography>
//           <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
//           <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
//           <Typography variant="h6">Created by: {post.name}</Typography>
//           <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
//           <Divider style={{ margin: '20px 0' }} />
//           <CommentSection post={post} />
//           <Divider style={{ margin: '20px 0' }} />
//         </div>
//         <div className={classes.imageSection}>
//           <img className={classes.media} src={post.selectedFile} alt={post.title} />
//         </div>
//       </div>
//   </Paper>
//   );
};

export default UserPage;