import React from 'react';
import type { ReactElement, ReactNode } from 'react';
import { AppProps } from 'next/app';

import '../styles/index.css';
import MainLayout from '../components/layouts/MainLayout';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import type { NextPage } from 'next';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const queryClient = new QueryClient();

  const Layout = Component?.getLayout || MainLayout;

  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </QueryClientProvider>
  );
}

export default MyApp;
