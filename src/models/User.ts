import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    min: 3,
    max: 20,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    max: 6,
  },
  isAvatarImageSet: {
    type: Boolean,
    required: true,
    default: false,
  },
  avatarImage: {
    type: String,
    default: '',
  },
});

export default mongoose.model('User', userSchema);
