const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const Posts = require('../posts/posts-model');
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
  .catch(error => {
    next(error)
  });
});

router.get('/:id', validateUserId, (req, res, next) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  // console.log(req.user);
  res.status(200).json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  console.log(req.name);
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  console.log(req.user);
  console.log(req.name);
});

router.delete('/:id', validateUserId,  (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  console.log(req.user);
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  console.log(req.user);
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  console.log(req.user);
  console.log(req.text)
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