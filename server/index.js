const express = require('express');
const dbConnect = require('./config/db');

const app = express();

start();

async function start() {
    await dbConnect();
    app.get('/', (req, res) => res.send('hello'));
    app.listen(6161, () => console.log('server is listening on port 6161'));
}

