// import the model required
const models = require('../models/index.js')

const User = models.User

const posts = [
    {
        username: 'Christopher',
        title: 'Christopher Post is available to you'
    },
    {
        username: 'Jim',
        title: 'Post 1'
    },
    {
        username: 'Kelly',
        title: 'Post 2'
    }
]

module.exports = {
    fetch (req, res) {
        try {
          return res.status(200).json(posts)
        } catch (error) {
          console.log(error)
        }
    }
}