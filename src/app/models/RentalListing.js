const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const Schema = mongoose.Schema;


const RentalListing = new Schema({
    username:{
        type:String
    },
    phone: {
        type:String
    },
    price: {
      type:String
    },
    status: {
      type:String
    },
    startDate: {
      type:Date
    },
    endDate: {
      type:Date
    },
    address: {
      type:String
    },
    name: {
      type:String
    },
    image: {
      type:String
    },
  slug: { type: String, slug: 'phone', unique: true }
}, {
  timestamps: true,
});

module.exports = mongoose.model('RentalListing', RentalListing);
