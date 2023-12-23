import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  githubUsername: String,
  githubAccessToken: String,
  repositories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Repository' }]
});

const User = mongoose.model('User', userSchema);
export default User;
