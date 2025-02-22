const orderSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User', default: null },
    items: [
        {
            dishId: { type: Types.ObjectId, ref: 'Dish', required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    totalPrice: { type: Number, required: true },
    discountApplied: { type: Boolean, default: false },
});

const Order = model('Order', orderSchema);

module.exports = Order;
