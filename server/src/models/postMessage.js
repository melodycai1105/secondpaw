import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  name: String,
  tags: [String],
  selectedFile: String,
  likes: { type: [String], default: [] },
  price: { type: Number, default: -1 },
  rating: { type: Number, default: null } ,
  buyer: { type: String, default: null },
  comments: { type: [String], default: [] },
  createdAt: { type: Date, default: new Date() },
}); // each post have to have these things

const PostMessage = mongoose.model('PostMessage', postSchema);
export default PostMessage;