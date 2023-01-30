// const express = require('express');
// const bcrypt = require('bcrypt-nodejs');
// const cors = require('cors');
// const knex = require('knex');
// const register = require('./controllers/register');
// const signin = require('./controllers/signin');
// const profile = require('./controllers/profile');
// const image = require('./controllers/image');
import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import handleRegister from './controllers/register.js';
import handleSignIn from './controllers/signin.js';
import handleGetProfile from './controllers/profile.js';
import {handleEntries, handleFaceDetection} from './controllers/image.js';

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
app.get('/profile/:id', (req, res)=>{handleGetProfile(req, res, db)})

// app.put('/image', (req, res)=>{handleEntries(req, res, db)})
// app.put('/entries', (req, res)=>{handleEntries(req, res, db)})
app.put('/image', (req, res)=>{handleEntries(req, res, db)})

app.post('/imageurl', (req, res)=>{handleFaceDetection(req, res)})
 
app.listen(3002, ()=>{
  console.log(`app is running on port 3002`);
})

