const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const Schema = mongoose.Schema;


const RentalListing = new Schema({
    name:{
        type:String
    },
    phone: {
        type:String
    },
    cost: {
      type:String
    },
    status: {
      type:String
    },
    dateStart: {
      type:Date
    },
    dateEnd: {
      type:Date
    },
  slug: { type: String, slug: 'phone', unique: true }
}, {
  timestamps: true,
});

module.exports = mongoose.model('RentalListing', RentalListing);
