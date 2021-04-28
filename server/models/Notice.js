const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: { type: String },
  display_time: { type: String },
  time: { type: Date },
  auther: { type: String },
  importance: { type: Number },
  content: { type: String }
})

module.exports = mongoose.model('Notice', schema)