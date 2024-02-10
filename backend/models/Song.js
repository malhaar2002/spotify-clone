// Step 1: Require mongoose
const mongoose = require('mongoose');

// Step 2: Create a new schema
const Song = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    track: {
        type: String,
        required: true,
    },
    artist: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
});

// Step 3: Create a model
const SongModel = mongoose.model('Song', Song);
module.exports = SongModel;