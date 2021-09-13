export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : process.env.REACT_APP_BACKEND_URL;
