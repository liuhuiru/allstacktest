const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  category: { type: String },
  time: { type: Date },
  leadAuther: { type: String },
  laUnit: { type: String },
  corresAuther: { type: String },
  caUnit: { type: String },
  auther: { type: String },
  cite: { type: String },
  publisher: { type: String },
  journal: { type: String },
  issn: { type: String },
})

module.exports = mongoose.model('Paper', schema)