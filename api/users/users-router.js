const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const Post = require('../posts/posts-model');
const User = require('./users-model');

// The middleware functions also need to be required
const {
  validateUserId,
  validateUser,
  validatePost,
} = require('../middleware/middleware');



const router = express.Router();

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
User.get(req.query)
  .then(user => {
    res.status(200).json(user)
  }) 
  .catch(next)
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  // console.log(req.user);
  res.status(200).json(req.user)
});

router.post('/', validateUser, (req, res, next) => { // {name: 'chelsea'}
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  // console.log(req.name);
  User.insert({name: req.name}) // OJO QUE NO ES REQ.BODY, MUST BE DE-STRUCTURED
  .then( newUser => {
    res.status(201).json(newUser)
  }  
  )
  .catch(next)
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  // console.log(req.user);
  // console.log(req.name);
  User.update(req.params.id, { name: req.name})
  .then(updatedUser => {
    // res.status(200).json(updatedUser)
    // OR
    res.json(updatedUser)
  })
  .catch(next)
});

router.delete('/:id', validateUserId,  async (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  // console.log(req.user);
  try{
    /* const result =*/  await User.remove(req.params.id)
    // res.json(result)
      res.json(req.user)
  }
  catch (error) {

    next(error)
  }
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  // console.log(req.user);
  const posts = await User.getUserPosts(req.params.id)
  try{
    res.json(posts)
  } catch (err) {
    next(err)
  }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  // console.log(req.user);
  // console.log(req.text)
  try{
    const newPost = await Post.insert({user_id: req.params.id, text: req.text})
    res.json(newPost)
  } catch (err) {
    next(err)
  }
});

// error handling middleware ALWAYS AT THE BTM
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

// do not forget to export the router

module.exports = router;