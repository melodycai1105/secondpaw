import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Container, Input } from '@material-ui/core';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { useNavigate, useParams } from "react-router-dom";
import ChipInput from 'material-ui-chip-input';
import NumberFormat from "react-number-format";

const EditPost = () => {
  const [postData, setPostData] = useState({ title: '', message: '', tags: [], selectedFile: '' });
  const { id } = useParams();
  const currentId = id
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useNavigate();

  const clear = () => {
    setPostData({ title: '', message: '', tags: [], selectedFile: '', price: '' });
  };

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentId) {
      dispatch(createPost({ ...postData, name: user?.result?.name, price: postData.price }, history));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
      history(`/posts/${currentId}`)
    }
    clear();
    //routeChange();
  }

  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <form autoComplete="off" noValidate className={'${classes.root} ${classes.form}'} onSubmit={handleSubmit}>
          <Typography height="100%" margin="0" align="center" variant="h6">{currentId ? 'Editing' : 'Creating'} a Sell</Typography>
          <TextField name="title" variant="outlined" label="Title" margin="dense" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
          <NumberFormat
            customInput={TextField} 
            name="price" variant="outlined" label="Price" margin="dense" fullWidth value={postData.price}
            displayType='input' prefix={'$'} thousandSeparator={true} decimalSeparator='.' allowNegative={false} allowLeadingZeros={false} decimalScale={2}
            onValueChange={(values) => {  
              const { floatValue } = values;
              setPostData({ ...postData, price: floatValue });
            }} />
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
              <Button className={classes.buttonSubmit} onClick={handleSubmit} variant="contained" type="submit" size="large" class="button-55" >
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
};

export default EditPost;