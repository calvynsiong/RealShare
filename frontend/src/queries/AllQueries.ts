import axios from 'axios';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { minutesToMs } from '../utils/functions';
import { errorToast, successToast } from '../utils/toasts';
import { IUser } from '../App';

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
  return useMutation(
    (loginInfo: ILoginInfo) => {
      return axios
        .post('/api/v1/auth/login', loginInfo.info, {
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
          data.payload.user._id ?? JSON.parse(localStorage.user)?._id
        );
        const currentTime = new Date();
        localStorage.setItem(
          'timeOfLogin',
          JSON.stringify(currentTime.setHours(currentTime.getHours() + 4))
        );
        successToast('Successfully logged in');
      },
      onError: (err: string) => {
        errorToast('Login failed!' ?? err);
      },
    }
  );
};

export const useGetUserByIdQ = (userId: string) => {
  return useQuery(
    ['user', userId],
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
      cacheTime: minutesToMs(200),
      staleTime: minutesToMs(200),
      retry: false,

      onError: (err: string) => errorToast(err),
    }
  );
};
interface IFollowIds {
  subjectId: string;
  userId: string;
}

const followUser = async (data: IFollowIds, action: string) => {
  const { subjectId, userId } = data;
  const res = await axios.put(
    `/api/v1/user/${action}/${subjectId}`,
    { userId },
    {
      headers: {
        withCredentials: true,
      },
    }
  );
  return { res, subjectId };
};
export const useFollowUserByIdQ = () => {
  const QueryClient = useQueryClient();
  return useMutation((input: IFollowIds) => followUser(input, 'follow'), {
    onSuccess: async (data) => {
      successToast('Followed user');
      await QueryClient.invalidateQueries(['user', data.subjectId]);
    },
    onError: (err: Error) => {
      console.log(err);
      errorToast('Failed to follow user');
    },
  });
};
export const useUnfollowUserByIdQ = () => {
  const QueryClient = useQueryClient();
  return useMutation((input: IFollowIds) => followUser(input, 'unfollow'), {
    onSuccess: async (data) => {
      successToast('Followed user');
      await QueryClient.invalidateQueries(['user', data.subjectId]);
    },
    onError: (err: Error) => {
      console.log(err);
      errorToast('Failed to unfollow user');
    },
  });
};

export const useGetAllUsersQ = () => {
  return useQuery(
    'allUsers',
    () => {
      return axios
        .get(`/api/v1/user/all/`, {
          headers: {
            withCredentials: true,
          },
        })
        .then((res) => res.data.dataPayload.users);
    },
    {
      cacheTime: minutesToMs(200),
      staleTime: minutesToMs(200),
      retry: false,

      onError: (err: string) => errorToast(err),
    }
  );
};
