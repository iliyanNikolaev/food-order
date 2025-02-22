const mongoose = require('mongoose');

const dbUrl = 'mongodb://127.0.0.1:27017/food-order';

async function dbConnect() {
    try {
        await mongoose.connect(dbUrl);
        console.log('db connected');
    } catch (err) {
        console.log('DB NOT CONNECTED >>> ' + err.message);
        process.exit(1);
    }
}

module.exports = dbConnect;