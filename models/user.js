const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {type: String, required: true},
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  post: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Post",
    },
  ],
}, { timestamps: true }
);



module.exports = mongoose.model('User', userSchema);