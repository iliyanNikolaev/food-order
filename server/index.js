const express = require('express');
const dbConnect = require('./config/db');
const { register, login } = require('./services/User');
const { errorParser } = require('./utils/errorParser');
const expressConf = require('./config/express');

const app = express();


start();

async function start() {
    await dbConnect();
    expressConf(app);
    
    app.get('/', (req, res) => res.send('hello'));

    app.post('/auth/register', async (req, res) => {
        console.log(req.body)
        try {
            registerDto(req);
            const user = await register(req.body.email, req.body.password, req.body.username);
            res.status(200).json(user);
        } catch (err) {
            const errors = errorParser(err);
            res.status(400).json({ errors });
        }
    });

    app.post('/auth/login', async (req, res) => {
        try {
            loginDto(req);
            const user = await login(req.body.username, req.body.password);
            res.status(200).json(user);
        } catch (err) {
            const errors = errorParser(err);
            res.status(400).json({ errors });
        }
    });

    app.listen(6161, () => console.log('server is listening on port 6161'));
}


function registerDto(req) {
    if(req.body.email == '' 
        || req.body.password == ''
        || req.body.username == '') {
        throw new Error('all fields are required');
    }
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!pattern.test(req.body.email)){
        throw new Error('The email should be in valid format');
    }
    if(req.body.email.length < 10 || req.body.email.length > 30) {
        throw new Error('The email should be between 10 and 30 characters long');
    }
    if(req.body.password.length < 4 || req.body.password.length > 30) {
        throw new Error('The password should be be between 4 and 30 characters long');
    }
    if(req.body.username.length < 2 || req.body.username.length > 20) {
        throw new Error('The username should be between 2 and 20 characters long');
    }
}

function loginDto(req) {
    if(req.body.username.length < 2 || req.body.username.length > 20) {
        throw new Error('The username should be between 2 and 20 characters long');
    }
    if(req.body.password.length < 4) {
        throw new Error('The password should be at least 4 characters long');
    }
}