const responseHandler = (input, res) => {
  console.log(input);
  console.log(input);
  console.log(input);
  console.log(input);
  console.log(input);
  console.log(input);
  let { statusCode, msg, isSuccessful, payload } = input;
  const handleStatusCode = () => {
    if (statusCode === 200 || statusCode === 201) {
      isSuccessful = true;
    } else {
      isSuccessful = false;
      statusCode = 404;
    }
  };

  if (isSuccessful === undefined) {
    handleStatusCode();
  }

  res.status(statusCode).json({
    success: isSuccessful, // required
    dataPayload: payload, // optional only if passed
    message: msg || 'Success',
  });
};

module.exports = responseHandler;
