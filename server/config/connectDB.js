const mongoose = require('mongoose');
const responseHandler = require('../utils/responseHandler');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URL).catch((err) =>
    responseHandler({
      statusCode: 500,
      message: 'Connection failed',
    })
  );

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;
