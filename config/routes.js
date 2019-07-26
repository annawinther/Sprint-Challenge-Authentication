const axios = require('axios');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig');
const jwt = require('jsonwebtoken');
const secret = require('./secret');
const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

 function register(req, res) {
  // implement user registration
  const credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 10);
  credentials.password = hash;

//   try {
//     const users = await db.insert(credentials);
//       res.status(201).json(users)
//   } catch (error) {
//       res.status(500).json({ message: 'could not register new user'})
//     }
// }
  db('users')
    .insert(credentials)
    .then(ids => {
      const id = ids[0];
      res.status(201).json({newUserId: id, credentials})
    })
    .catch(err => {
      res.status(500).json({ message: 'could not register user' });
    })
}

function login(req, res) {
  // implement user login
  let { username, password} = req.body;
 db('users')
  .where({ username })
  .first()
  .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({ 
              message: `You're now logged in as ${user.username}`,
              token: token
          })
      } else {
          res.status(401).json({ message: 'Invalid Credentials' });
      }
  })
  .catch(error => {
      res.status(500).json({ message: 'could not log in this user' });
  })
}

function generateToken(user){
  const payload = {
      sub: user.id,
      username: user.username
  }
  const options = {
      expiresIn: '1d'
  }
  return jwt.sign(payload, secret.jwtSecrets, options)
}



function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}

