require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const sqlite = require('sqlite3')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 10
const SECRET = process.env.SECRET

const app = express()
app.use(bodyParser.json({ limit: 1024 }))
app.use(bodyParser.urlencoded({ extended: true }))

const db = new sqlite.Database('db.db')

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  CONSTRAINT email_unique UNIQUE (email)
)`)

app.post('/register', (req, res) => {
  db.run(`INSERT INTO users (name, email, password) VALUES ($name, $email, $password)`, {
    $name: req.body.name,
    $email: req.body.email,
    $password: bcrypt.hashSync(req.body.password, SALT_ROUNDS)
  }, function (err, row) {
    res.json({
      message: 'Success',
      id: this.lastID
    })
  })
})

app.post('/login', (req, res) => {
  db.get(`SELECT * FROM users WHERE email = $email`, {
    $email: req.body.email
  }, (err, row) => {
    if (bcrypt.compareSync(req.body.password, row.password)) {
      res.json({
        message: 'success',
        token: jwt.sign({
          name: row.name
        }, SECRET)
      })
    } else {
      res.status(401).json({
        message: 'error'
      })
    }
  })
})

app.listen(5001, () => console.log('App is listening on :5001'))
