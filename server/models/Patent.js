const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  category: { type: String },
  number: { type: String },
  inventor: { type: String },
  filingDate: { type: Date },
  announDate: { type: Date },
  patentee: { type: String },
  url: { type: String }
})

module.exports = mongoose.model('Patent', schema)