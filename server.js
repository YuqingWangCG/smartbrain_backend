
// const knex = require('knex');
// const register = require('./controllers/register');

import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import handleRegister from './controllers/register.js';
import handleSignIn from './controllers/signin.js';
import handleGetProfile from './controllers/profile.js';
import handleFaceDetection from './controllers/facedetection.js';
import handleEntries from './controllers/updateentries.js';


const db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

const app = express();


app.use(express.json());
app.use(cors());


app.post('/signin', handleSignIn(db, bcrypt))

app.post('/register', handleRegister(db, bcrypt))
// (req, res) can be removed
app.get('/profile/:id', handleGetProfile(db))
 
// the route path can not be changed
app.post('/imageurl', handleFaceDetection())

app.put('/image', handleEntries(db))

app.listen(3002, ()=>{
	console.log(`app is running on port 3002`);
})


