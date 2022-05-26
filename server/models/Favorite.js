const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = Schema(
  {
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    movieId: {
      type: String,
    },

    movieTitle: {
      type: String,
    },

    moviePost: {
      type: String,
    },

    movieRunTime: {
      type: String,
    },
  },
  { timestamps: true }
);

const Favorite = mongoose.model('Favorite', userSchema);

module.exports = Favorite;
