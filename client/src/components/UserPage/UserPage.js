import React, { useEffect } from 'react';
import { Paper, Typography, Divider, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";

import { getUser, getPostsByUser } from '../../actions/posts';
import useStyles from './styles';

const UserPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { isLoading, user } = useSelector((state) => state.user);
    const { isLoadingPost, posts } = useSelector((state) => state.posts);
    const userPosts = posts.data;

    const navigate = useNavigate();
    const classes = useStyles();
    const openPost = (_id) => navigate(`/posts/${_id}`);
    //const userPosts = posts.filter(({ _id }) => _id !== post._id).slice(0, 4);

    useEffect(() => {
        dispatch(getUser(id));
      }, [id]);

    useEffect(() => {
        dispatch(getPostsByUser(id));
    }, [id]);

    
    if (!user) return null;


    if (isLoading || isLoadingPost) {
        return <Paper className={classes.loadingPaper}elevation={6}>
        <CircularProgress size='7em'/>
        </Paper>
   }

    return (
      <Paper style={{ padding: '20px', borderRadius: '15px', maxWidth:"550px", margin: "0px auto"}} elevation={6}>
        <div>
          <div style={{
            display:"flex",
            // justifyContent:"space-around",
            margin:"0px 25px",
            padding: '20px',
            // borderRadius: '15px',
            borderBottom: "1px solid grey"
          }}>
            <div>
              <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                src="https://ci.xiaohongshu.com/e9214814-9bd7-c815-91a2-e8fe078918f5?imageView2/2/w/540/format/jpg"
              />
            </div>
            <div style={{
              margin:"30px 10px 10px 45px"
            }}>
              <Typography variant="h3" style={{margin:"0px 0px 10px 0px"}}>{user.name}</Typography>
              <div style={{}}>
                {/* <Typography variant="h7">{user.phone}</Typography> */}
                <Typography variant="h7">{user.email}</Typography>
              </div>
              <div>
                <Typography variant="h7">`rating: 5`</Typography>
              </div>
            </div>
          </div>

            {!!userPosts?.length && (
        <div className={classes.section}>
          {/* <Typography gutterBottom variant="h6" style={{
            display:"flex",
            // justifyContent:"space-around",
            margin:"10px 25px"
          }}>Other posts by {user.name}</Typography> */}
          <div className={classes.recommendedPosts} style={{
            // display:"flex",
            // justifyContent:"space-around",
            margin:"10px 10px"
          }}>
            {userPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <Paper className={classes.recommendedPost} elevation={6} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                {/* <Typography gutterBottom variant="subtitle2">{name}</Typography> */}
                {/* <Typography gutterBottom variant="subtitle2">{message}</Typography> */}
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img src={selectedFile} alt='' width='230px' />
              </Paper>
            ))}
          </div>
        </div>
      )}
        </div>
        </Paper>

    );


//   const { post, posts, isLoading } = useSelector((state) => state.posts);
//   const dispatch = useDispatch();
//            <img className={classes.media} src={post.selectedFile} alt={user.name} />

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