import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost, updatePost } from '../../actions/posts';
import ChipInput from 'material-ui-chip-input';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: [],
    selectedFile: ''
  });
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'))
  const navigate = useNavigate();

  useEffect(() => {
    // if (!post?.title)
    //   clear();
    if (post)
      setPostData(post);
  }, [post]);// when post changes, set the post data to be the editted data 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId !== 0) {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      // <Paper className={classes.paper}>
      //   <Typography variant='h6' align='center'>
      //     Please sign in to create post
      //   </Typography>
      // </Paper>
      null
    )
  }

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: '',
      tags: [],
      message: '',
      selectedFile: ''
    })
  };

  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (tagToDelete) => {
    setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== tagToDelete) });
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={'${classes.root} ${classes.form}'} onSubmit={handleSubmit}>
        <Typography height="100%" margin="0" align="center" variant="h6">{currentId ? `Editing "${post?.title}"` : 'Creating a Sell'}</Typography>
        <TextField name="title" variant="outlined" label="Title" margin="dense" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" margin="dense" fullWidth multiline rows={4}  value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <div style={{ padding: '5px 0', width: '94%' }}>
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
        <div className={classes.fileInput}></div>
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
          <div class="flex justify-center items-center space-x-6">
            <Button className={classes.buttonSubmit} onClick={handleSubmit} variant="contained" type="submit" size="large" class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" >
              Submit
            </Button>
            <Button variant="contained" size="small" onClick={clear} type="clear" class="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-5 border-b-4 border-red-700 hover:border-red-500 rounded" >
              Clear
            </Button>
        </div>
      </form>
    </Paper>
  );
}

export default Form;
