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

// eslint-disable-next-line @typescript-eslint/ban-types
type MyAppProps<P = {}> = AppProps<P> & {
  Component: Page<P>;
};

function MyApp({ Component, pageProps }: MyAppProps) {
  const queryClient = new QueryClient();
  useEffect(() => {
    (document.querySelector('body') as HTMLElement).classList.add('m-0');
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
