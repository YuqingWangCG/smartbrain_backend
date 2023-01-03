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
  connection : process.env.DATABASE_URL,
  searchPath:['knex', 'public'],
  // connection: {
  //   host : process.env.DATABASE_URL, //was localhost 
  //   port : 5432,
  //   user : 'smartbrain_yuqingslab_db_user',      
  //   password : process.env.PASSWORD,
  //   database : 'smartbrain_yuqingslab_db'
  // }
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
	console.log(`app is running on port ${process.env.DATABASE_URL}`);
})


