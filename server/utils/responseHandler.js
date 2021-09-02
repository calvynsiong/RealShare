exports.responseHandler = (input, res) => {
  let { statusCode, msg, isSuccessful, payload } = input;

  const handleStatusCode = () => {
    if (statusCode === 200 || statusCode === 201) {
      isSuccessful = true;
    } else {
      isSuccessful = false;
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
