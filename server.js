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
  connection: {
    host : '127.0.0.1', //localhost
    // port : 5432,
    user : 'postgres',      
    password : 'test',
    database : 'smartbrain'
  }
});

const app = express();


app.use(express.json());
app.use(cors());

// app.get('/', (req, res)=>{
// 	db.select('*').from('users').then(users => res.json(users));
// })

app.post('/signin', signin.handleSignIn(db, bcrypt))

app.post('/register', register.handleRegister(db, bcrypt))

app.get('/profile/:id', (req, res)=>{profile.handleGetProfile(req, res, db)})

app.put('/image', (req, res)=>{image.handleImage(req, res, db)})

app.post('/imageurl', (req, res)=>{image.handleApiCall(req, res)})

const DATABASE_URL = process.env.DATABASE_URL
app.listen(3002, ()=>{
	console.log(`app is running on port ${DATABASE_URL}`);
})


