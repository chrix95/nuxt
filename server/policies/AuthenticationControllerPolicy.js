// require the necessary packages
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = {
  register (req, res, next) {
    const schema = {
      name: Joi.string(),
      phone: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9\!\@\#\$\%\^\&\*\)\(+\=\._-]{8,32}$')
      )
    }
    const { error, value } = Joi.validate(req.body, schema)
    if(error) {
      console.log(error)
      switch (error.details[0].context.key) {
        case 'name':
          res.status(400).send({
            error: 'Kindly provide a name'
          })
        break
        case 'phone':
          res.status(400).send({
            error: 'Kindly provide a phone number'
          })
        break
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email address'
          })
        break
        case 'password':
          res.status(400).send({
            error: `The password provided failed to match the following rules:<br>1. It must contain ONLY the follwing characters: lower case, upper case, numerics.<br>2. It must be at least 8 characters in length and not greater than 32 characters in length.`
          })
        break
        default:
          res.status(400).send({
            error: 'Invalid registration information'
          })
      }
    } else {
      next()
    }
  },
  // authenticate user
  auth (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, config.authentication.jwtSecret, (err, user) => {
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }
}