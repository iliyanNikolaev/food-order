const { Schema, model, Types } = require('mongoose');

const restaurantSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    address: { type: String, required: true },
    image: { type: String },
    menu: { type: [Types.ObjectId], default: [], ref: 'Dish' }
});

const Restaurant = model('Restaurant', restaurantSchema);

module.exports = Restaurant;