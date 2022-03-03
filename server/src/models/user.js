import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: null },
  password: { type: String, required: true },
  id: { type: String },
  phone_number:{type: String, required: true}, 
  posts: {type: [String]}
}); // each post have to have these things

const User = mongoose.model("User", userSchema);
export default User;