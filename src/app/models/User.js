const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const Schema = mongoose.Schema;


const User = new Schema({
    name:{
        type:String
    },
    phone: {
        type:String
    },
    password:{
        type:String
    },
  slug: { type: String, slug: 'phone', unique: true }
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', User);
