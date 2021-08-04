const express = require('express'); // imports common JS module
const { logger } = require('./middleware/middleware');
const usersRouter = require('./users/users-router');

const server = express();

server.use(express.json()); // req.body {}
server.use(logger)

server.use('/api/users', usersRouter);


// remember express by default cannot parse JSON in request bodies

// global middleware-s and the user's router need to be connected here

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

// server.use('*', (req, res, next) => {
// // catch all, 404 error middleware
//   // calling 'next' with an argument sends the argument
//   // to the error-handling middleware below
//   console.log(`hitting ${req.method} ${req.baseUrl}`);
//   next({ status: 404, message: 'not found' }); // this object becomes the "err" in the middleware below
// })

// server.use((err, req, res, next) => { // error handling middleware
//   res.status(err.status ||  500).json({ message : `OOPS: ${err.message}`})
// })

module.exports = server;
