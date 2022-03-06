import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: null },
  password: { type: String, required: true },
  id: { type: String },
  posts: { type: [String], default: [] },
  purchased: { type: [String], default: []},
  profile_pic: {type: String, default: ""}
}); // each post has to have these things

const User = mongoose.model("User", userSchema);
export default User;