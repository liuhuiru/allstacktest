const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  director: { type: String },
  funds: { type: String },
  level: { type: String },
  type: { type: String },
  progress: { type: String },
  midterm: { type: Date },
  start: { type: Date },
  end: { type: Date },
  member: { type: String },
  content: { type: String },
  url: { type: String }
})

module.exports = mongoose.model('Project', schema)