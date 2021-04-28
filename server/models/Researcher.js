const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    select: false,
    set(val) {
      return require('bcrypt').hashSync(val, 10)
    }
  },
  role: { type: String },
  name: { type: String },
  age: { type: Number },
  email: { type: String },
  gender: { type: String },
  degree: { type: String },
  direction: { type: String },
  title: { type: String },
  institution: { type: String },
  avatar: { type: String }
})

module.exports = mongoose.model('Researcher', schema)