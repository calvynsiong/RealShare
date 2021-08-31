const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const hpp = require('hpp');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');

dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());
// logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
// Sanitize
app.use(mongoSanitize());

// Prevent XSS attacks
app.use(xss());
// Set security headers
app.use(helmet());

// Rate limit against DDOS attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
// ! Creating routes

app.listen(PORT, () => {
  console.log(
    `Backend server is in ${process.env.NODE_ENV} environment and running on ${PORT}`
  );
});
