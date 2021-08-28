import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';

type Props = {
  title?: string;
  children?: ReactNode;
};

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div className='p-4'>Hello World</div>
);

export default Layout;
