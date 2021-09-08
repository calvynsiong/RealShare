const express = require('express');
// const app = express();
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const hpp = require('hpp');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const connectDB = require('./config/connectDB');
const cookieParser = require('cookie-parser');
const session = require('express-session');

dotenv.config({ path: './config/config.env' });
const dev = process.env.NODE_ENV !== 'production';

const PORT = process.env.PORT || 5000;
// Init app
// const app = next({ dir: '../client', dev });
// const handle = app.getRequestHandler();

// app
//   .prepare()
//   .then(() => {
const server = express();
// Enable CORS

if (process.env.NODE_ENV === 'development') {
  server.use(morgan('dev'));
}
server.use(
  session({
    secret: 'some-key',
    name: 'jwt',
    resave: false,
    saveUninitialized: true,
    cookie: { domain: 'app.com', secure: false }, // <- THIS, set domain as 'app.com'
  })
);
server.use(cors({ origin: '*', credentials: true })); // cors
server.use(express.json());
server.use(cookieParser());
// Sanitize
server.use(mongoSanitize());
// sign cookies

// Prevent XSS attacks
server.use(xss());
// Set security headers
server.use(helmet());

// Rate limit against DDOS attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});
server.use(limiter);

// Prevent http param pollution
server.use(hpp());

server.use(errorHandler);
// ! Creating routes
server.use(`/api/v1/user`, require('./routes/userR'));
server.use(`/api/v1/auth`, require('./routes/authR'));
server.use(`/api/v1/post`, require('./routes/postR'));

// server.all('*', (req, res) => {
//   return handle(req, res);
// });
connectDB();
server.listen(PORT, (err) => {
  if (err) throw err;
  console.log(
    `Backend server is in ${process.env.NODE_ENV} environment and running on ${PORT}`
  );
});
// })
// .catch((err) => {
//   console.error(err.stack);
//   process.exit(1);
// });
