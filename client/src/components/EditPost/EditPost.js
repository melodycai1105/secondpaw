import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
  });
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (post)
      setPostData(post);
  }, [post]) // when post changes, set the post data to be the editted data 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(currentId)
    if (currentId) {
      dispatch(updatePost(currentId, postData));
    }else{
      dispatch(createPost(postData));
    }
    clear();
  }

  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator: '',
      title: '',
      tags: '',
      message: '',
      selectedFile: ''
    })
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={'${classes.root} ${classes.form}'} onSubmit={handleSubmit}>
        <Typography height="100%" margin="0" align="center" variant="h6">{currentId ? 'Editing': 'Creating'} a Sell</Typography>
        <TextField name="creator" variant="outlined" label="Creator" margin="dense" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
        <TextField name="title" variant="outlined" label="Title" margin="dense" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" margin="dense" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags" margin="dense" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
          <div class="flex justify-center items-center space-x-6">
            <Button className={classes.buttonSubmit} onClick={handleSubmit} variant="contained" type="submit" size="large" class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" >
              Submit
            </Button>
            <Button variant="contained" size="small" onClick={clear} type="clear" class="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-5 border-b-4 border-red-700 hover:border-red-500 rounded" >
              Clear
            </Button>
          </div>
        </div>
      </form>
    </Paper>
  );
}

export default Form;