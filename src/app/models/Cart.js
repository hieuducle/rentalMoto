const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;


const Cart = new Schema({
    name:{
        type:String
    },
    image:{
        type:String
    },
    username:{
        type:String
    },
    phone:{
      type:String
  },
    price:{
      type:String
  },
  status:{
    type:Boolean
},
  slug: { type: String, slug: 'phone', unique: true }
}, {
  timestamps: true,
});

mongoose.plugin(slug);
Cart.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all'
});

module.exports = mongoose.model('Cart', Cart);
