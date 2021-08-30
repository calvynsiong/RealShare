import type { NextPage } from 'next';
import { AppProps } from 'next/dist/shared/lib/router/router';
import { ReactElement, ReactNode } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
type Page<P = {}> = NextPage<P> & {
  // You can disable whichever you don't need
  getLayout?: (page: ReactElement) => ReactNode;
  layout?: ComponentType;
};
