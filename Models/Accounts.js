const mongoose = require('mongoose');
const findOrCreate = require('mongoose-find-or-create'); //third party NPM module to add find or create functionality to Mongoose

let AccountSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    type: String
  },
  imageUrl: {
    type: String
  }
});

AccountSchema.plugin(findOrCreate);
mongoose.model('Account', AccountSchema);