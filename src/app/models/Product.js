const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;


// console.log(random, months[random]);
const Course = new Schema({
  name: { type: String },
  description: { type: String },
  image: { type: String },
  // status: {type:String, default: random},
  
  slug: { type: String, slug: 'name', unique: true }
}, {
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
});

mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all'
});

module.exports = mongoose.model('product_line', Course);
