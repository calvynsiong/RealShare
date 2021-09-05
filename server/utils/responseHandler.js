const responseHandler = (input, res) => {
  let { statusCode, msg, isSuccessful, payload } = input;
  const handleStatusCode = () => {
    if (statusCode === 200 || statusCode === 201) {
      isSuccessful = true;
    } else {
      isSuccessful = false;
      statusCode = statusCode ?? 404;
    }
  };

  if (isSuccessful === undefined) {
    handleStatusCode();
  }

  res.status(statusCode).json({
    success: isSuccessful, // required
    dataPayload: payload, // optional only if passed
    message: msg || 'Success',
    statusCode,
  });
};

module.exports = responseHandler;
