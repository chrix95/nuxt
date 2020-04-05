// import the model required
const models = require('../models/index.js')

const Post = models.Post

module.exports = {
    async getPosts(req, res) {
        try {
            const data = await Post.findAll({
                where: {
                    userId: req.user.id
                }
            })
            if (!data) {
                return res.status(403).send({
                    error: 'No post available'
                })
            }
            let posts = []
            data.forEach(post => {
                var option = {
                    title: post.title,
                    subtitle: post.subtitle,
                    slug: post.slug,
                    description: post.description,
                    date_created: post.created_at
                }
                posts.push(option)
            });
            return res.status(200).send({
                message: 'Successful',
                posts: posts
            })
        } catch (error) {
            console.log(error)
            return res.status(500).send({
                error: 'Unable to fetch post'
            })
        }
    },

    async getPost(req, res) {
        try {
            const data = await Post.findOne({
                where: {
                    slug: req.params.slug
                }
            })
            if (!data) {
                return res.status(404).send({
                    error: 'No post available'
                })
            }
            var post = {
                title: data.title,
                subtitle: data.subtitle,
                slug: data.slug,
                description: data.description,
                date_created: data.created_at
            }
            return res.status(200).send({
                message: 'Successful',
                post: post
            })
        } catch (error) {
            console.log(error)
            return res.status(500).send({
                error: 'Unable to fetch post'
            })
        }
    }
}