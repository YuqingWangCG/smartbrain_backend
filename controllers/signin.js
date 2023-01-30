
const handleSignIn = (db, bcrypt)=>(req, res)=>{
  const  {email, password} = req.body; 

  if(!email || !password){
    return res.status(400).json('empty input');
  }

  db('login').where({email})   
		.then(data =>{  //data is an array: [{id:..., email:..., hash:...}]
			const isValid = bcrypt.compareSync(password, data[0].hash);
			if (isValid){
				return db('users').where({email})
							.then(user => {   //user is an array: [{id: ..., username:...}]
								res.json(user[0])
							})
							.catch(err => res.status(400).json('unable to get user'))
			} else {
				res.status(400).json('wrong credentials')
			}
		})
		.catch(err => res.status(400).json('error'))
}

export default handleSignIn;