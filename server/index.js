const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('hello'));

app.listen(6161, () => console.log('server is listening on port 6161'));