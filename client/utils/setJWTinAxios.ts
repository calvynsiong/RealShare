import axios from 'axios';

const setJWTinAxios = (token: string) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setJWTinAxios;
