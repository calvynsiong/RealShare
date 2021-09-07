// styles
import '../styles/index.css';
// libraries
import React, { ReactNode, useEffect, useLayoutEffect } from 'react';
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

// eslint-disable-next-line @typescript-eslint/ban-types
type MyAppProps<P = {}> = AppProps<P> & {
  Component: Page<P>;
  user?: string | null;
};

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

const queryClient = new QueryClient();

export async function getServerSideProps() {
  const userToken = localStorage.getItem('token');
  const user = userToken !== null ? JSON.parse(userToken) : null;
  // Checking for JWT token
  console.log(user, 'server');
  return {
    props: { user }, // will be passed to the page component as props
  };
}

function MyApp({ Component, pageProps, user }: MyAppProps) {
  const router = useRouter();
  useEffect(() => {
    (document.querySelector('body') as HTMLElement).classList.add('m-0');
    // console.log(localStorage.JWTtoken);
    // console.log(user, 'initial');
    // if (!localStorage.JWTtoken) {
    //   router.push('/login');
    // } else {
    //   router.push('/');
    // }
  });

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
        <ToastContainer></ToastContainer>;
        <Layout> {getLayout(<Component {...pageProps} />)}</Layout>
        <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
