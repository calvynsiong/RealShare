import axios from 'axios';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { errorToast, successToast } from '../utils/toasts';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

interface IRegisterInfo {
  email: string;
  password: string;
  username?: string;
}

export const useRegisterUserQ = () => {
  const client = useQueryClient();
  return useMutation(
    (registerInfo: IRegisterInfo) => {
      return axios
        .post('/api/v1/auth/register', registerInfo)
        .then((res) => res.data.dataPayload.user);
    },
    {
      onSuccess: async (user) => {
        const { password, ...userInfo } = user;
        successToast('Successfully registered');
        await client.setQueryData(['user'], userInfo);
      },
      onError: async (err: string) => errorToast(err),
    }
  );
};
export const useLoginUserQ = () => {
  const client = useQueryClient();
  return useMutation(
    (loginInfo: IRegisterInfo) => {
      // console.log(loginInfo);
      return axios
        .post('/api/v1/auth/login', loginInfo, {
          headers: {
            withCredentials: true,
          },
        })
        .then((res) => {
          return res.data.dataPayload;
        });
    },
    {
      onSuccess: async (data) => {
        localStorage.setItem('token', data.token);
        const { password, ...userInfo } = data.user;
        successToast('Successfully logged in');
        await client.setQueryData(['user'], userInfo);
      },
      onError: async (err: string) => errorToast(err.toString()),
    }
  );
};
