const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

const app = express();


app.use(express.json());
app.use(cors());

app.post('/signin', signin.handleSignIn(db, bcrypt))

app.post('/register', register.handleRegister(db, bcrypt))

app.get('/profile/:id', (req, res)=>{profile.handleGetProfile(req, res, db)})

app.put('/image', (req, res)=>{image.handleImage(req, res, db)})

app.post('/imageurl', (req, res)=>{image.handleApiCall(req, res)})

 
app.listen(3002, ()=>{
	console.log(`app is running on port 3002`);
})


