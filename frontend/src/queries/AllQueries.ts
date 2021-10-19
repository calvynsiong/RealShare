import axios, { AxiosResponse } from 'axios';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { minutesToMs } from '../utils/functions';
import { errorToast, successToast } from '../utils/toasts';
import { IPost } from '../utils/reducers';

// * Auth Related Queries
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
        .post(`api/v1/auth/register`, registerInfo)
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
        .post(`api/v1/auth/login`, loginInfo.info, {
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
        errorToast('Login failed!');
      },
    }
  );
};

// * Post Related Queries
export const useGetFeedPostsQ = (userId: string) => {
  return useQuery(
    ['feedPosts', userId],
    () => {
      return axios
        .get(`api/v1/post/feed/${userId}`, {
          headers: {
            withCredentials: true,
          },
        })
        .then((res) => res.data.dataPayload.feedPosts);
    },
    {
      cacheTime: minutesToMs(100),
      staleTime: minutesToMs(100),
      retry: false,

      onError: () => errorToast('Could not fetch feed'),
    }
  );
};

interface IFollowIds {
  subjectId: string;
  userId: string;
}
type PostData = Pick<IPost, 'desc' | 'tags' | 'location'> & {
  userId: string;
  img: string;
};
type ProfilePicData = {
  userId: string;
  avatar: string;
};

const createPost = async (
  data: PostData
): Promise<void | { res: AxiosResponse<any>; userId: string }> => {
  const { userId } = data;

  const res = await axios.post(`api/v1/post/create`, data, {
    headers: {
      withCredentials: true,
    },
  });
  return { res, userId };
};

export const useCreatePostQ = () => {
  const QueryClient = useQueryClient();
  return useMutation((input: PostData) => createPost(input), {
    onSuccess: async (data) => {
      successToast('Post Created');
      await QueryClient.invalidateQueries(['user', data!.userId]);
    },
    onError: (err: Error) => {
      console.log(err);
      errorToast('Failed to upload post');
    },
  });
};

const updateProfilePic = async (
  data: ProfilePicData
): Promise<void | { res: AxiosResponse<any>; userId: string }> => {
  const { userId, avatar } = data;

  const res = await axios.put(
    `api/v1/user/update/${userId}`,
    { avatar, userId },
    {
      headers: {
        withCredentials: true,
      },
    }
  );
  console.log(res.data);
  return { res, userId };
};

export const useUpdateProfilePicQuery = () => {
  const QueryClient = useQueryClient();
  return useMutation((input: ProfilePicData) => updateProfilePic(input), {
    onSuccess: async (data) => {
      successToast('Profile Picture Updated');
      await QueryClient.invalidateQueries(['user', data!.userId]);
    },
    onError: (err: Error) => {
      errorToast(err.message);
      errorToast('Failed to upload post');
    },
  });
};

// * User Related Queries

export const useGetMyUserDataQ = (userId: string) => {
  return useQuery(
    ['myUser', userId],
    () => {
      return axios
        .get(`api/v1/user/find/${userId}`, {
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

      onError: (err: string) => errorToast('Could not fetch user data'),
    }
  );
};

const followUser = async (data: IFollowIds, action: string) => {
  const { subjectId, userId } = data;
  const res = await axios.put(
    `api/v1/user/${action}/${subjectId}`,
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
        .get(`api/v1/user/all/`, {
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

export const useGetUserByIdQ = (userId: string) => {
  return useQuery(
    ['user', userId],
    () => {
      return axios
        .get(`api/v1/user/find/${userId}`, {
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
