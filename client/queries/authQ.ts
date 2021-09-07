import axios from 'axios';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { errorToast, successToast } from '../utils/toasts';

axios.defaults.baseURL = 'http://localhost:5000/';

interface IRegisterInfo {
  email: string;
  password: string;
  username: string;
}

export const useRegisterUserQ = () => {
  const client = useQueryClient();
  return useMutation(
    (registerInfo: IRegisterInfo) => {
      console.log(registerInfo);
      return axios
        .post('/api/v1/auth/register', registerInfo)
        .then((res) => res.data.dataPayload.user);
    },
    {
      onSuccess: async (user) => {
        const { password, ...userInfo } = user;
        successToast('Successfully registered');
        // localStorage.setItem('token', user.token);
        await client.setQueryData(['user'], userInfo);
      },
      onError: async (err: string) => await errorToast(err.toString()),
    }
  );
};
