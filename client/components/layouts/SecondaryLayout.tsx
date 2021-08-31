import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';

type Props = {
  title?: string;
  children?: ReactNode;
};

const SecondaryLayout = ({
  children,
  title = 'This is the default secondary title',
}: Props) => (
  <>
    <div className='p-4'>
      {children}
      {title}
      Secondary
    </div>
  </>
);

export default SecondaryLayout;
