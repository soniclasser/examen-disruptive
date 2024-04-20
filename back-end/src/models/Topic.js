const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  allowsImages: {
    type: Boolean,
    required: true,
  },
  allowsVideos: {
    type: Boolean,
    required: true,
  },
  allowsTexts: {
    type: Boolean,
    required: true,
  },
});

const Topic = mongoose.model('Theme', TopicSchema);

module.exports = Topic