import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Container } from '@material-ui/core';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { useNavigate } from "react-router-dom";
import ChipInput from 'material-ui-chip-input';

const EditPost = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: [],
    selectedFile: ''
  });
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'))
  const navigate = useNavigate();


  const clear = () => {
    setCurrentId(0);
    setPostData({
      creator: '',
      title: '',
      tags: [],
      message: '',
      selectedFile: ''
    })
  }

  useEffect(() => {
    if (post)
      setPostData(post);
  }, [post]) // when post changes, set the post data to be the editted data 

  //   let navigate = useNavigate();
  //   const routeChange = () =>{ 
  //     let path = '/posts'; 
  //     navigate(path);
  //   }

  const handleSubmit2 = async (e) => {
    e.preventDefault();

    console.log(currentId)
    if (currentId) {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
      clear();
    }
    clear();
    //routeChange();
  }

  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (tagToDelete) => {
    setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== tagToDelete) });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <form autoComplete="off" noValidate className={'${classes.root} ${classes.form}'} onSubmit={handleSubmit2}>
          <Typography height="100%" margin="0" align="center" variant="h6">{currentId ? 'Editing' : 'Creating'} a Sell</Typography>
          {/* <TextField name="creator" variant="outlined" label="Creator" margin="dense" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} /> */}
          <TextField name="title" variant="outlined" label="Title" margin="dense" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
          <TextField name="message" variant="outlined" label="Message" margin="dense" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
          <div style={{ padding: '5px 0', width: '100%' }}>
            <ChipInput
              name="tags"
              variant="outlined"
              label="Tags"
              fullWidth
              value={postData.tags}
              onAdd={(tag) => handleAddChip(tag)}
              onDelete={(tag) => handleDeleteChip(tag)}
            />
          </div>
          <div className={classes.fileInput}>
            <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
            <div class="flex justify-center items-center space-x-6">
              <Button className={classes.buttonSubmit} onClick={handleSubmit2} variant="contained" type="submit" size="large" class="button-55" >
                Submit
              </Button>
              <Button variant="contained" size="small" onClick={clear} type="clear" class="button-55" >
                Clear
              </Button>
            </div>
          </div>
        </form>
      </Paper>
    </Container>
  );
}

export default EditPost;