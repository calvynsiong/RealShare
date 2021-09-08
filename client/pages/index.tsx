import Link from 'next/link';
import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
// components
import SideBar from '../components/layouts/Sidebar';
import RightBar from '../components/layouts/RightBar';
import Feed from '../components/feed/Feed';
import useProtectedRoute from '../hooks/useProtectedRoute';

const Home = () => {
  const [token, loaded] = useProtectedRoute();
  return (
    token &&
    loaded && (
      <section className='w-full flex sticky'>
        <SideBar></SideBar>
        <Feed></Feed>
      </section>
    )
  );
};

export default Home;
