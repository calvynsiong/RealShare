// styles
import '../styles/index.css';
// libraries
import React, {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Head from 'next/head';
import { ReactQueryDevtools } from 'react-query/devtools';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// layouts
import MainLayout from '../components/layouts/MainLayout';
// types
import type { AppProps } from 'next/app';
import { Page } from '../types/page';
import axios from 'axios';
import router from 'next/router';
import { createContext } from 'react';
import { BASE_URL } from '../utils/constants';
import {
  PostActions,
  initialPostsState,
  IPostState,
  postReducer,
  PostActEnums,
} from '../utils/reducers';

type MyAppProps<P = {}> = AppProps<P> & {
  Component: Page<P>;
  user?: string | null;
};

axios.defaults.baseURL = BASE_URL;

const queryClient = new QueryClient();

// * Interfaces
interface IFollows {
  id: string;
  username: string;
  avatar: string;
  email: string;
}
export interface IUser {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  status: string;
  followers?: IFollows[];
  following?: IFollows[];
  location?: string[];
  tags?: string[];
}
interface IUserContext {
  userData: IUser | null;
  allUsers: IUser[] | null;
  setUserData: React.Dispatch<React.SetStateAction<IUser | null>>;
  setAllUsers: React.Dispatch<React.SetStateAction<IUser[] | null>>;
  postState: IPostState;
  postDispatch: React.Dispatch<PostActions>;
}

//  * Context
export const UserContext = createContext<IUserContext | null>(null);
export const useUserContext = (): IUserContext => useContext(UserContext)!;

function MyApp({ Component, pageProps }: MyAppProps) {
  useEffect(() => {
    (document.querySelector('body') as HTMLElement).classList.add('m-0');
  }, []);

  //  * State

  const [userData, setUserData] = useState<IUser | null>(null);
  const [allUsers, setAllUsers] = useState<IUser[] | null>(null);
  const [postState, postDispatch] = useReducer(postReducer, initialPostsState);

  axios.defaults.baseURL = BASE_URL;
  const globalContext = useMemo(
    () => ({
      userData,
      allUsers,
      setUserData,
      setAllUsers,
      postState,
      postDispatch,
    }),
    [userData, allUsers, setUserData, setAllUsers, postState, postDispatch]
  );
  useEffect(() => {
    const fetchAllPosts = async () => {
      const res = await axios.get('/api/v1/post/all');
      const allPosts = res.data.dataPayload.allPosts;
      postDispatch({
        type: PostActEnums.GET_ALL_POSTS,
        payload: allPosts,
      });
    };
  }, [postState?.allPosts]);

  const Layout = Component.layout || MainLayout;
  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  return (
    <>
      <Head>
        <title>RealShare</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1'
        />
      </Head>
      <QueryClientProvider client={queryClient} contextSharing>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <UserContext.Provider value={globalContext}>
          <ToastContainer></ToastContainer>;
          <Layout> {getLayout(<Component {...pageProps} />)}</Layout>
        </UserContext.Provider>
        <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
