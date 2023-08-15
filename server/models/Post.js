const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user:{
    type: Schema.Types.ObjectId
  },
  Title: {
    type: String,
    required: true,
  },
  Content: {
    type: String,
    required: true
  },
  Author: {
    type: String
  },
  CreatedAt:{
    type: Date,
    default: Date.now
  },
  UpdateAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('post', PostSchema);
