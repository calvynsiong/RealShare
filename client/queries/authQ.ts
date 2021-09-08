import axios from 'axios';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { errorToast, successToast } from '../utils/toasts';

axios.defaults.baseURL = 'http://localhost:5000';

interface IRegisterInfo {
  email: string;
  password: string;
  username?: string;
}
interface ILoginInfo {
  info: { email: string; password: string; username?: string };
  userSet: React.Dispatch<React.SetStateAction<any>>;
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
    (loginInfo: ILoginInfo) => {
      return axios
        .post('/api/v1/auth/login', loginInfo.info, {
          headers: {
            withCredentials: true,
          },
        })
        .then((res) => {
          return { payload: res.data.dataPayload, userSet: loginInfo.userSet };
        });
    },
    {
      onSuccess: async (data) => {
        localStorage.setItem('token', data.payload.token);
        const { password, ...userInfo } = data.payload.user;
        successToast('Successfully logged in');
        await client.setQueryData(['user'], userInfo);
        data.userSet(userInfo);
      },
      onError: async (err: string) => errorToast(err.toString()),
    }
  );
};

export const useGetUserQ = () => {
  const client = useQueryClient();
  return useQuery<any, any>(['user'], async () => {
    const res = await axios.get('/api/v1/auth/user', {
      headers: {
        withCredentials: true,
      },
    });
    return res.data.dataPayload;
  });
};
