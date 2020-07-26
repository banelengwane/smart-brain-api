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
        password: 'L1ndokuhl3',
        database: 'smart-brain'
    }
});

const app = express();

app.use(cors());
app.use(bodyParser.json())

app.get('/', (req, res) => { res.send('This is the smart brain db') })
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register',(req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/images', (req, res) => { images.handleImages(req, res, db)})
app.post('/imageurl', (req, res) => { images.handleApiCall(req, res)})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
})            
