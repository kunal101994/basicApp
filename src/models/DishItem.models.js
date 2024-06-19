const mongoose = require('mongoose');

const dishitemSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },
    variety: {
        type:String,
        enum: ["chicken", "mutton", "biriyani"],
        required: true
    },
  price: {
    type: String,
    required: true
  },
  taste: {
    type: String,
    enum: ["normal", "spicy", "cheezy"],
    required: true
  }
}, 
{timestamps:true})

const DishItem = mongoose.model('DishItem', dishitemSchema);
module.exports = DishItem;