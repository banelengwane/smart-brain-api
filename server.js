const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const images = require('./controllers/images');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '',
        database: 'smart-brain'
    }
});

const app = express();

app.use(cors());
app.use(bodyParser.json())

app.get('/', (req, res) => { res.send('This is your home') })
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register',(req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/images', (req, res) => { images.handleImages(req, res, db)})
app.post('/imageurl', (req, res) => { images.handleApiCall(req, res)})

app.listen(3000, () => {
    console.log('App is running on port 3000');
})            