// styles
import '../styles/index.css';
// libraries
import React, { ReactNode, useContext, useEffect } from 'react';
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
import router, { useRouter } from 'next/router';
import { createContext } from 'react';

type MyAppProps<P = {}> = AppProps<P> & {
  Component: Page<P>;
  user?: string | null;
};

axios.defaults.baseURL =
  process.env.REACT_APP_BACKEND_URL ?? 'https/localhost:5000';

const queryClient = new QueryClient();

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
}
export const UserContext = createContext<{ userData: IUser | null } | null>(
  null
);
export const useUserContext = (): { userData: IUser | null } =>
  useContext(UserContext)!;

function MyApp({ Component, pageProps }: MyAppProps) {
  useEffect(() => {
    (document.querySelector('body') as HTMLElement).classList.add('m-0');
  }, []);

  let userData: IUser | null = null;

  if (process.browser && localStorage.getItem('user')) {
    userData = JSON.parse(localStorage.getItem('user')!);
    const timeOfLogin: number = JSON.parse(
      localStorage.getItem('timeOfLogin')!
    ) as number;
    if (timeOfLogin < new Date().getTime()) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('timeOfLogin');
      userData = null;
      router.push('/login');
    }
  }
  console.log(userData, "user's info");

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
      <QueryClientProvider client={queryClient}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <UserContext.Provider value={{ userData }}>
          <ToastContainer></ToastContainer>;
          <Layout> {getLayout(<Component {...pageProps} />)}</Layout>
        </UserContext.Provider>
        <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
