const axios = require('axios');
const bcrypt = require('bcryptjs');
const { authenticate, generateToken } = require('./middlewares');
const db = require('../database/dbConfig.js');
module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 14);
  creds.password = hash;
  db('users')
    .insert(creds)
    .then(ids => {
      console.log(creds);
      res.status(201).json(creds.username);
    })
    .catch(err => {
      res.status(500).json({ message: 'unable to join' })
    });
}

function login(req, res) {
  const creds = req.body;
  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(201).json(token)
      } else {
        res.status(401).json({ message: 'nope' })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    });
};

function getJokes(req, res) {
  axios
    .get(
      'https://safe-falls-22549.herokuapp.com/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
