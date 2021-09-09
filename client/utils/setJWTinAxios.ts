import axios from 'axios';

const setJWTinAxios = (token: string) => {
  console.log('axios set');
  if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    console.log('verified!');
  } else {
    delete axios.defaults.headers.common['Authorization'];
    console.log('booted!');
  }
};

export default setJWTinAxios;
