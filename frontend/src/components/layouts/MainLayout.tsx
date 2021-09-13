import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

type Props = {
  title?: string;
  children?: ReactNode;
};

const MainLayout = ({ children }: Props) => (
  <>
    <Navbar />

    {children}
    <Footer></Footer>
  </>
);

export default MainLayout;
