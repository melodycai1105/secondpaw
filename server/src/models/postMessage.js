import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  name: String,
  price: String, 
  tags: [String],
  selectedFile: String,
  boughtBy: String, 
  likes: {
    type: [String],
    default: [],
  },
  comments: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  rating: {
    
  }
}); // each post have to have these things

const PostMessage = mongoose.model('PostMessage', postSchema);
export default PostMessage;