const dishSchema = new Schema({
    restaurantId: { type: Types.ObjectId, required: true, ref: 'Restaurant' },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String }
});

const Dish = model('Dish', dishSchema);

module.exports = Dish;