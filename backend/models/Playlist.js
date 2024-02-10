// Step 1: Require mongoose
const mongoose = require("mongoose");

// Step 2: Create a new schema
const Playlist = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  songs: [
    {
      type: mongoose.Type.ObjectId,
      ref: "song",
    },
  ],
  collaborators: [
    {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  ]
});

// Step 3: Create a model
const PlaylistModel = mongoose.model("Playlist", Playlist);
module.exports = PlaylistModel;
