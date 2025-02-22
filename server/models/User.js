const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    orders: { type: [Types.ObjectId], default: [], ref: 'Order' },
    discountCounter: { type: Number, default: 0 }
});

userSchema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;