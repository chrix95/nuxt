const models = require('../models/index.js')

const User = models.User
// import packages for password encryption and jwt
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const user =  { name: req.body.name, email: req.body.email, phone: req.body.phone, password: hashedPassword }
      const createdUser = await User.create(user)
      const jwtToken = jwtSignUser(createdUser.toJSON())
      return res.status(200).send({
        message: 'Account created successfully',
        user: {
          id: createdUser.id,
          name: createdUser.name,
          phone: createdUser.phone,
          email: createdUser.email
        },
        token: jwtToken
      })
    } catch (error) {
      if (error.errors) {
        const path = error.errors[0].path
        if (path == 'phone') {
          // phone number not unique
          return res.status(400).send({ error: 'Phone number already exist' })
        }
        if (path == 'email') {
          // email not unique
          return res.status(400).send({ error: 'Email address already exist' })
        }
      }
      // other errors
      return res.status(400).send({ error: 'Error in validation' })
    }
  },
  async login (req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }
      return res.status(200).send({ 
        message: 'Welcome back ' + user.name,
        user: {
          id: user.id,
          name: user.name,
          phone: user.phone,
          email: user.email
        },
        token: jwtSignUser(user.toJSON())
      })
    } catch (error) {
      console.log(error)
      // server error
      return res.status(500).send({ 
        error: 'An error has occured trying to log in' 
      })
    }
  }
}