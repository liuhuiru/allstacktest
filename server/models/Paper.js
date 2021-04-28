const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: { type: String },
  category: { type: String },
  time: { type: Date },
  display_time: { type: String },
  leadAuther: { type: String },
  laUnit: { type: String },
  corresAuther: { type: String },
  caUnit: { type: String },
  auther: { type: String },
  level: { type: String },
  keyword: { type: String },
  journal: { type: String },
  issn: { type: String },
  url: { type: String }
})

module.exports = mongoose.model('Paper', schema)