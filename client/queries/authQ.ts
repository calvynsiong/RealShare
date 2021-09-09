import axios, { AxiosError } from 'axios';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { IUser } from '../pages/_app';
import { minutesToMs } from '../utils/functions';
import { errorToast, successToast } from '../utils/toasts';

axios.defaults.baseURL = 'http://localhost:5000';

interface IRegisterInfo {
  email: string;
  password: string;
  username?: string;
}
interface ILoginInfo {
  info: { email: string; password: string; username?: string };
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
  console.log('Login');
  return useMutation(
    (loginInfo: ILoginInfo) => {
      return axios
        .post('http://localhost:5000/api/v1/auth/login', loginInfo.info, {
          headers: {
            withCredentials: true,
          },
        })
        .then((res) => {
          return { payload: res.data.dataPayload };
        });
    },
    {
      onSuccess: async (data) => {
        localStorage.setItem('token', data.payload.token);
        const { password, ...userInfo } = data.payload.user;
        localStorage.setItem('user', JSON.stringify(userInfo));
        client.setQueryData(
          ['userId'],
          data.payload.user._id ?? JSON.parse(localStorage.user)
        )?._id;
        const currentTime = new Date();
        localStorage.setItem(
          'timeOfLogin',
          JSON.stringify(currentTime.setHours(currentTime.getHours() + 4))
        );
        successToast('Successfully logged in');
      },
      onError: async () => errorToast('Login Failed'),
    }
  );
};

export const useGetUserByIdQ = (userId: string) => {
  return useQuery(
    'user',
    () => {
      return axios
        .get(`/api/v1/user/find/${userId}`, {
          headers: {
            withCredentials: true,
          },
        })
        .then((res) => res.data.dataPayload.user);
    },
    {
      cacheTime: minutesToMs(100),
      staleTime: minutesToMs(100),

      onError: (err: string) => errorToast(err),
    }
  );
};
