import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';

type Props = {
  title?: string;
  children?: ReactNode;
};

const MainLayout = ({
  children,
  title = 'This is the default title',
}: Props) => (
  <>
    <div className='p-4'>
      {children}
      {title}
      Layout Layout Layout
    </div>
  </>
);

export default MainLayout;
