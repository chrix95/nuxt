// import rateLimit from 'express-rate-limit';
const rateLimit = require('express-rate-limit')
// import the neccessary controllers for the routes
const AuthenticationController = require('./controllers/AuthenticationController')
const PostController = require('./controllers/PostController')

// require joi for validation
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

// To prevent brute force attacks by simply using a rate limit on our route
// will get a response of 429 Too many requests after 3 attempts within 15 minutes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes || 24 hrs in milliseconds
  max: 3,
  message: 'You have exceeded the maximum of 3 requests in 15 minutes limit!',
  headers: true
})

module.exports = (app) => {

  app.use('/api/auth/login', apiLimiter)

  app.post('/api/auth/register', AuthenticationControllerPolicy.register, AuthenticationController.register)
  app.post('/api/auth/login', AuthenticationController.login)

  // authenticated route
  app.get('/api/posts', AuthenticationControllerPolicy.auth, PostController.getPosts)
  app.get('/api/posts/:slug', AuthenticationControllerPolicy.auth, PostController.getPost)
}