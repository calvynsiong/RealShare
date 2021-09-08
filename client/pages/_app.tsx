// styles
import '../styles/index.css';
// libraries
import React, { ReactNode, useEffect } from 'react';
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
import { useRouter } from 'next/router';
import { createContext } from 'react';
import { useState } from 'react';
import setJWTinAxios from '../utils/setJWTinAxios';

// eslint-disable-next-line @typescript-eslint/ban-types
type MyAppProps<P = {}> = AppProps<P> & {
  Component: Page<P>;
  user?: string | null;
};

axios.defaults.baseURL = 'https/localhost:5000';

const queryClient = new QueryClient();

interface IUser {
  username: string;
  email: string;
  avatar: string;
}
export const UserContext = createContext<{
  user: IUser | null;
  userSet: React.Dispatch<React.SetStateAction<IUser | null>>;
} | null>(null);

function MyApp({ Component, pageProps }: MyAppProps) {
  useEffect(() => {
    (document.querySelector('body') as HTMLElement).classList.add('m-0');
  }, []);

  const Layout = Component.layout || MainLayout;
  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  if (process.browser && localStorage.token) {
    setJWTinAxios(localStorage.token);
    // userSet
  }

  const [user, userSet] = useState<IUser | null>(null);

  const props = { user, userSet };

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
        <ToastContainer></ToastContainer>;
        <UserContext.Provider value={props}>
          <Layout> {getLayout(<Component {...pageProps} />)}</Layout>
        </UserContext.Provider>
        <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
